const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = "-";
const bot = new commando.Client({
  commandPrefix: prefix
});
const Client = require("fortnite");
const fortnite = new Client('d363fcd6-b87c-430c-b024-fb2ddbbcd564');

class statsCommand extends commando.Command{
  constructor(client) 
  {
    super(client, {
      name: 'stats', 
      group: 'network',
      memberName: 'stats',
      description: "Shows stats of a player"
    });
  }

  async run(message, args)
  {
      var fortniteargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
      var fortniteusername = fortniteargs.join(" ").slice(6);
      var fortniteplatform = "pc";

      if (!fortniteusername) return message.channel.send("This account isn't available. Please enter an available username!");

      fortnite.user(fortniteusername, fortniteplatform).then(data => {

        console.log(data);

        let stats = data.stats;
        let lifetime = stats.lifetime;

        console.log(lifetime);

        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];

        var fortnitestatsembed = new Discord.RichEmbed()
        .setTitle(`**__${fortniteusername}__** - Lifetime Stats`)
        .setColor("#FF0000")
        .addField("__Score__", `${score}`, true)
        .addField("__Matches Played__", `${mplayed}`, true)
        .addField("__Wins__", `${wins}`, true)
        .addField("__Win Chance__", `${winper}`, true)
        .addField("__Kills__", `${kills}`, true)
        .addField("__K/D__", `${kd}`, true)
        .setImage("https://pbs.twimg.com/media/DeEAQPXU8AEQmTB.jpg")
        .setFooter("Discord bot created by | hieu#0843")

        message.channel.send(fortnitestatsembed);



        
      }).catch(e => {
        console.log(e)
        message.channel.send("This account isn't available. Please enter an available username!");
      });

  }
}

module.exports = statsCommand;
