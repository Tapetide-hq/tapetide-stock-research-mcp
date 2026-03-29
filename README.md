# Tapetide MCP Server — Indian Stock Market Data for AI Assistants

> Stock research MCP server for Claude, ChatGPT, Cursor, Kiro, and any MCP-compatible AI agent. Search, screen, and analyze ~8,200 NSE and BSE stocks with 26 tools covering quotes, financials, technicals, analyst ratings, forecasts, FII/DII flows, screener, and market insights.

[![npm](https://img.shields.io/npm/v/tapetide-mcp)](https://www.npmjs.com/package/tapetide-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## What is this?

Tapetide MCP is a [Model Context Protocol](https://modelcontextprotocol.io/) server that gives AI assistants direct access to Indian stock market data. Ask your AI to look up any NSE/BSE stock, run a screener with 100+ filters, pull financials, check technical indicators, or get the latest FII/DII activity — all through natural language.

Works with Claude Desktop, ChatGPT, Cursor, Windsurf, Kiro, and any client that supports MCP.

**[Learn more about Tapetide MCP →](https://tapetide.com/mcp)**

## Quick Start

### Remote MCP (Claude, ChatGPT, Cursor)

Add this URL to your MCP client — no install needed:

```
https://mcp.tapetide.com/mcp
```

Authentication happens automatically via Google OAuth.

### Local MCP (Kiro, Windsurf, any stdio client)

1. Get a free token at [tapetide.com/settings/tokens](https://tapetide.com/settings/tokens)
2. Add to your MCP config:

```json
{
  "mcpServers": {
    "tapetide": {
      "command": "npx",
      "args": ["-y", "tapetide-mcp"],
      "env": {
        "TAPETIDE_TOKEN": "tpt_rt_your_token_here"
      }
    }
  }
}
```

## Tools (26)

### Search & Discovery
- `search_stocks` — Fuzzy search across ~8,200 NSE and BSE listed stocks

### Company Data
- `get_company_profile` — Company overview, sector, industry, market cap
- `get_peers` — Peer comparison within sector/index
- `get_dividends` — Dividend history
- `get_mf_holdings` — Mutual fund holdings in a stock

### Quotes & Prices
- `get_stock_quote` — Real-time stock quote with OHLCV, change, volume
- `get_batch_quotes` — Batch quotes for multiple stocks at once
- `get_price_history` — Daily OHLCV candlestick data with date range
- `get_intraday` — Intraday price data (5min, 15min intervals)

### Financials & Fundamentals
- `get_financials` — Quarterly and annual P&L, balance sheet, cash flow
- `get_shareholding` — Promoter, FII, DII, public shareholding patterns
- `get_growth_metrics` — Revenue, profit, and EPS compounded growth rates
- `get_key_ratios` — PE, PB, ROE, ROCE, debt-to-equity, and more

### Technical Analysis
- `get_technical_indicators` — EMA, SMA, RSI, MACD, Bollinger Bands, and more
- `get_analyst_ratings` — Buy/hold/sell consensus from analysts
- `get_forecasts` — EPS, revenue, and EBITDA estimates (quarterly + annual)

### Stock Screener
- `screen_stocks` — Screen with 100+ filters (PE, ROE, market cap, delivery %, etc.)
- `get_preset_screens` — 47 pre-built screener strategies
- `get_trending_signals` — Trending technical and fundamental signals

### Market Data & Institutional Flows
- `get_fii_dii_data` — Daily FII and DII buy/sell/net activity
- `get_fpi_sectors` — FPI sector-wise investment flows
- `get_market_valuations` — Index-level PE, PB, dividend yield

### Market Insights
- `get_bulk_block_deals` — Bulk and block deal activity
- `get_fno_ban` — F&O ban list with MWPL percentages
- `get_ipo_data` — Current, upcoming, and recent IPO listings
- `get_top_deliveries` — Stocks with highest delivery percentage
- `get_news` — Market and company news with sentiment tags
- `get_corporate_actions` — Dividends, splits, bonuses, AGMs
- `get_market_pulse` — Quick market overview in one call

## Example Prompts

```
"Search for Reliance Industries and show me its financials"
"Screen for stocks with PE < 15 and ROE > 20%"
"What are the FII/DII flows for this week?"
"Show me the top 10 stocks by delivery percentage today"
"Compare TCS and Infosys — financials, technicals, and analyst ratings"
"What IPOs are coming up?"
"Find undervalued large caps with high promoter holding"
"Show me stocks near 52-week highs with increasing mutual fund holdings"
"What is the technical outlook for HDFC Bank?"
"Which sectors are FPIs buying into this month?"
```

## Use Cases

- **Stock research with AI** — Ask Claude or ChatGPT to analyze any Indian stock end-to-end
- **Portfolio analysis** — Screen and compare stocks using natural language
- **Market monitoring** — Track FII/DII flows, IPOs, F&O bans, bulk deals daily
- **Technical analysis** — Get RSI, MACD, moving averages without opening a charting tool
- **Fundamental screening** — Find undervalued stocks with custom filters
- **AI-powered investment research** — Combine multiple data points for deeper analysis

## Data Coverage

| Category | Coverage |
|----------|----------|
| Stocks | ~8,200 NSE and BSE listed companies |
| Price data | Daily OHLCV + intraday (5min, 15min) |
| Financials | Quarterly + annual P&L, balance sheet, cash flow |
| Screener filters | 100+ fundamental and technical filters |
| Market data | FII/DII, FPI sectors, IPOs, F&O bans, bulk deals, MTF, SLBM |
| Technicals | EMA, SMA, RSI, MACD, Bollinger Bands, ADX, and more |
| Analyst data | Consensus ratings + EPS/revenue/EBITDA forecasts |

## Rate Limits

- **Free tier**: 100 requests/hour, 1,000 requests/day
- Rate limit headers included in every response

## Links

- [tapetide.com](https://tapetide.com) — Web platform
- [tapetide.com/mcp](https://tapetide.com/mcp) — MCP server documentation
- [mcp.tapetide.com](https://mcp.tapetide.com) — Remote MCP endpoint
- [npm: tapetide-mcp](https://www.npmjs.com/package/tapetide-mcp) — npm package
- [@tapetide_hq](https://x.com/tapetide_hq) — X (Twitter)

## License

[MIT](./LICENSE) — free to use, modify, and distribute.
