const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: {interval: 300, autoStart: true}})

bot.setMyCommands([ 
    {command:"start", description:"Старт"},
    {command:"auto", description:"Автотранспорнт"},
])

const obj = {}


try {   bot.on("message", async msg=>{ 
    security(msg.chat.id)
    
c(obj)

    })

}catch (error) {
    c("error")
}

function security(id){
    
}