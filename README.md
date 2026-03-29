# 🇮🇳 Tapetide MCP Server

Indian stock market data & analysis for AI assistants. Search stocks, screen with 100+ filters, get quotes, financials, technicals, analyst ratings, forecasts, FII/DII flows, and more for ~8,200 NSE/BSE stocks.

## Quick Start

### Remote (Claude, ChatGPT, Cursor)

Add this URL to your MCP client:

```
https://mcp.tapetide.com/mcp
```

Authentication happens automatically via Google OAuth.

### Local (Kiro, Windsurf, any stdio MCP client)

1. Get a token at [tapetide.com/settings/tokens](https://tapetide.com/settings/tokens)
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

| Category | Tools |
|----------|-------|
| Search | `search_stocks` — fuzzy search across ~8,200 stocks |
| Company | `get_company_profile`, `get_peers`, `get_dividends`, `get_mf_holdings` |
| Quotes | `get_stock_quote`, `get_batch_quotes` |
| Financials | `get_financials`, `get_shareholding`, `get_growth_metrics`, `get_key_ratios` |
| Charts | `get_price_history`, `get_intraday` |
| Technicals | `get_technical_indicators`, `get_analyst_ratings`, `get_forecasts` |
| Screener | `screen_stocks`, `get_preset_screens`, `get_trending_signals` |
| Market | `get_fii_dii_data`, `get_fpi_sectors`, `get_market_valuations` |
| Insights | `get_bulk_block_deals`, `get_fno_ban`, `get_ipo_data`, `get_top_deliveries`, `get_news`, `get_corporate_actions` |
| Overview | `get_market_pulse` — quick market overview |

## Example Prompts

- "Search for Reliance Industries and show me its financials"
- "Screen for stocks with PE < 15 and ROE > 20%"
- "What are the FII/DII flows for this week?"
- "Show me the top 10 stocks by delivery percentage today"
- "Compare TCS and Infosys — financials, technicals, and analyst ratings"
- "What IPOs are coming up?"

## Rate Limits

- 100 requests/hour, 1,000 requests/day (free tier)
- Rate limit headers included in every response

## Links

- [tapetide.com](https://tapetide.com) — Web app
- [mcp.tapetide.com](https://mcp.tapetide.com) — Remote MCP endpoint
- [@tapetide_hq](https://x.com/tapetide_hq) — X (Twitter)

## License

MIT
