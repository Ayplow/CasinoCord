const cfg = require("../data/config");
const Discord = require("discord.js");
const BJ = require("./extensions/blackjack");
const commands = require("./extensions/commandloader")
const bot = new Discord.Client();

function blackJack() {
    player_cards = [];
    dealer_cards = [];
    convert = BJ.convert;
    p1 = BJ.carddraw()[0];
    p2 = BJ.carddraw()[1];
    e1 = BJ.carddraw()[2];
    e2 = BJ.carddraw()[3];

}
function draw(message){
    cardCount = message.content.split(" ")[1]
    n = BJ.carddraw(cardCount)
    v = "You drew"
    for (i = 0; i < n.length-1; i++){
        v = v + " a " + n[i]["Rank"] + " of " + n[i]["Suit"] + ",";
    }
    v = v + " and a " + n[n.length-1]["Rank"] + " of " + n[n.length-1]["Suit"]

    message.channel.send(v);
}
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
                blackJack();
                break;
            case "draw":
                draw(message)
                break;
        }
    }
        console.log(message.author.username + ": " + message.content);
});

bot.login(cfg.token);