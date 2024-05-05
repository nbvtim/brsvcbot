let c               = console.log

const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
bot.setMyCommands([{command:"test",       description:"Тест"}])

m1 = ["message_id",    "from",    "chat",    "date"]

bot.on("message", async msg=>{
    m2 = Object.keys(msg)
    for(i in m2){
        if(m2[i] !== m1[i]){
            bot.sendMessage(msg.chat.id, `<b><u>${ m2[i]  }</u></b> : \n<b>${ JSON.stringify(msg[m2[i]], null, 4) }</b>`, {parse_mode:"HTML"})
        }
    }

    bot.sendMessage(msg.chat.id, `моя мишель - ветер меняет направление (amice remix)
almary - до скорых встреч (nikita lexx remix)
нюша - цунами
xolidayboy - пожары (monamour x slim x shmelev remix)
filatov & karas - это всё не помню я
ap$ent - можно я с тобой (ramirez / pavlov remix)
big baby tape, aarne - hoodak mp3 (ramirez & emil remix)
anna asti - царица (ramirez remix)`, {parse_mode:"HTML"})

})


