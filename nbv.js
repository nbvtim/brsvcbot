const c             = require("./m-helpers")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

bot.on('message', async function(msg){
    
    file = `${__dirname}/../storage/downloads/${msg.chat.id}_${msg.from.first_name}.txt`
    
    if(msg.text != "ls" || msg.text != "rm"){
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }
        

    if(msg.text == "ls"){

        txt = fs.readFileSync(file, "utf-8")
        await bot.sendMessage(msg.chat.id, `<b>${txt.match(/"text":"([^"]+)"/gim).join("\n")}</b>`, {parse_mode:"HTML"}) 

    }

    if(msg.text == "rm"){

        fs.writeFileSync(file, "")
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