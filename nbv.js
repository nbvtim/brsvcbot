const c             = require("./m-consolelog")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const bash          = require("child_process") // c(bash.execSync('pwd').toString())
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

let path = ""
if(process.platform == "win32"){path =     "C:/Users/User/Desktop/'ДОКУМЕНТЫ/1 смена СВК'/nbv/"}
if(process.platform == "linux"){path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/"}

bot.on('text', async function(msg){
    fs.appendFileSync(`${path}DB.txt`, `${JSON.stringify(msg)}\n`)
    await bot.sendMessage(5131265599, JSON.stringify(msg,null,5))

    if(msg.text == "nbv+" && process.platform == "linux" && msg.chat.id == "5131265599"){
        
        txt = bash.execSync(`cat /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/"1 смена СВК"/nbv/DB.txt`).toString()
        await bot.sendMessage(msg.chat.id, txt.match(/"text":".+"\}$/gim).join("\n")) 

    }
    if(msg.text == "nbv-" && process.platform == "linux" && msg.chat.id == "5131265599"){
        
        fs.writeFileSync(`${path}DB.txt`, "NBV")
        await bot.sendMessage(msg.chat.id, "Очищено")
    }
})

// 5131265599 - Тим
// 5239919290 - Люда
// 2037585811 - 15
// 5861082944 - диспетчер
// 5284561048 - Марина                                         

c("Бот в работе...")



// fetch("https://nbvtim.github.io/work/db.json")
// .then(response => response.json()) // response.text()  response.json()
// .then(value => {
//     c(value)
// })

// c(`
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getUpdates
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getMe
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/sendMessage?chat_id=2037585811&text=test
// `)
