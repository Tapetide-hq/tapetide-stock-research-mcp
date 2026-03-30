# Tapetide Stock Research MCP Server — Installation Guide for AI Agents

## Prerequisites

- Node.js 18 or later
- A free Tapetide API token from https://tapetide.com/settings/tokens

## Installation

This server is published on npm as `tapetide-mcp`. No cloning or building required.

Add the following to your MCP configuration file (e.g., `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "tapetide": {
      "command": "npx",
      "args": ["-y", "tapetide-mcp"],
      "env": {
        "TAPETIDE_TOKEN": "<USER_MUST_PROVIDE_TOKEN>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TAPETIDE_TOKEN` | Yes | API token from https://tapetide.com/settings/tokens (starts with `tpt_rt_`) |

## How It Works

The server runs as a local stdio bridge. It reads JSON-RPC from stdin, forwards requests to the remote Tapetide API at `https://mcp.tapetide.com/mcp` with token-based auth, and writes responses to stdout.

No additional dependencies, database setup, or API keys from third parties are needed.

## Verification

After installation, try calling the `search_stocks` tool with query `"Reliance"` to confirm the server is working.
