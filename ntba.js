const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
const fs            = require('fs')
const unzip         = require('unzip')

bot.on("message", async msg=>{

})

bot.on("callback_query", query=>{

})


st = fs.createReadStream(__dirname+"/data", function(){

})