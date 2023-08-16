const c             = require("./m-consolelog")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const bash          = require("child_process") // c(bash.execSync('pwd').toString())
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

let path = ""
if(process.platform == "win32"){path =     "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/"}
if(process.platform == "linux"){path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/"}

bot.on('text', async function(msg){

    await bot.deleteMessage(msg.chat.id, msg.message_id)
    fs.appendFileSync(`${path}DB.txt`, `${JSON.stringify(msg)}\n`)
    // <b>bold</b>, <strong>bold</strong>, <i>italic</i>, <em>italic</em>, <a href="URL">inline URL</a>, <code>inline fixed-width code</code>, <pre>pre-formatted fixed-width code block</pre>
    await bot.sendMessage("5131265599", `<i>${Date.now()}</i> <b>${msg.chat.id}</b> <code>${msg.message_id}</code> <a href="https://nbvtim.github.io/work/">https://nbvtim.github.io/work/</a>`, {parse_mode:"HTML"})

    if(msg.text == "nbv+" && process.platform == "linux" && msg.chat.id == "5131265599"){

        txt = bash.execSync(`cat /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/"1 смена СВК"/nbv/DB.txt`).toString()
        await bot.sendMessage(msg.chat.id, `<b>${txt.match(/"text":"([^"]+)"/gim).join("\n")}</b>`, {parse_mode:"HTML"}) 

    }

    if(msg.text == "nbv-" && process.platform == "linux" && msg.chat.id == "5131265599"){

        fs.writeFileSync(`${path}DB.txt`, "")
        await bot.sendMessage(msg.chat.id, "Очищено")     

    }
})

c("Бот в работе...")

// 5131265599 - Тим
// 5239919290 - Люда
// 2037585811 - 15
// 5861082944 - диспетчер
// 5284561048 - Марина                                         




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
