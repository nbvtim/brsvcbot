const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
// bot.getMe().then(           (t) =>  {   c(t)    })



bot.on("message", async msg=>{
    
})

