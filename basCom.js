const Discord = require('discord.js');      //for Discord library
const client = new Discord.Client();        //for Discord client
const embed = new Discord.RichEmbed()       //for Discord embeds

exports.basCom = function(msg, inviteURL) {
  // Check message contents for basic commands
    if (msg.content.startsWith('!ping')) {
      msg.reply(`Pong! -- ${client.ping}`);
      console.log("\nRequest:");
      console.group();
      console.log(msg.author.tag);
      console.log(`Message: "${msg.content}"\nTimestamp: ${msg.createdTimestamp}`);
      console.groupEnd();
    }
    else if(msg.content.startsWith("!avatar")) {
      msg.reply(msg.author.avatarURL);
      console.log("\nRequest:")
      console.group();
      console.log(`${msg.author.tag} -- ${msg.author.id}\nAvatar`);
      console.groupEnd();
    }
    else if(msg.content.startsWith("!invite")) {
      if(inviteURL === "") msg.channel.send(`You haven't set an invite link yet!`)
      else {
        embed
          .setTitle("Invite!")
          .setAuthor(msg.author.tag, msg.author.avatarURL)
          .setColor("#000000")
          .setDescription(`Invite Link --> ${inviteURL}`)
          .setFooter(`User ID: ${msg.author.id}`, msg.author.avatarURL)
          .setThumbnail("https://bit.ly/2TvWFNG")
          .setTimestamp()
          .addField("Expiration", "Expires: Never")
          .addField("Current Uses", )

        msg.channel.send({embed});
      }
    }
}