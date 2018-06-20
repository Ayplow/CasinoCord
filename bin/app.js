const cfg = require("../data/config");
const data = require("../data/data.json")

const Discord = require("discord.js");

//const cards = require("./extensions/cards");
//const cardgames = require("./extensions/cardgames")
//const inputs = require("./extensions/inputs")
//const commands = require("./extensions/commandloader");

const bot = new Discord.Client();


function draw(message) {
    cardCount = message.content.split(" ")[1]
    let deck = new cards.buildDeck();
    let n = deck.carddraw(cardCount)
    if (n.length === 1) {
        v = "You drew a " + n[n.length - 1]["Rank"] + " of " + n[n.length - 1]["Suit"]
    } else {
        v = "You drew"
        for (i = 0; i < n.length - 1; i++) {
            v = v + " a " + n[i]["Rank"] + " of " + n[i]["Suit"] + ",";
        }
        v = v + " and a " + n[n.length - 1]["Rank"] + " of " + n[n.length - 1]["Suit"]
    }

    message.channel.send(v);
}
async function createControlBox(channelid, message, reactList){
    controlMessage = await bot.channels.get(channelid).send(message)
    for (let i in reactList){
        controlMessage.react(reactList[i])
    }
    return controlMessage
}
async function addReactions(message, emojis) {
    for (i = 0; i < emojis.length; i++) {
        await message.react(emojis[i]);
    }
}
async function ControlReaction(messageReaction, user) {
    
}
bot.on("messageReactionAdd", async function (messageReaction, user) {
    if (user !== bot.user) {
        if (messageReaction.message === controlMessage) {
            ControlReaction(messageReaction, user);
        }
    }
});
bot.on("messageReactionRemove", async function (messageReaction, user) {
    if (user !== bot.user) {
        if (messageReaction.message === controlMessage) {
            ControlReaction(messageReaction, user);
        }
    }
});
bot.on("ready", async () => {
    console.log("Floodgates are open for business!\n");
});
bot.on("message", async function (message) {
    if (message.content.charAt(0) === cfg.prefix) {
        let cmdArray = message.content.split(" ");
        let cmdData = message.content.slice(message.content.indexOf(" ") + 1, -1)
        let cmd = cmdArray[0].slice(1)
        switch (cmd) {
            case "blackjack":
                cardgames.blackJack();
                break;
            case "draw":
                draw(message)
                break;
            case "addcontrol":
                 controlMessage = createControlBox(message.channel.id, cmdArray[1], ["🔄","⏹"])
        }
    }
    console.log(message.author.username + ": " + message.content);
});

bot.login(cfg.token);