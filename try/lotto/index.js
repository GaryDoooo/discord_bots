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
  if (msg.author === bot.user || msg.author.bot || !msg.mentions.users.size) {
    return;
  }
  if (msg.mentions.users.first() !== bot.user) {
    return;
  }
  if (if_in(msg.content, "random")) {
    msg.reply(Math.floor(Math.random() * 15 + 1));
  }
});

bot.login(tokens.token2);
