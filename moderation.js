/// ///////////////////////////////////////////////////////////
//  Filename:     moderation.js            //
//  Author:     Jake Roberts            //
//  Date:    TBD              //
//  Updated:    6/4/2019            //
//  Description:  Used for execution of moderation actions  //
//  Dependencies: Discord.js library          //
/// ///////////////////////////////////////////////////////////

// const Discord = require('discord.js') // for Discord library
// const client = new Discord.Client() // for Discord client

// deletes the number of messages specified
exports.delete1 = function(msg, num, msgInfo) {
  console.log('Request:\n')
  console.group()
  console.log(`${msgInfo}Delete1`)
  console.log(`Message: "${msg.content}"\nTimestamp: ${msg.createdTimestamp}`)
  console.groupEnd()
}

// deletes a specified number of messages sent by a user
exports.delete2 = function(msg, ID, num, msgInfo) {
  console.log('Request:\n')
  console.group()
  console.log(`${msgInfo}Delete2`)
  console.log(`Message: "${msg.content}"\nTimestamp: ${msg.createdTimestamp}`)
  console.groupEnd()
}

// kicks member
exports.kick = function(msg, msgInfo) {
  console.log('kick was run\n\n')

  const user = msg.mentions.users.first()
  console.log(user)

  if (!msg.member.highestRole.hasPermission('KICK_MEMBERS')) { msg.reply('you can\'t use that command!') } else {
    const member = msg.guild.member(user)
    if (member) {
      member.kick({ reason: '' })
        .then(() => { msg.reply(`Successfully kicked <@${user.tag}>!`) })
        .catch(err => { msg.reply('I couldn\'t ban that person!'); console.err(err) })
    } else { msg.reply('that person isn\'t in the server!') }
  }
}

// bans, then unbans user (essentially kicks and deletes messages)
exports.softban = function(msg) {
  const user = msg.mentions.users.first()
  console.log('softban was run\n\n')

  if (!msg.member.highestRole.hasPermission('BAN_MEMBERS') || !msg.guild.owner) { msg.reply('you cna\'t use that command!') } else {
    const member = msg.guild.member(user)
    if (member) {
      msg.guild.ban(user, 7, { reason: '' })
        .then(msg.guild.unban(user.id))
        .then(() => { msg.reply(`Successfully softbanned ${user.tag}!`) })
        .catch(err => { msg.reply('I couldn\'t softban that person!'); console.error(err) })
    } else { msg.reply('That person isn\'t in ther server!') }
  }
}

// bans member
exports.ban = (msg) => {
  const user = msg.mentions.users.first()
  console.log(user)

  if (!msg.member.highestRole.hasPermission('BAN_MEMBERS') || !msg.guild.owner) { msg.reply('you can\'t use that command!') } else {
    const member = msg.guild.member(user)
    if (member) {
      msg.guild.ban(user.id, 7, { reason: '' })
        .then(() => { msg.reply(`Successfully banned ${user.tag}!`) })
        .catch(err => { msg.reply('I couldn\'t ban that person!'); console.error(err) })
    } else { msg.reply('That person isn\'t in the server!') }
  }
}

// unbans member
exports.unban = function(msg) {
  console.log('unban was run\n\n')

  if (!msg.member.highestRole.hasPermission('BAN_MEMBERS') || !msg.guild.owner) { msg.reply('you can\'t use that command!') } else {
    msg.guild.unban(msg.user.id)
      .then(() => { msg.reply(`successfully unbanned ${msg.user.tag}!`) })
      .catch(err => { msg.reply('that person is already unbanned!'); console.error(err) })
  }
}
