const c             = require("./m-consolelog")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const bash          = require("child_process") // c(bash.execSync('pwd').toString())
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})
bot.on("message", msg=>{
    bot.sendMessage(msg.chat.id, `
<b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s>, <tg-spoiler>spoiler</tg-spoiler>
<a href="https://nbvtim.github.io/work/">inline URL</a>
<a href="tg://user?id=2037585811">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
`, {parse_mode:"HTML"})
})


/*
bot.on('message', async function(msg){
    
    fs.appendFileSync(`${__dirname}\\DB.txt`, `${JSON.stringify(msg)}\n`)
    

    if(msg.text == "nbv" && process.platform == "linux" && msg.chat.id == "5131265599"){

        await bot.deleteMessage(msg.chat.id, msg.message_id)
        txt = bash.execSync(`cat /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/"1 смена СВК"/nbv/DB.txt`).toString()
        await bot.sendMessage(msg.chat.id, `<b>${txt.match(/"text":"([^"]+)"/gim).join("\n")}</b>`, {parse_mode:"HTML"}) 

    }

    if(msg.text == "nbvdell" && process.platform == "linux" && msg.chat.id == "5131265599"){

        await bot.deleteMessage(msg.chat.id, msg.message_id)
        fs.writeFileSync(`${__dirname}\\DB.txt`, "")
        await bot.sendMessage(msg.chat.id, "Очищено")     

    }

})

c("Бот в работе...")
bot.getMe().then(r => console.log(r)).catch(e => console.log(e))

c({
    os : process.platform,
    dir: __dirname,
    token: "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
})

*/







/*
    let inlineKeyboard = [	
        {text:"кнопка 1", callback_data:"результат нажатия 1"},
        {text:"кнопка 2", callback_data:"результат нажатия 2"},
    ]

    bot.onText(/\/txt/, async function(msg){

        await bot.sendMessage(msg.chat.id, "<b>Добро пожаловать</b>", {parse_mode:"HTML"})

        bot.sendMessage(msg.chat.id, "КЛАВИАТУРА", {reply_markup: {inline_keyboard: [
            inlineKeyboard
        ]}})

    })

    bot.on("callback_query", async function(query){
        id = query.message.chat.id
        txt = JSON.stringify(query.data)
        
        await bot.sendMessage(id, `<i>${query.data}</i>\n\n<pre>${txt}</pre>\n`, {
            parse_mode:"HTML",
            reply_markup: {inline_keyboard: [inlineKeyboard]}
        })
    })
*/


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
