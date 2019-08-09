/////////////////////////////////////////////////////////////////
//  Title:        bot.js                                       //
//  Author:       Jake Roberts                                 //
//  Created Date: 4/24/2019                                    //
//  Updated:      6/4/2019                                     //
//  Description:  Checks messages passed in for non-moderation //
//  		          commands                                     //
//  Dependencies: None                                         //
/////////////////////////////////////////////////////////////////

const Discord = require('discord.js');          //for Discord library
const client = new Discord.Client();            //for Discord client
const fs = require('fs');                       //for filestream
const embed = new Discord.RichEmbed();          //for Discord embeds
const readFile = require('./readFile.js');      //for readFile function
const message = require('./message.js');        //for converting messages to arrays
const language = require('./language.js');      //for language checks
const basCom = require('./basCom.js');          //for basic commands
const moderation = require('./moderation.js');  //for performing moderation actions
const welcome = require('./welcome.js');        //for welcoming people to the server
const secret = require('./secret.js');          //not uploaded to GitHub to prevent my token from being stolen

let badWords = [''];

badWords = readFile.readFile();                                                                       //load profanities into memory

/********************************************************************************
 * "Ready Function"                                                             *
 * Listens for a 'ready' signal when it connect to Discord                      *
 * When the client is connected, the function clears the console and logs to the*
 *  console that it is connected with the ID of Skipper (the bot), and that it  *
 *  is ready                                                                    *
 ********************************************************************************/

client.on('ready', () => {
  console.clear();
  console.log(`Connected as ${client.user.tag} -- ${client.user.id}`);
  console.log("Ready...\n");
});

/********************************************************************************
 * "Message Function"                                                           *
 * Listens for messages sent to servers that it is in                           *
 * When a message is sent to a server, this function first checks if the message*
 *  was not sent by a bot, converts it all to lower case, converts it to an     *
 *  array, initializes a const variable that holds information about the message*
 *  (server it was sent in, tag, ID, message content, and timestamp). Then      *
 *  checks the message for language, and checks for any commands in the message *
 ********************************************************************************/

client.on('message', async msg => {
	//let msgInfo = `Request:\n${msg.author.tag} -- ${msg.author.id}\n`;
  if(msg.author.bot) return;

  msg.content = msg.content.toLowerCase();
  const array = message.convert(msg);

	const msgInfo = `Request:\n\t${msg.guild.name}\n\t${msg.author.tag} -- ${msg.author.id}\n\t${array[0]}\n\tMessage: "${msg.content}"\n\tTimestamp: ${msg.createdTimestamp}\n\n`

  language.language(msg, array, badWords);

  if(!msg.mentions.users.first() && msg.content.startsWith("!delete") && Number(array[1]) <= 100)
  {
    moderation.delete1(msg, array[1], msgInfo);
    return;
  }

  if(msg.mentions.users.first() && msg.content.startsWith("!delete") && Number(array[5]) <= 100)
  {
    moderation.delete2(msg, array[1], msgInfo);
    return;
  }

  if (msg.content.startsWith("!ban"))
	{
    moderation.ban(msg, array, msgInfo);
    return;
  }

  if (msg.content.startsWith("!kick") && msg.mentions.users.first())
	{
    moderation.kick(msg, array[3], msgInfo);
    return;
  }

  if(msg.content.startsWith("!softban"))
  {
    moderation.ban(msg, array, msgInfo);
    moderation.unban(msg, array, msgInfo);
    return;
  }

  if (msg.content.startsWith("!unban")) //ID handling inside function
	{
    moderation.unban(msg, array, msgInfo);
    return;
  }


    basCom.basCom(msg, msgInfo);
    return;

	return;
});

client.on('guildMemberAdd', member => { welcome.welcome(member); });


//bot_secret_token = secret.token();

client.login(secret.token());





// NOTES
// if I convert messages to arrays, then I can check each word individually for profanities
