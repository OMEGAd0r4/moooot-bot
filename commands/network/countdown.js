const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = "-";
const bot = new commando.Client({
  commandPrefix: prefix
});
const ytdl = require('ytdl-core');

class countdownCommand extends commando.Command{
  constructor(client) 
  {
    super(client, {
      name: 'countdown', 
      group: 'network',
      memberName: 'countdown',
      description: "Starts a fortnite scrims countdown from 60 seconds"
    });
  }

  async run(message, args)
  {
    var supportteamerole = message.guild.roles.find(`name`, "Staff");

    if (!message.member.roles.has(supportteamerole.id)) return message.channel.send("You don't have the permission to execute this command");

    const streamOptions = {seek: 0, volume: 1};
    let voiceChannelID = "539276676157145098"; 

    if (!voiceChannelID != null)
    {
      if (message.guild.channels.get(voiceChannelID))
      {
        let vc = message.guild.channels.get(voiceChannelID);
        console.log("next stop, connection");

        vc.join().then(connection => {
          console.log("[Voice Channel] joined countdown channel")
          const stream = ytdl("https://www.youtube.com/watch?v=12T2yaxiolA", {filter: 'audioonly'});
          const dispatcher = connection.playStream(stream, streamOptions);

          dispatcher.on("end", end => {
            console.log("[Voice Channel] left the countdown channel");
            vc.leave();
          });
        }).catch(err => {
          console.log(err)
        });
      }
    }

  }
}

module.exports = countdownCommand;
