let c               = console.log

const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

bot.deleteMyCommands()

m1 = ["message_id",    "from",    "chat",    "date"]

bot.on("message", async msg=>{
    m2 = Object.keys(msg)
    for(i in m2){
        if(m2[i] !== m1[i]){
            bot.sendMessage(msg.chat.id, `${ m2[i]  } = ${ JSON.stringify(msg[m2[i]], null, 4) }`)
        }
    }
})


