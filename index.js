/*eslint-env node*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const Discord = require('discord.js');
const logging = require('./Logging/index').loggingM;

const colorArrayHex = require('./randomColorHex.json');
const config = require('./config.json');
let PREFIX = config.prefix;
const OwnerID= "328194210802958338";
var spam = config.spam;

const bot = new Discord.Client();

var idiot_org = "https://goo.gl/SysfNV"; //eslint-disable-line
let d = new Date();


bot.on("ready", async () => { // eslint-disable-next-line no-console 
  await bot.user.setActivity("with Discord API");
  logging("Ready at "+ d);// eslint-disable-next-line no-console
  logging(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});


bot.on("message", async function(message) {
  if (!message.guild) return;
  if (message.author.equals(bot.user)) return;
  if (!message.content.startsWith(PREFIX)) return;
  
  const args = message.content.slice(PREFIX.length).split(' ');
  const command = args.shift().toLowerCase();
  var lmId = message.channel.lastMessage.author.id;

  await logging(`${message.id} by ${message.author.tag} (${message.author.id}): ${message.content}`);

  async function geturl(msg) {
    var fetchedMsg = await message.channel.fetchMessage(msg.toString());
    var mUrl  = await fetchedMsg.url;
    return mUrl;
  }

  switch (command) {

    case "geturl": {   /*FINALLY WORKING*/
      if (!args[1]) break; 
      
      var result = await geturl(args[0]).catch(err => console.error(err)); 
      if (!result) { message.reply("the message must be on the channel/guild that I have access to"); }
      else {       
      message.reply(result).catch(err => {logging(err)}); //eslint-disable-line
      }
    break;
    }

    case "say":{
      let sayThis = message.channel.lastMessage.toString().replace(PREFIX + args[0], "");
      message.channel.send(sayThis);
    break;}

    case "token": {//token
      message.channel.send(`<@${lmId}> bot token has been sent in DM.`);
      message.author.send(`\`\`\`js\n const TOKEN = require('./config.json).token\`\`\``);
    break;}
    
    case "ping": {//!ping 
      message.channel.send("Pong!").then(sent => {
        sent.edit(`Pong! \n\`(${sent.createdTimestamp - message.createdTimestamp}ms)\``);
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
      const user = message.mentions.users.first(); //looks for the last mentioned user
        if (message.author.id == user.id) {
            message.reply("Haha fool, why did you try to kick yourself?");
         }

        else if (user.id == OwnerID)  { //HAHA OWNER IS IMMORTAL            
            message.reply("nice try");
          }

        else if (!user.kickable) return message.reply("Couldn't kick user. Please check permissions for the user or bot");

        else if (user) {                             //statement runs if user is found
          const member = message.guild.member(user); //checks if the mentioned user is in the guild(s)
            
          if (member)  { //hmm... 
            member.kick('SYSTEM DEFAULT REASON').then(() => {
              message.reply(`Successfully kicked ${user.tag} (ID: ${user.id})`);
            }).catch( err => {
              message.reply("Unable to kick the user");
              logging(err); //eslint-disable-line
            });
          }
          else message.reply(user.tag + "is not in this guild");
        }
        else message.reply("Invalid user");
         
    break;
        }

    case "spam" : {
      if (message.author.id !== OwnerID) break;
        message.reply("here we go").then(message.edit(spam)
          .catch(err => {
           logging(err); //eslint-disable-line no-console
     }));
    break;
    }

    case "tts" : {
      let sayThis = message.channel.lastMessage.toString().replace(PREFIX + args[0], "");
      message.channel.send(sayThis, {tts: true});
    break;
    }

    case "user" : {
        const user  = message.mentions.users.first();
        const member = message.guild.member(user);
        var isbot = function isbot() {
          if (!user.bot) {
            return "`Account type: Normal user account`";
          }
          else {
            return "`Account type: Bot account`";
          }
        };

        let userLastMsgID = function () {
          if (!member.lastMessageID) return "none";
          else return member.lastMessageID;
        };

        let AvatarURL = await user.displayAvatarURL;
        let joinedGuildAt = (member.joinedAt).toUTCString();
        let creationTime = (user.createdAt).toUTCString();
        let userCurrentGame = function () {
          if (!user.presence.game) return "Currently inactive";
          else return (user.presence.game).toString();   
        };

        let muted = function () {if (!member.muted) return "No"; else return "Yes";};

        //.replace(/T/, ' ')      // replace T with a space
        //.replace(/\..+/, '');     // delete the dot and everything after
        
        message.channel.send({embed: { //bloody hell embeds
          author:{
            name: member.displayName,
            icon_url: AvatarURL
          },
          color: parseInt(randomColour(), 16),
                    description: isbot(),  
          thumbnail : {
            url : AvatarURL,
          },
          fields :[
            { name: "Username",
              value: user.username,
              inline : true,
            },
            { name : "Discriminator",
              value: user.discriminator,
              inline: true,
            },
            { name: "Tag",
              value: user.tag,
              inline: true,
            },
            { name : "ID of last message",
              value: userLastMsgID(),
              inline: true
            },
            { name: "Created at",
              value: creationTime,
              inline: true,
            },
            { name: "Joined guild at:",
              value: joinedGuildAt,
            },
            { name: "Status",
              value: user.presence.status,
              inline: true
            },
            { name: "Game/activity",
              value: userCurrentGame(),
              inline: true,
            },
            { name: "Muted (in any way)" ,
              value: muted(),
            }

          ],
        }}).then().catch(err => console.log(err)); //eslint-disable-line 

        break;
    }

    case "restart" : {
      if (message.author.id !== OwnerID) break;

      process.exit();
    break;
    }
    }
  }
);



bot.on("messageDelete",  (message) =>  {
  logging(`Message ${message.id} was deleted by ${message}`);
});

bot.on("messageUpdate",  async (oldMessage, newMessage) => {
  if (oldMessage.author == bot.user) return;
  var oldContent = await oldMessage.content.toString(); 
  var newContent = await newMessage.content.toString();
 logging(`Message ${oldMessage.id} was updated: ${oldContent} -> ${newContent}`).then().catch(err => console.log(err)); //eslint-disable-line no-console
});

bot.on('messageDeleteBulk', (messages) => { 
logging(`${messages} messages were deleted (bulk delete)`);
} );

bot.on('error', (err) => { 
  logging(`error: ${err}`);
  
});

//HERE WE GO
bot.login(config.token);

//FUNCTIONS// 

function randomColour() { 
  let item = colorArrayHex[Math.floor(Math.random()* colorArrayHex.length)];
  return item;
}
