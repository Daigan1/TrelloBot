const Discord = require('discord.js');
const Trello = require("trello");


const {prefix, botToken, bugReportsTrelloID, applicationKey, userToken, acceptedSuggestionsTrelloID, deniedSuggestionsTrelloID, activeSuggestionsTrelloID} = require("./config.json");
console.log(applicationKey, userToken);
const client = new Discord.Client();
const trello = new Trello(applicationKey, userToken);
var embed = new Discord.MessageEmbed()



client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', (message, member, channel) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
var args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  args = args.join(" ");
  let perms = message.member.permissions;


  if (command === 'bug' && message.channel.name == "bug-reports") {
  	if (!args.length) {
  		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  	}
else {


    message.delete();
      trello.addCard(args , "", bugReportsTrelloID ,  function(error, card) {
          embed.setColor('#0099ff');
          embed.setDescription(`id: ${card.shortLink}`);
          embed.setTitle(args);
          embed.setFooter(`by: ${message.author}`);
          embed.setTimestamp();

  message.channel.send(embed)
});




  	}
}





  if (command === 'suggest' && message.channel.name == "suggestions") {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
  else {




      trello.addCard(args , "", activeSuggestionsTrelloID , function(error, card) {
        embed.setColor('#0099ff');
        embed.setDescription(`id: ${card.shortLink}`);
        embed.setTitle(args);
        embed.setFooter(`by: ${message.author}`);
        embed.setTimestamp();

        message.channel.send(embed).then(react => {
          react.react("❌");
          react.react("✔️");
        });
        message.delete();
  });


    }
}





  if (command === 'accept' && perms.has("ADMINISTRATOR")) {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
  else {




      trello.updateCardList(args, acceptedSuggestionsTrelloID, function(error) {
        if (error) {
          message.channel.send("invalid ID!");
        }
        else {
          channel.fetchMessages({limit: 10}).then(collected => {
            collected.forEach(msg => {
              if (message.content.conatins(args)) msg.delete();
            });
            message.channel = "accepted";
          });




        }
      });


    }
}




  if (command === 'deny' && perms.has("ADMINISTRATOR")) {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
  else {


    trello.updateCardList(args, deniedSuggestionsTrelloID, function(error) {
      if (error) {
        message.channel.send("invalid ID!");
      }
      else {
        message.channel.send("Done!");
      }
    });



    }

  }






























});



client.login(botToken);
