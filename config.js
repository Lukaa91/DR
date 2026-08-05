// Secrets are read from the environment — do not hardcode them here.
// Required: BOT_TOKEN, GOOGLE_API_KEY

exports.PREFIX = process.env.PREFIX || '?';

exports.TOKEN = process.env.BOT_TOKEN;

exports.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
