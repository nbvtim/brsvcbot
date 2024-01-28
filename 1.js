const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: {interval: 300,autoStart: true}})

bot.setMyCommands([ 
    {command:"start", description:"Старт"},
    {command:"auto", description:"Автотранспорнт"},
])

const obj = {}
const mass = ["513126 5599",5131265599, ""]

try {   bot.on("message", async msg=>{ 
    obj[msg.chat.id] = {}
    security(msg.chat.id)
    if(msg.text[0] === "/"){
        obj[msg.chat.id].status = msg.text
    }
           
c(obj)

    })

}catch (error) {
    c("error")
}

function security(id){
    obj[id].security = false
    for(i in mass){
        m = mass[i].toString()
        if(m == id){
            obj[id].security = true
        }
    }
}