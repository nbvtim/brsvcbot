const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

bot.setMyCommands([{command:"test",       description:"Тест"}])

bot.on("message", async msg=>{
    bot.sendMessage(msg.chat.id, msg.text,{parse_mode:"HTML"})
})