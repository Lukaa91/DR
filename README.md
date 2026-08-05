# DRTB — Divine Realms Discord Bot

A Discord bot written for the Divine Realms Minecraft community (`mc.divinerealms.us`).
It handles moderation, music playback, and a server-side economy in a single Node.js process.

> **Status:** archived / no longer actively maintained. Built on `discord.js` v11, which is
> long past end-of-life — this repo is kept as a record of the project, not as something to deploy.

## Features

**Moderation**
- `ban`, `unban`, `kick`, `mute`, `warn` with sequential case numbers
- `purge` for bulk message deletion, `lockdown` to freeze a channel
- `reason` to attach context to an existing case after the fact
- Configurable word filter with per-user exemptions
- Join / leave / ban / role-change events logged to a mod channel

**Music**
- YouTube playback via the YouTube Data API — single tracks, search, or full playlists
- Per-guild queue with `play`, `skip`, `stop`, `pause`, `resume`, `volume`, `np`, `queue`
- Interactive search: pick from the top 10 results by replying with a number
- Bot presence updates to show the current track

**Economy**
- Per-guild balances backed by SQLite
- `buy` a shop of cosmetic Discord roles, defined in `items.json`
- `balance` to check funds, `setmoney` for staff adjustments

**Misc**
- `help` / `helpop`, `ping`, `stats`, `say`, `ascii` (figlet), `rps`
- `suggest` posts a suggestion embed to a review channel with 👍/👎 reactions
- `reload` hot-reloads a command file without restarting the bot

## Permission model

Four levels, resolved per message in `client.elevation()`:

| Level | Who |
|-------|-----|
| 0 | Everyone |
| 2 | Moderator role (`modrolename`) |
| 3 | Admin role (`adminrolename`) |
| 4 | Bot owner (`ownerid`) |

## Layout

```
app.js              entry point — client setup, music, economy, misc handlers
config.js           prefix + API key (read from environment; see below)
settings.json       role names, owner ID, prefix
items.json          shop catalogue for the economy
commands/           one file per command, each exporting { conf, help, run }
events/             discord.js event handlers, auto-registered by util/eventLoader
util/               case numbering, event loader, user parsing
Procfile            worker process definition for Heroku-style hosts
```

## Running it

```bash
git clone https://github.com/Lukaa91/DR.git
cd DR
npm install
```

Set the required secrets as environment variables — **never commit them**:

```bash
export BOT_TOKEN="your-discord-bot-token"
export GOOGLE_API_KEY="your-youtube-data-api-key"
npm start
```

Then edit `settings.json` to match your server's role names and owner ID.

Requires Node.js and a build toolchain for the native audio dependencies
(`node-opus`, `sqlite3`, `ffmpeg`).

## License

Apache-2.0. See [LICENSE](LICENSE).

<sub>Note: source comments and some user-facing strings are in Serbian.</sub>
