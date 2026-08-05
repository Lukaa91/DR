exports.run = (client, message, args) => {
  if (message.author.bot) return;
  const messagecount = parseInt(args.join(' '), 10);

  // Discord only allows bulk-deleting 1-100 messages, and nothing older than
  // 14 days. Without these guards `?purge` with no argument passes NaN.
  if (isNaN(messagecount) || messagecount < 1 || messagecount > 100) {
    return message.channel.send('Give me a number between 1 and 100.');
  }

  message.channel.fetchMessages({ limit: messagecount })
    .then(messages => message.channel.bulkDelete(messages, true))
    .then(deleted => message.channel.send(`Deleted ${deleted.size} message(s).`)
      .then(m => m.delete(10000)))
    .catch(err => {
      console.error(err);
      message.channel.send('Could not delete those - messages over 14 days old cannot be bulk deleted.');
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Deletes messages',
  usage: 'purge <amount>'
};
