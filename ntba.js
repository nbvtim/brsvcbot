const c             = console.log
const fs            = require("fs")
// const TelegramApi   = require('node-telegram-bot-api')
// const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
// const xlsx          = fs.existsSync("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx") && require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")

// bot.setMyCommands([{command:"test",       description:"Тест"}])
// bot.on("message", async msg=>{
    
// })

let html = fs.readFileSync(`${__dirname}/SOURSE/index.html`, "utf8")
const express = require('express')()
express.get('/', (req, res) => {
    res.send(html)
})
express.listen(65535, "127.255.255.254", () => {c(`http://127.255.255.254:65535/`)})