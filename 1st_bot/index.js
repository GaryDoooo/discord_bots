const Discord = require("discord.js");
const bot = new Discord.Client();

const tokens = require("./discord_bot_token.json");

function if_in(input_string, keyword) {
  var lower_case_string = input_string.replace(/ /g, "").toLowerCase();
  if (lower_case_string.includes(keyword)) {
    return true;
  } else {
    return false;
  }
}

bot.on("ready", () => {
  console.log("online");
});

bot.on("message", msg => {
  if (msg.author === bot.user) {
    return;
  }

  if (if_in(msg.content, "uwu")) {
    msg.reply("OwO");
  }
  if (if_in(msg.content, "nani")) {
    msg.reply("???");
  }
  if (if_in(msg.content, "ree")) {
    msg.reply("Ree?");
  }
  if (if_in(msg.content, "hoi!")) {
    msg.reply("hAi :nastymoldemote:");
  }
  if (if_in(msg.content, "ha")) {
    msg.reply(":skylol::skylol:");
  }
  if (if_in(msg.content, "meow")) {
    msg.reply(":rofl:");
  }
  if (if_in(msg.content, "ono")) {
    msg.reply("OH NOES");
  }
  if (if_in(msg.content, "bored")) {
    msg.reply(
      "https://tenor.com/view/kanna-sad-kawai-kobayashi-anime-cute-gif-11627087"
    );
  }
  if (msg.isMentioned(bot.user)) {
    msg.reply("Ree?");
  }
});

bot.on("guildMemberAdd", member => {
  var allowed_channel_ids = ["619632393736683522", "651230800116973572"];
  member.guild.channels.forEach(function(channel) {
    console.log(channel);
    if (allowed_channel_ids.includes(channel.id)) {
      member.guild.channels
        .get(channel.id)
        .send("Welcome <@" + member.user.id + ">");
    }
    // if (channel.id === '651230800116973572') {
    //     member.guild.channels.get('651230800116973572').send("wow <@" + member.user.id + ">");
    // }
  });
});

bot.login(tokens.token1);
