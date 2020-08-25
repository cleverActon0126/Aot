const Discord = require("discord.js");
const ms = require("ms");
const randomPuppy = require("random-puppy");
const snekfetch = require("snekfetch");

const TOKEN = "NjU1NzY5Njk1MzcwMjE1NDI1.XltsKw.9iHz5WJsqo2awd6NrfnBiAS7s3g";
const PREFIX = "?a";

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Connected as Aot#0350");
  bot.user.setPresence({ activity: { name: "?ahelp" }, status: "dnd" })
});

bot.on("guildMemberAdd", function(member) {
  const inChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!inChannel) return;

  inChannel.send(`<@${member.id}>`)

  var inembed = new Discord.MessageEmbed()
  .setTitle("User Joined")
  .setColor(0x90EE90)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField("Who joined?", `<@${member.id}>`)
  .addField("Welcome!", `Hey, <@${member.user.id}> welcome to the server! You are the number ${inChannel.guild.memberCount} member! We hope you enjoy the server. Remember to read the rules, information will be provided in <#739800400361947176>. Enjoy!`)
  .setTimestamp()
  .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
  inChannel.send(inembed)

  member.send("Have a great time in Official Acton\'s Empire!")
});

bot.on("guildMemberRemove", function(member) {
  const outChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!outChannel) return;

  var outembed = new Discord.MessageEmbed()
  .setTitle("User Left")
  .setColor(0xff0000)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField("Who left?", `<@${member.id}>`)
  .addField("Goodbye!", "We will never forget you!")
  .setTimestamp()
  .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
  outChannel.send(outembed)

  user.send(`You just left Official Acton"s Empire, but they would never forget you!`)
});

bot.on("message", async function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    //general commands
    case "ping":
     message.channel.send("🏓Pinging").then(m => {
      var ping = m.createdTimestamp - message.createdTimestamp;
      var botping = bot.ws.ping;

      m.edit(`🏓Pong! Bot ping is ${ping}ms\r API Latency is ${botping}ms`)
     });
    break;
    case "noticeme":
     message.reply("Got\'cha!");
    break;
    case "hello":
     message.channel.send("Hi. Nice to meet you!");
    break;
    case "aot":
     message.channel.send("What\'s the matter?");
    break;
    case "bye":
     message.channel.send("OK. Cya!")
    break;
    //end of general commands
    //food Commands
    case "salmon":
     const filter = m => m.author.id === message.author.id
     message.channel.send("Do you want it `raw` or `cooked`? You could also `cancel` if you don't want your salmon.")
     message.channel.awaitMessages(filter, 
      {max: 1, 
        time: 10000
      }).then(collected => {
        if(collected.size == 0) message.channel.send("What the heck were you typing? You type so SLOW bro.")
        else if(collected.first().content == 'cooked') message.channel.send('We just ran out of salmon. GO buy one and we will cook it for ya.')
        else if(collected.first().content == 'cancel') message.channel.send('Operation cancelled')
        else if(collected.first().content == 'raw') message.channel.send("Here's your invisible raw salmon.")
        else message.channel.send('You suck.')
     });
    break;
    case "done":
     message.channel.send("Done. Here you go.");
    break;
    case "apple":
     message.channel.send("OK. Here\'s your golden apple. Here you go. 🍎 <= Yellow");
    break;
    case "pie":
     message.channel.send("OK. Here\'s your *pre-baked* pie. 🥧");
    break;
    case "candy":
     message.channel.send("OK. Oops, it went out of stock, never come back!");
    break;
    //end of food Commands
    //fun commands
    case "door":
     dUser = message.author;

     message.channel.send(`${dUser.tag} => :door:`)
    break;
    case "8ball":
     var eightball = [
      "🟢It is decidedly so.",
      "🟢Without a doubt.",
      "🟢Yes - definitely.",
      "🟢As I see it, yes.",
      "🟢Signs point to yes.",
      "🟡Reply hazy, try again.",
      "🟡Ask again later.",
      "🟡Better not tell you now.",
      "🟡Cannot predict now.",
      "🟡Concentrate and ask again.",
      "🔴Don\'t count on it.",
      "🔴My reply is no.",
      "🔴My sources say no.",
      "🔴Outlook not so good.",
      "🔴Very doubtful."
     ];

     if (!args[1]) return message.channel.send('What did you say?')
     else message.channel.send(eightball[Math.floor(Math.random() * eightball.length)])
    break;
    case "coinflip":
     var coinflip = [
      "Your coin landed on **TAIL**.",
      "Your coin landed on **HEADS**."
     ];

     message.channel.send(coinflip[Math.floor(Math.random() * coinflip.length)]);
    break;
    case "ding":
     message.channel.send("DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG!");
    break;
    case "beep":
     message.channel.send("Boop!")
    break;
    case "kill":
     const iUser = message.mentions.members.first();

     var kill = [
      `${message.author} has been roasted to a a toast like a bread.`,
      `${message.author} accidentally stuck his head in the washing machine and got his head washed off.`,
      `${message.author}\'s beard got pulled off and he lost too much blood. He died. RIP.`,
      `${message.author} jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `${message.author} jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `${message.author} is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
      `${message.author} is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `${message.author} got a gun and didn"t know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `${message.author} was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `${message.author} wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     if(!iUser) message.channel.send(kill[Math.floor(Math.random() * kill.length)])

     var killer = [
      `<@${iUser.id}> has been roasted to a a toast like a bread.`,
      `<@${iUser.id}> accidentally stuck his head in the washing machine and got his head washed off.`,
      `<@${iUser.id}>\'s beard got pulled off and he lost too much blood. He died. RIP.`,
      `<@${iUser.id}> jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `<@${iUser.id}> jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `<@${iUser.id}> is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
      `<@${iUser.id}> is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `<@${iUser.id}> got a gun and didn"t know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `<@${iUser.id}> wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     message.channel.send(killer[Math.floor(Math.random() * killer.length)])
    break;
    case "roast":
      const roUser = message.mentions.members.first();

      var roast = [
      `<@${message.author.id}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
      `<@${message.author.id}> YOU IDOT NEED TO DIE!`,
      `<@${message.author.id}> ARE YOU AN IDOT? PANALTY!`,
      `<@${message.author.id}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
      `<@${message.author.id}> WTF IS WRONG WITH YOU YOU MOTHER F***ER!`,
      `<@${message.author.id}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      if(!roUser) message.channel.send(roast[Math.floor(Math.random() * roast.length)])

      var roaster = [
        `<@${roUser.id}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
        `<@${roUser.id}> YOU IDOT NEED TO DIE!`,
        `<@${roUser.id}> ARE YOU AN IDOT? PANALTY!`,
        `<@${roUser.id}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
        `<@${roUser.id}> WTF IS WRONG WITH YOU YOU MOTHER F***ER!`,
        `<@${roUser.id}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      message.channel.send(roaster[Math.floor(Math.random() * roaster.length)])
    break;
    case "shutdown":
      const sdmUser = message.member;
      const sdUser = message.mentions.members.first();const { promisify } = require("util");
      let sdwait = require("util").promisify(setTimeout);
      if(!sdUser) return message.channel.send("Who to hack?");

        var msg = await message.channel.send(`Prepare to shutdown ${sdUser.id}\'s device.`)
      await sdwait(2500)
      await msg.edit("Starting process...")
      await sdwait(2500)
      await msg.edit(`Locating ${sdUser.id}"s device.`)
      await sdwait(10000)
      await msg.edit(`Found ${sdUser.id}"s location.`)
      await sdwait(3000)
      await msg.edit("Hacking IP address...")
      await sdwait(13000)
      await msg.edit("IP address found.")
      await sdwait(2500)
      await msg.edit(`Starting to shutdown ${sdUser.id}"s device`)
      await sdwait(5000)
      await msg.edit(`Failed to shutdown ${sdUser.id}"s device. Manual shutdown needed.`)
      var embed = new Discord.MessageEmbed()
      .setTitle("Remote Shutdown")
      .setDescription("Someone\'s trying to shudown someone\s device! Beware!")
      .setColor(0xc8e9ca)
      .addField("Who\'s remote shutting down people\' device?", `<@${sdmUser.id}>`)
      .addField("Who\'s being shutted down?", `<@${sdUser.id}>`)
      .addField(`${sdUser.id}"s IP`, "127.0.0.1")
      .addField("Windows 7/8/8.1/10", "Windows is easy to remote shutdown. If you\'re using Windows, follow the steps below.")
      .addField("Step 1", "Open Cmd in administrator.", true)
      .addField("Step 2", "Type `shutdown /i` then hit enter.", true)
      .addField("Step 3", "You will see a pop-up window, press add, then type the IP address writen above, hit add.", true)
      .addField("Step 4", "Choose if you want to shutdown or restart his computer.", true)
      .addField("Step 5", "Type in a message for him.", true)
      .addField("Step 6", "Hit ok.", true)
      .addField("Step 7", "See someone freaks out.", true)
      .addField("Linux and MacOS", `We haven"t test out using Linux or MacOS, but you can use a virtual machine to shutdown <@${sdUser.id}>\'s device.`)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
      message.channel.send(embed)
    break;
    case "spam":
    const spUser = message.member

    const spamChannel = message.member.guild.channels.cache.find(channel => channel.name === "spam")
    if(!spamChannel) return;

    message.channel.send(`Check out <#725534247737360474>! <@${spUser.id}>`)

    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    spamChannel.send("f")
    break;
    case "hack":
      const hUser = message.mentions.members.first();
      if(!hUser) return message.channel.send("Who to hack?")
      let hwait = require("util").promisify(setTimeout);

      var msg = await message.channel.send(`Prepare to hack ${hUser.id}\'s device.`)
      await hwait(5000)
      await msg.edit("Configuring hack.")
      await hwait(1000)
      await msg.edit("Configuring hack..")
      await hwait(1000)
      await msg.edit("Configuring hack...")
      await hwait(1000)
      await msg.edit("Hacking IP.")
      await hwait(1000)
      await msg.edit("Hacking IP..")
      await hwait(1000)
      await msg.edit("Hacking IP...")
      await hwait(5000)
      await msg.edit("IP hacked.")
      await hwait(3000)
      await msg.edit("Accessing to files.")
      await hwait(1000)
      await msg.edit("Accessing to files..")
      await hwait(1000)
      await msg.edit("Accessing to files...")
      await hwait(5000)
      await msg.edit("Selling files to CCP.")
      await hwait(2000)
      await msg.edit("Deleting all filed on their device.")
      await hwait(5000)
      await msg.edit("This may take up to 30 seconds.")
      await hwait(1000)
      await msg.edit("This may take up to 30 seconds..")
      await hwait(1000)
      await msg.edit("This may take up to 30 seconds...")
      await hwait(23097)
      await msg.edit("Done.")
      await hwait(1000)
      await msg.edit("Restoring harmful files to their device.")
      await hwait(1000)
      await msg.edit("Restoring harmful files to their device..")
      await hwait(1000)
      await msg.edit("Restoring harmful files to their device...")
      await hwait(5000)
      await msg.edit("Activating malware.")
      await hwait(1000)
      await msg.edit("Activating malware..")
      await hwait(1000)
      await msg.edit("Activating malware...")
      await hwait(5000)
      await msg.edit("Malware activated.")
      await hwait(3000)
      await msg.edit("Process Successful.")
    break;
    case "joke":
      var jokes = [
        "I invented a new word! Plagiarsm!",
        "Did you hear about the mathemactician who's afraid of negative numbers? \r He'll stop at nothing to avoid them.",
        "Why do we tell actors to \"break a leg?\" \r Because every play has a cast.",
        "Helvetica and Times New Roman walk into a bar. \r \"Get out of here!\"shouts the bartender. \"We don't server your type!\"",
        "Yesterday I saw a guy spill all his Scrabble letters on the road. \r I asked him, \"What's the word on the street?\"",
        "Knock knock! \r Who's there? \r Control freak. \r Con... \r Okay now you say, \"Control freak who?\"",
        "Hear about the new restaurant called Karma? \r There’s no menu: You get what you deserve.",
        "A woman in labor suddenly shouted, \"Shouldn't! Wouldn't! Couldn't! Didn't! Can't!\" \r \"Don't worry,\" said the doc.\"Those are just contractions.\"",
        "A bear walks into a bar and says, \"Give me a whiskey and... cola.\" \r \"Why the big pause?\" asks the bartender. The bear shrugged. \"I'm not sure; I was born with them.\"",
        "Did you hear about the actor who fell through the floorboards? \r He was just going through a stage.",
        "Did you hear about the claustrophobic astronaut? \r He just needed a little space.",
        "Why don't you scientists trust atoms? \r Because they make up everything",
        "Why did the chicken go to the séance? \r To get to the other side.",
        "Where are the things manufactured? \r The satisfactory.",
        "How do you drown a hipster? \r Throw him in the mainstream.",
        "What sits at the bottom of the sear and twitches? \r A nervous wreck.",
        "What does a nosy pepper do? \r Gets jalapeño business!",
        "How does Moses make tea? \r He brews.",
        "Why can't you explain puns to kleptomanicas? \r They always take things literally.",
        "How do you keep a bagel from getting away? \r Put lox on it.",
        "A men tells his doctor, \"Doc, help me. I'm addicted to Twitter!\" \r The doctor replies, \"Sorry, I don't follow you...\"",
        "What king of excercise do lazy people do? \r Diddly-squats.",
        "Why don't calculus majors throw house parties? \r Because you should never drink derive.",
        "What do you call a parade of rabbits hopping backwars? \r A receding hare-line.",
        "What does Charles Dickens keep in his spice rack? \r The best of the thymes, the worst of the thymes.",
        "What's the difference between a cat and a comma? \r A cat has claws at the end of paws; A comma is a pause at the end of a clause.",
        "Why should the number 288 never be mentioned? \r It's two gross.",
        "What did the Tin Man say when he got run over by a steamroller? \"Curses! Foil again!\"",
        "What did the bald man excalim when he received a comb for present? \r Thanks- I'll never part with it.",
        "What did the buddhist say to the hot dog vendor? \r Make me one everything.",
        "What did the left eye say to the right eye? \r Between you and me, something smells.",
        "What do you call a fake noodle? \r An impasta!",
        "How do you make a tissue dance? \r Put a little boogie in it.",
        "What did the 0 say to the 8? \r Nice belt!",
        "What do you call a pony with a cough? \r A little horse.",
        "What did the one hat say to the other? \r You wait here. I'll go on a head.",
        "What do you call a magic dog? \r A labracadabrador.",
        "What did the shark say when he ate the clownfish? \r This tastes a little funny.",
        "What's organge and sounds like a carrot? \r A parrot.",
        "Why can't you hear a pterodactyl go to the bathroom? \r Because the \"P\" is silent.",
        "What do you call a women with one leg? \r Eileen.",
        "What did the pirate say when he turned 80? \r Aye matey.",
        "Why did the frog take the bus to waork today? \r His car got toad away.",
        "What did the buffalo say when his son left for college? \r Bison.",
        "What is an astronaut's favourite part on a computer? \r The space bar.",
        "Why did the yogurt go the art exhibition? \r Because it was cultured.",
        "What do you call an apology written in dots and dashes?",
        "Why did the hipster burn his mouth? \r He drank the coffee before it was cool. ",
        "Once my dog ate the Scrabble tiles. \r He kept leaving little messages around the house.",
        "I told my wife she was drawing her eyebrows too high. \r She looked at me surprised.",
        "Did you hear about the two people who stole a calender? They each got six months.",
        "What’s Forest Gump’s password? \r 1Forest1.",
        "How do poets say hello? \r Hey, haven't we metaphor?",
        "Where does Batman go to the bathroom? \r The batroom",
        "Why did the Oreo go to the dentist? \r Because he lost his filling.",
        "What do you get from a pampered cow? \r Spoiled milk",
        "Why is it annoying to eat next to basketball players? \r They dribble all the time.",
        "What breed of dog can jump higher than buildings? \r Any dog, because buildings can’t jump",
        "How many times can you subtract 10 from 100? \r Once. The next time you would be subtracting from 90.",
        "Why did the M&M go to school? \r It wanted to be a Smartie",
        "Why do bees have sticky hair? \r Because they use honneycombs.",
        "How does a rabbi make his coffee? \r Hebrews it",
        "I got my daughter a fridge for her birthday. \r  I can't wait to see her face light up when she opens it.",
        "I poured root beer in a square glass. \r Now I just have beer.",
        ""
      ];
      let jkwait = require("util").promisify(setTimeout);

      var msg = await message.channel.send(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit("Nope")
      await jkwait(100)
      await msg.edit("U Idot")
      await jkwait(100)
      await msg.edit("Wait")
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(100)
      await msg.edit(jokes[Math.floor(Math.random() * jokes.length)])
      await jkwait(1000)
      await msg.edit(`<@${message.member.id}> here's your joke: \r` + jokes[Math.floor(Math.random() * jokes.length)])
    break;
    case "meme":
      let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
      ];

      let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

      message.channel.startTyping();

      randomPuppy(subreddit).then(url => {
        snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
              attachment: res.body,
              name: 'https://github.com/cleveracton0126/aot-source/aot.jpg'
            }]
          }).then(() => message.channel.stopTyping());
        });
      });
    break;
    //end of fun commands
    //utilities
    case "report":
     const rUser = message.mentions.members.first();
     if(!rUser) return message.channel.send("Could not find user.")
     let rReason = args.slice(2).join(" ")

     var embed = new Discord.MessageEmbed()
     .setTitle("User reports User")
     .setColor(0xff0000)
     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", rReason)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

     let reportsChannel = message.guild.channels.cache.find(channel => channel.name === "report-approval");
     if(!reportsChannel) return message.channel.send("Could not find report channel.");

     message.delete().catch(()=> {});
     reportsChannel.send(embed);
    break;
    case "bugreport":
      const brUser = message.author;
      let brReason = args.slice(2).join(" ")

      var embed = new Discord.MessageEmbed()
      .setTitle("Bug Reported")
      .addField("Bug reported by", `<@${brUser.id}>`)
      .addField("The bug is", brReason)
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let bugreportChannel = message.guild.channels.cache.find(channel => channel.name === "report-approval");
      if(!bugreportChannel) return message.channel.send("Could not find report channel.");

      message.delete().catch(()=> {});
      reportsChannel.send(embed);
      message.channel.send("Acton has received your bug report. Thank you!").then(msg => msg.delete({timeout:5000}));
    break;
    case "time":
      var today = new Date();
      var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      message.channel.send(`Today is ${date}, the time now in UTC is ${time}.`)
    break;
    //end of utilities
    //admin commands
    case "addrole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let arUser = message.mentions.members.first();
      if(!arUser) return message.channel.send("User doesn\t exist!");
      let arRole = message.mentions.roles.first();
      if(!arRole) return message.channel.send("Role?");

       var embed = new Discord.MessageEmbed()
      .setDescription("Role Added to User")
      .setColor(0xff0000)
      .addField("Role Added User", `$arkUser} with ID ${arUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let arChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!arChannel) return message.channel.send("Could not find server logs channel.");

      arChannel.send(embed);

      arUser.roles.add(arRole.id);

      message.channel.send(`Role added for <@${arUser.id}>`)
    break;
    case "tempaddrole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let tarUser = message.mentions.members.first();
      if(!tarUser) return message.channel.send("User doesn\t exist!");
      let tarRole = message.mentions.roles.first();
      if(!tarRole) return message.channel.send("Role?");

      let tartime = args[3]

      tarUser.roles.add(tarRole.id);

      var embed = new Discord.MessageEmbed()
      .setDescription("Role temporily Added to User")
      .setColor(0xff0000)
      .addField("Role Added User", `${tarUser} with ID ${tarUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .addField("Duration", tartime)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let tarChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!tarChannel) return message.channel.send("Could not find server logs channel.");

      tarChannel.send(embed);

      message.channel.send(`Role added for <@${tarUser.id}> for ${tartime}`)

      setTimeout(function() {
        tarUser.roles.remove(tarRole.id);
        message.channel.send(`Role removed for <@${tarUser.id}>`)
      },ms(tartime))
    break;
    case "removerole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let rrUser = message.mentions.members.first();
      if(!rrUser) return message.channel.send("User doesn\t exist!");
      let rrRole = message.mentions.roles.first();
      if(!rrRole) return message.channel.send("Role?");

      var embed = new Discord.MessageEmbed()
      .setDescription("Role Removed from User")
      .setColor(0xff0000)
      .addField("Role Removed User", `${rrUser} with ID ${rrUser.id}`)
      .addField("Removed By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Removed In", message.channel)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let rrChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!rrChannel) return message.channel.send("Could not find server logs channel.");

      rrChannel.send(embed);

      rrUser.roles.remove(rrRole.id);

      message.channel.send(`Role removed for <@${rrUser.id}>`)
    break;
    case "tempremoverole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let trrUser = message.mentions.members.first();
      if(!trrUser) return message.channel.send("User doesn\t exist!");
      let trrRole = message.mentions.roles.first();
      if(!trrRole) return message.channel.send("Role?");

      let trrtime = args[3]

      trrUser.roles.remove(trrRole.id);

      var embed = new Discord.MessageEmbed()
      .setDescription("Role temporily Removed from User")
      .setColor(0xff0000)
      .addField("Role Removed User", `${trrUser} with ID ${trrUser.id}`)
      .addField("Removed By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Removed In", message.channel)
      .addField("Duration", trrtime)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let trrChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!trrChannel) return message.channel.send("Could not find server logs channel.");

      trrChannel.send(embed);

      message.channel.send(`Role removed for <@${trrUser.id}> for ${trrtime}`)

      setTimeout(function() {
        trrUser.roles.add(trrRole.id);
        message.channel.send(`Role added for <@${trrUser.id}>`)
      },ms(trrtime))
    break;
    case "kick":
     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send("User doesn\'t exist!");
     let kReason = args.slice(2).join(" ")
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don\'t have permission to do that!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can\'t be kicked!");

     var embed = new Discord.MessageEmbed()
     .setDescription("User Kicked")
     .setColor(0xff0000)
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

     let kickChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!kickChannel) return message.channel.send("Could not find server logs channel.");
     let kick2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!kick2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(embed);
     kick2Channel.send(embed);

     message.channel.send(`<@${kUser.id}> has been kicked.`)

     kUser.send(`You have been kicked from Acton"s Official Empire. Reason: ${kReason}.`)
    break;
    case "tempban":
     const tbUser = message.mentions.members.first()
     if(!tbUser) return message.channel.send("User doesn\'t exist!")
     let tbReason = args.slice(3).join(" ")
     if(!message.member.hasPermission("BAN_MEMBERS"))  return message.channel.send("You don\'t have permission to do that!");
     if(tbUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned!");

     var tempbantime = args[2];

     var embed = new Discord.MessageEmbed()
     .setTitle("User Temp Banned")
     .setColor(0xff0000)
     .addField("Temp Banned User", `${tbUser} with ID ${tbUser.id}`)
     .addField("Temp Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Temp Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", tbReason)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

     let tempbanChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!tempbanChannel) return message.channel.send("Could not find server logs channel.");
     let tempban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempban2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.member(tbUser).ban(tbReason);
     tempbanChannel.send(embed);
     tempban2Channel.send(embed);

     message.channel.send(`<@${tbUser.id}> has been temp banned for ${tempbantime}.`)

     setTimeout(function() {
       message.guild.members.unban(tbUser.id);
       tempbanChannel.send(`<@${tbUser.id}> has been unbanned.`)
       tempban2Channel.send(`<@${tbUser.id}> has been unbanned.`)
     }, ms(tempbantime))
    break;
    case "ban":
     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send("User doesn\'t exist!");
     let bReason = args.slice(2).join(" ")
     if(!message.member.hasPermission("BAN_MEMBERS"))  return message.channel.send("You don\'t have permission to do that!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can\'t be banned!");

     var embed = new Discord.MessageEmbed()
     .setTitle("User Banned")
     .setColor(0xff0000)
     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", bReason)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

     let banChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!banChannel) return message.channel.send("Could not find server logs channel.");
     let ban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!ban2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.member(bUser).ban(bReason);
     banChannel.send(embed);
     ban2Channel.send(embed);

     message.channel.send(`<@${bUser.id}> has been banned.`)

     bUser.send(`You have been banned from Acton"s Official Empire. Duration: *Infinity*; Reason: ${bReason}`)
    break;
    case "unban":
      const ubID = args[1];
      if(!ubID) return message.channel.send("Who to unban?");
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don\'t have permission to do that!")

      var embed = new Discord.MessageEmbed()
      .setTitle("User Unbanned")
      .setColor(0xff0000)
      .addField("Unbanned User", `<@${ubID}> with ID ${ubID}`)
      .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Unbanned In", message.channel)
      .addField("Time", message.createdAt)
      .setTimestamp()
      .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

      let unbanChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
      if(!unbanChannel) return message.channel.send("Could not find server logs channel.");
      let unban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!unban2Channel) return message.channel.send("Could not find server logs channel.");

      message.guild.members.unban(ubID)
      unbanChannel.send(embed);
      unban2Channel.send(embed);
    break;
    case "update":
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don\'t have permission to do that!");

     var embed = new Discord.MessageEmbed()
     .setTitle("Meme Update")
     .setDescription("Successfully updated to Version 0.41.0!")
     .addField("Prefix", "?a \(Uncustomable\)")
     .addField("Public Commands", "`help` \(Will lead you to other help commands\), `hello`, `aot`, `bye`, `noticeme`, `support`, `salmon`, `apple`, `pie`, `candy`, `spam`, `8ball`, `ding`, `ping`, `beep`, `door`, `coinflip`, `kill`, `roast`, `hack`, `shutdown`, `joke`,  `report`, `bugreport`, `time`, `botinfo`, `userinfo`, `serverinfo`")
     .addField("Admin Commands", "`kick`, `ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`, `addrole`, `tempaddrole`, `removerole`, `tempremoverole`", true)
     .addField("New Commands", "`meme`", true)
     .addField("Removed Commands", "N/A", true)
     .addField("Updates", "New `meme` command!!!")
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")

     message.delete().catch(()=> {});
     message.channel.send(embed);
    break;
    case "mute":
     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(mUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can\'t be muted!");
     let mReason = args.slice(2).join(" ")

     let muterole = mUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!muterole) return message.channel.send("Role doesn\'t exist");

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!muteChannel) return;
     const mute2Channel = mUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!mute2Channel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${mUser.id}>`)
     .addField("Duration", "Infinity")
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", mReason)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     muteChannel.send(embed)
     mute2Channel.send(embed)
    break;
    case "tempmute":
     const tmUser = message.mentions.members.first();
     if (!tmUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(tmUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can\'t be muted!");
     let tmReason = args.slice(3).join(" ")

     let tempmuterole = tmUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!tempmuterole) return message.channel.send("Role doesn\'t exist");

     let mutetime = args[2];

     if(!mutetime){
       return message.channel.send("You did not say how much time!");
     }

     tmUser.roles.add(tempmuterole.id);

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!tempmuteChannel) return;
     const tempmute2Channel = tmUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempmute2Channel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${tmUser.id}>`)
     .addField("Duration", `${ms(ms(mutetime))}`)
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", `${tmReason}`)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     tempmuteChannel.send(embed)
     tempmute2Channel.send(embed)

     setTimeout(function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(`<@${tmUser.id}> has been unmuted!`)
       tempmute2Channel.send(`<@${tmUser.id}> has been unmuted!`)
     }, ms(mutetime));
    break;
    case "unmute":
     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!unmuterole) return message.channel.send("Role doesn\'t exist");

     umUser.roles.remove(unmuterole.id);

     const unmuteChannel = umUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!unmuteChannel) return;
     const unmute2Channel = umUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!unmute2Channel) return;

     unmuteChannel.send(`<@${umUser.id}> has now been unmuted.`);
     unmute2Channel.send(`<@${umUser.id}> has now been unmuted.`)
    break;
    case "clear":
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(!args[1]) return message.channel.send("How many?");
     let clearchannel = message.channel.id;
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:3000}));
     });
     let clearlog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
     if(!clearlog) return message.channel.send("Couldn't find server logs channel.")

     message.channel.send(`<@${message.member.id}> has deleted ${args[1]} in <#${clearchannel}>`)
    break;
    case "quit":

      qUser = message.member;
      let viprole = qUser.guild.roles.cache.find(role => role.name === "V.I.P");
      if (!viprole) return message.channel.send("Role doesn\'t exist");

      if(args[1] === "o") {
        let officerrole = qUser.guild.roles.cache.find(role => role.name === "Officer");
        if (!officerrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(officerrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === "a") {
        let adminrole = qUser.guild.roles.cache.find(role => role.name === "Admin");
        if (!adminrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(adminrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === "ha") {
        let headadminrole = qUser.guild.roles.cache.find(role => role.name === "Head Admin");
        if (!headadminrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(headadminrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else {
        message.channel.send("You don\'t have permission to ")
      }
    break;
    //end of admin Commands
    //information
    case "botinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Bot Information")
     .setColor(0x00bfff)
     .addField("Bot Name", bot.user.username)
     .addField("Bot Created On:", bot.user.createdAt)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "userinfo":
     const sUser = message.mentions.members.first();
     const snUser = message.member;

     var noembed = new Discord.MessageEmbed()
     .setTitle("User Info")
     .setColor(0x00bfff)
     .setThumbnail(snUser.user.displayAvatarURL())
     .addField("Username", snUser.user.tag)
     .addField("Account created at", snUser.user.createdAt, true)
     .addField("Joined server at", snUser.joinedAt, true)
     .addField("Roles", snUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     if(!sUser) return message.channel.send(noembed)

     var embed = new Discord.MessageEmbed()
     .setTitle("User Info")
     .setColor(0x00bfff)
     .setThumbnail(sUser.user.displayAvatarURL())
     .addField("Username", sUser.user.tag)
     .addField("Account created at", sUser.user.createdAt, true)
     .addField("Joined server at", sUser.joinedAt, true)
     .addField("Roles", sUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    case "serverinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Server Info")
     .setDescription("Server\'s information.")
     .setColor(0x00bfff)
     .addField("Server General", "Server General Information")
     .addField("Server Name", message.guild.name, true)
     .addField("Owner", message.guild.owner, true)
     .addField("Created at", message.guild.createdAt, true)
     .addField("People in server", message.guild.memberCount, true)
     .addField("Server Boost", "Server Boost Information")
     .addField("Server Boost Level", message.guild.premiumTier, true)
     .addField("Server Boosts Count", message.guild.premiumSubscriptionCount, true)
     .addField("Voice Channels", "Voice Channels Information")
     .addField("AFK Channel", message.guild.afkChannel, true)
     .addField("Voice Channel AFK Timeout", message.guild.afkTimeout, true)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
     break;
    //end of Information
    //help menus
    case "help":
     var hembed = new Discord.MessageEmbed()
     .setTitle("❓Help Menu❓")
     .addField("🔣General Menu🔣", "`helpgeneral`", true)
     .addField("🍴Food Menu🍴", "`helpfood`", true)
     .addField("😀Fun Menu😀", "`helpfun`", true)
     .addField("❓Info Menu❓", "`helpinfo`", true)
     .addField("🏳️‍🌈Utilities Menu🏳️‍🌈", "`helputilities`", true)
     .addField("⚒️Moderation Menu⚒️", "`helpmod`", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(hembed);
    break;
    case "helpgeneral":
     var embed = new Discord.MessageEmbed()
     .setTitle("🔣General Menu🔣", "These are the general commands.")
     .addField("`aot`", "Waking Aot up", true)
     .addField("`bye`", "Waving hands to Aot", true)
     .addField("`hello`", "A greeting command", true)
     .addField("`noticeme`", "Let Aot to notice you", true)
     .addField("`ping`", "Bot ping", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpfood":
     var embed = new Discord.MessageEmbed()
     .setTitle("🍴Food Menu🍴", "These are the foods for you to eat.")
     .addField("`apple`", "NORMAL apple", true)
     .addField("`candy`", "Sweet one", true)
     .addField("`pie`", "Pie", true)
     .addField("`salmon`", "Raw salmon or cooked salmon can be choose", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpfun":
     var embed = new Discord.MessageEmbed()
     .setTitle("😀Fun Menu😀", "Available games.")
     .addField("`8ball <your question>`", "Predict your future", true)
     .addField("`beep`", "Beep, beep, boop, boop", true)
     .addField("`coinflip`", "Flip a coin!", true)
     .addField("`ding`", "Ding, Dong", true)
     .addField("`door`", "Portal door", true)
     .addField("`joke", "Some jokes for you", true)
     .addField("`roast`", "Be mad a people", true)
     .addField("`shutdown`", "Shutdown  people\'s device", true)
     .addField("`spam`", "Spam", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("❓Info Menu❓", "Informations")
     .addField("`botinfo`", "This bot\'s info")
     .addField("`serverinfo`", "Server information.")
     .addField("`userinfo`", "User\'s information.")
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpmod":
    if(!message.member.hasPermission("VIEW_AUDIT_LOG"))return message.channel.send("Nope.")

     var embed = new Discord.MessageEmbed()
     .setTitle("⚒️Moderation Menu⚒️")
     .addField("`kick <@someone> <reason>`", "Kick people (KICK_MEMBERS)", true)
     .addField("`ban <@someone> <reason>`", "Ban people (BAN_MEMBERS)", true)
     .addField("`tempban <@someone> <duration> <reason>`", "Temporary ban people(BAN_MEMBERS)", true)
     .addField("`mute <@someone> <reason>`", "Mute people (VIEW_AUDIT_LOG)", true)
     .addField("`tempmute <@someone> <time> <reason>`", "Temporary mute people (VIEW_AUDIT_LOG)", true)
     .addField("`unmute <@someone>`", "Unmute a muted person (VIEW_AUDIT_LOG)", true)
     .addField("`addrole <@someone> <@role>`", "Add a role to a person (MANAGE_ROLES)", true)
     .addField("`tempaddrole <@someone> <@role> <time>`", "Add a role to a person Temporary (MANAGE_ROLES)", true)
     .addField("`removerole <@someone> <@role>`", "Remove a role from a person (MANAGE_ROLES)", true)
     .addField("`tempremoverole <@someone> <@role> <time>`", "Remove a role from a person Temporary (MANAGE_ROLES)", true)
     .addField("`clear <amount of messages>`", "Bulk delete messages (VIEW_AUDIT_LOG)")
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    case "helputilities":
     var embed = new Discord.MessageEmbed()
     .setTitle("‍🏳️‍🌈Utilities Menu🏳️‍🌈")
     .setColor(0x00ffff)
     .addField("`report <@someone> <reason>`", "To report people\'s behavior in the server", true)
     .addField("`bugreport <bug>`", "Report a bug that Aot made", true)
     .addField("`time`", "Time now", true)
     .setTimestamp()
     .setFooter("Aot Version 0.41.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    //end of help menus
    default:
     message.channel.send("Invalid command!");
  }
});

bot.login(TOKEN);

