/*eslint-env node*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const Discord = require('discord.js');
const logging = require('./Logging/index').loggingM;

const TOKEN = require('./config.json').token;
const PREFIX = "!";
const OwnerID= "328194210802958338";

const bot = new Discord.Client();
exports.bot = bot;

// eslint-disable-next-line no-unused-vars
var idiot_org = "https://goo.gl/SysfNV";

let d = new Date();





bot.on("ready", async () => { // eslint-disable-next-line no-console 
  console.log("Ready at "+ d);// eslint-disable-next-line no-console
  logging(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  bot.user.setActivity("with Discord API");
});

bot.on("message", async function(message) {
  if (!message.guild) return;
  if (message.author.equals(bot.user)) return;
  console.log(message.author);//eslint-disable-line 
  if (!message.content.startsWith(PREFIX)) return;
  
  var args = message.content.substring(PREFIX.length).split(" ");
  var n = args[1];
  const cmd = args[0];
  var lmId = message.channel.lastMessage.author.id;

  logging(`${message.id} by ${message.author.tag} (${message.author.id}): ${message.content}`);

  async function geturl(msg) {
    var fetchedMsg = await message.channel.fetchMessage(msg.toString());
    var mUrl  = await fetchedMsg.url;
    return mUrl;
  }

  switch (cmd.toLowerCase()) {
    case "geturl": {   /*FINALLY WORKING*/
      if (!args[1]) break; 
      var result = await geturl(n).catch(err => console.error(err)); 
      if (!result) {message.reply("the message must be on the channel/guild that I have access to"); break; }  
      else {       
      message.reply(result).catch(err => {console.log(err)}); //eslint-disable-line
    break;
     }}
    case "say":{
      var sayThis = message.channel.lastMessage.toString().replace(PREFIX + args[0], "");
      message.channel.send(sayThis);
      break;}

    case "token": {
      message.channel.send(`<@${lmId}> bot token has been sent in DM.`);
      message.author.send(`\`\`\`js\n const TOKEN = require('./config.json).token\`\`\``);
      break;}
    
    case "ping": {//!ping 
      message.channel.send("Pong!").then(sent => {
        sent.edit(`Pong! \nTook ${sent.createdTimestamp - message.createdTimestamp}ms`);
      });
      break;}

    case "p":
    case "purge":{
      const deleteCount = parseInt(args[1], 10);

      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

      const fetched =await  message.channel.fetchMessages(deleteCount);
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

      break; }



      case "kick": {
        if (parseInt(message.author.id) !== parseInt(OwnerID)){break;} //checks if it's the owner or administrator
        const user = message.mentions.users.first(); //looks for the last mentioned user

          if (message.author.id == user.id) {
            message.reply("Haha fool, why did you try to kick yourself?");
          }

          else if (user.id == OwnerID)  { //HAHA OWNER IS IMMORTAL
            
            message.reply("nice try");
          }
          else if (user) { //statement runs if user is found
            const member = message.guild.member(user); //checks if the mentioned user is in the guild(s)

            if (member)  { //hmm... 
              member.kick('SYSTEM DEFAULT REASON').then(() => {
                message.reply(`Successfully kicked ${user.tag} (ID: ${user.id})`);
              }).catch( err => {
                message.reply("Unable to kick the user");
                console.log(err); //eslint-disable-line
              });

            }
            else message.reply(user.tag + "is not in this guild");

          }
          else message.reply("Invalid user");
         
          break;
        }

      case "spam" : {
        message.reply("here we go").then(message.channel.send(`OwO\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhat?`)) 
        .catch(err => {
          console.log(err); //eslint-disable-line no-console
        });
        break;
      }
     }
  }
);

bot.on("messageDelete",  (message) =>  {
  logging(`Message ${message.id} was deleted by ${message.user.tag}`);
});

bot.login(TOKEN);

// eslint-disable-next-line
async function deleteMessages(deleteCount) {// eslint-disable-next-line
  var TBDeleted = await Message.channel.fetchMessages({ limit: deleteCount });
  return TBDeleted;
}
//FUNCTIONS// 



