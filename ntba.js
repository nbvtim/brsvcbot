const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")

bot.setMyCommands([{command:"test",       description:"Тест"}])
bot.on("message", async msg=>{

    await bot.sendMessage(msg.chat.id, `random : ${Math.round(Math.random()*10000000000000)}\ndatenow: ${Date.now()}`, {parse_mode:"HTML"})

})