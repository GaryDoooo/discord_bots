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
  const args = msg.content.split(/ +/);
  console.log(args);
  if (if_in(msg.content, "random")) {
    msg.reply(Math.floor(Math.random() * 15 + 1));
  }
  if (
    args.length === 1 ||
    if_in(msg.content, "help") ||
    if_in(msg.content, "halp") ||
    if_in(msg.content, "plzexplain") ||
    if_in(msg.content, "pleaseexplain") ||
    if_in(msg.content, "wot") ||
    if_in(msg.content, "what") ||
    if_in(msg.content, "wat") ||
    if_in(msg.content, "nani")
  ) {
    console.log("print update.");
    msg.reply(
      "I've sent the stuff to <#bot-spam> in the Nastymold discord server."
    );
    //632376154518585356
    var channel = bot.channels.find(x => x.name === "bot-spam");
    channel.send("Hi <@" + msg.author.id + ">\n");
  }
});

bot.login(tokens.token2);
