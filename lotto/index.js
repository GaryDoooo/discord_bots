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

var lotto_list = [];
const lotto_max = 2;
// main channel HL staff role id "659396651815010304");
const gm_role_id = "659396651815010304";
// bot spam channel id 632376154518585356
const bot_spam_channel_id = "632376154518585356";

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
    var channel = bot.channels.find(x => x.id === bot_spam_channel_id);
    try {
      channel.send(
        "<@" +
          msg.author.id +
          "> Here is some info about the Sky Heart Lotto: \n" +
          " - The lotto is first come first serve \n" +
          " - We hold one heart lotto at 11am PST every Wednesday " +
          "and another on Saturday at 10pm PST \n" +
          " - to enter, send a screenshot in #heart-lotto-screenshots, " +
          "confirming that you have at least 4 candles to be able to send to the winner \n " +
          " - You will also need to take a screenshot (and send it to #heart-lotto-screenshots)" +
          " to confirm that you sent a heart to the winner. \n" +
          " - Type '<@659463264429801492> listhlstaff' to get a list of the heart lotto staff\n" +
          "Current candidates:" +
          lotto_list.map(m => " " + m.tag) +
          "\nthe total amount of people in the lotto is " +
          lotto_list.length +
          "."
      );
      msg.reply(
        "I've sent the stuff to <#bot-spam> in the Nastymold discord server."
      );
    } catch (e) {
      // console.log("Error", e.stack);
      console.log("Error", e.name, e.message);
      msg.reply("Can't find output channel. or output errors.");
    }
  }
  if (if_in(msg.content, "listhlstaff")) {
    // msg.reply("check out the JS console.");
    // console.log(msg.member.roles);
    role = msg.guild.roles.get(gm_role_id);
    // console.log(role);
    if (typeof role !== "undefined") {
      console.log(role.members.map(m => m.user.id));
      msg.reply("HL Staff: " + role.members.map(m => m.user.tag).join());
    } else {
      msg.reply("no HL staff roles found here.");
    }
  }
  if (
    if_in(msg.content, "i'min") ||
    if_in(msg.content, "iamin") ||
    if_in(msg.content, "imin")
  ) {
    if (lotto_list.length < lotto_max) {
      if (lotto_list.includes(msg.author)) {
        msg.reply("You are already in the heart lotto.");
      } else {
        lotto_list.push(msg.author);
        msg.reply(
          "You're in the Heart Lotto! Current candidates:" +
            lotto_list.map(m => " " + m.tag) +
            "\nthe total amount of people in the lotto is " +
            lotto_list.length +
            "."
        );
      }
    } else {
      msg.reply(
        "This heart lotto is full, the max is " + lotto_max + " people."
      );
    }
  }
  if (if_in(msg.content, "remove")) {
    role = msg.guild.roles.get(gm_channel_id);
    if (typeof role !== "undefined") {
      var hl_staff = role.members.map(m => m.user.id);
      if (hl_staff.includes(msg.author.id) && args.length === 4) {
        if (args[3] === args[2]) {
          var user_to_remove = args[2];
          // list.splice( list.indexOf('foo'), 1 )
          for (var i = 0; i < lotto_list.length; i++) {
            if (lotto_list[i].tag === user_to_remove) {
              lotto_list.splice(i, 1);
              break;
            }
          }
        } else {
          msg.reply("repeat username and tag twice.");
        }
      } else {
        msg.reply(
          "Could not find user or user is not in the heart lotto.\n" +
            "The command for removing someone from the heart lotto list is: " +
            "'<@659463264429801492> remove USERNAME#TAG USERNAME#TAG'\n" +
            "remember to type the username and tag twice as confirmation."
        );
      }
    } else {
      msg.reply("This command only works in some channels...");
    }
  }
});

bot.login(tokens.token2);
