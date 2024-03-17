const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6442530903:AAGkpmYCCs7vdB6GWUfJtBMGP9KeQjT4uyk", {polling: true})

const obj = {}

bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"settings",    description:"Настройки"},
    {command:"help",        description:"Помощь"}
])

bot.on("message", async msg=>{
    
    if( obj[msg.chat.id] === undefined){ obj[msg.chat.id] = {} }
    obj[msg.chat.id].id = msg.from.id
    obj[msg.chat.id].text = msg.text
    if( msg.entities ){ obj[msg.chat.id].command = msg.text }
    obj[msg.chat.id].sequrity = false
    obj[msg.chat.id].first_name = msg.from.first_name
    obj[msg.chat.id].username = msg.from.username
    if( obj[msg.chat.id].history === undefined){ obj[msg.chat.id].history = [] }
    obj[msg.chat.id].history.push(msg.text)
    if( obj[msg.chat.id].history.length > 100 ){ obj[msg.chat.id].history.shift() }
    if (obj[msg.chat.id].command === "/help" && msg.text === "/help"){
        for(i in obj[msg.chat.id].history){
           await bot.sendMessage(msg.chat.id, obj[msg.chat.id].history[i])
        }
    }
    c(obj)
})

bot.on("callback_query", query=>{

})



