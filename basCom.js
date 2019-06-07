/////////////////////////////////////////////////////////////////
//  Title:        basCom.js                                    //
//  Author:       Jake Roberts                                 //
//  Created Date: 4/24/2019                                    //
//  Updated:      6/4/2019                                     //
//  Description:  Checks messages passed in for non-moderation //
//  		  commands                                     //
//  Dependencies: None                                         //
/////////////////////////////////////////////////////////////////

const Discord = require('discord.js');      //for Discord library
const client = new Discord.Client();        //for Discord client
const embed = new Discord.RichEmbed()       //for Discord embeds

exports.basCom = async function(msg, inviteURL) {
  // Check message contents for basic commands
    if (msg.content.startsWith('!ping')) {
      const ping = await msg.channel.send("Ping?");
      ping.edit(`Pong! **${ping.createdTimestamp - msg.createdTimestamp}ms**`)

      console.log("\nRequest:");
      console.group();
      	console.log(msg.author.tag);
      	console.log(`Message: "${msg.content}"\nTimestamp: ${msg.createdTimestamp}`);
      console.groupEnd();
    }

   if(msg.content.startsWith("!avatar")) {
      msg.reply(msg.author.avatarURL);
      console.log("\nRequest:")
      console.group();
      	console.log(`${msg.author.tag} -- ${msg.author.id}\nAvatar`);
      console.groupEnd();
    }

    if(msg.content.startsWith("!invite")) {
      if(inviteURL === "") msg.channel.send(`You haven't set an invite link yet!`)
      else {
        embed
          .setTitle("Invite!")
          .setAuthor(msg.author.tag, msg.author.avatarURL)
          .setColor("#000000")
          .setDescription(`Invite Link --> ${inviteURL}`)
          .setFooter(`User ID: ${msg.author.id}`, msg.author.avatarURL)
          .setTimestamp()
          .addField("Expiration", "Expires: Never")
          .addField("Current Uses", )

        msg.channel.send({embed});
      }
    }
}
