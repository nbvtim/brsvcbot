const c             = console.log
const fs            = require("fs")
// const TelegramApi   = require('node-telegram-bot-api')
// const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
// const xlsx          = fs.existsSync("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx") && require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")

// bot.setMyCommands([{command:"test",       description:"Тест"}])
// bot.on("message", async msg=>{
    
// })



const express = require('express')()
express.get('/', (req, res) => {
    res.send("<input> КНОПКА </input> ")
})
express.listen(3000, "0.0.0.0", () => {console.log(`express --> listen`)})

