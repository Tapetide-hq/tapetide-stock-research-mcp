#!/usr/bin/env node
/**
 * Tapetide MCP — Local stdio bridge to the remote MCP server.
 *
 * Reads JSON-RPC from stdin, forwards to https://mcp.tapetide.com/mcp
 * with HMAC access token auth, writes responses to stdout.
 *
 * Authentication:
 *   1. Uses TAPETIDE_TOKEN (refresh token) from env
 *   2. Exchanges for 1hr HMAC access token via POST /token
 *   3. Auto-refreshes when access token expires
 *
 * Get a token at https://tapetide.com/settings/tokens
 *
 * Design Log #035
 */

const MCP_URL = process.env.TAPETIDE_MCP_URL || "https://mcp.tapetide.com";
const REFRESH_TOKEN = process.env.TAPETIDE_TOKEN;

if (!REFRESH_TOKEN) {
  process.stderr.write(
    "Error: TAPETIDE_TOKEN environment variable is required.\n" +
    "Get one at https://tapetide.com/settings/tokens\n",
  );
  process.exit(1);
}

let accessToken: string | null = null;
let tokenExpiresAt = 0; // unix ms

/** Exchange refresh token for a 1hr HMAC access token. */
async function refreshAccessToken(): Promise<void> {
  const res = await fetch(`${MCP_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Token refresh failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  accessToken = data.access_token;
  // Refresh 5 minutes before expiry to avoid edge cases.
  tokenExpiresAt = Date.now() + (data.expires_in - 300) * 1000;
}

/** Get a valid access token, refreshing if needed. */
async function getAccessToken(): Promise<string> {
  if (!accessToken || Date.now() >= tokenExpiresAt) {
    await refreshAccessToken();
  }
  return accessToken!;
}

/** Forward a JSON-RPC request to the remote MCP server. */
async function forwardToRemote(body: string): Promise<string> {
  const token = await getAccessToken();

  const res = await fetch(`${MCP_URL}/mcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  // If 401, token may have expired between check and request. Retry once.
  if (res.status === 401) {
    accessToken = null;
    const freshToken = await getAccessToken();
    const retry = await fetch(`${MCP_URL}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${freshToken}`,
      },
      body,
    });
    return retry.text();
  }

  return res.text();
}

/**
 * Main loop — read JSON-RPC messages from stdin, forward to remote, write to stdout.
 *
 * Uses line-delimited JSON (one JSON-RPC message per line).
 */
async function main(): Promise<void> {
  // Pre-fetch access token so first request is fast.
  try {
    await refreshAccessToken();
  } catch (err) {
    process.stderr.write(
      `Error: Failed to authenticate. Check your TAPETIDE_TOKEN.\n${err}\n`,
    );
    process.exit(1);
  }

  process.stderr.write("Tapetide MCP connected. Waiting for requests...\n");

  // Read stdin line by line.
  let buffer = "";
  for await (const chunk of process.stdin) {
    buffer += chunk.toString();
    let newlineIdx: number;
    while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newlineIdx).trim();
      buffer = buffer.slice(newlineIdx + 1);
      if (!line) continue;

      try {
        const response = await forwardToRemote(line);
        process.stdout.write(response + "\n");
      } catch (err) {
        // Write JSON-RPC error response. Safely extract id from the original line.
        let id: unknown = null;
        try { id = (JSON.parse(line) as { id?: unknown }).id ?? null; } catch { /* malformed JSON */ }
        const errorResponse = JSON.stringify({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32603,
            message: err instanceof Error ? err.message : "Internal error",
          },
        });
        process.stdout.write(errorResponse + "\n");
      }
    }
  }
}

main().catch((err) => {
  process.stderr.write(`Fatal error: ${err}\n`);
  process.exit(1);
});
