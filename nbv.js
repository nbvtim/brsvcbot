const c             = require("./m-helpers")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})


bot.setMyCommands([ // В command не применять заглавные буквы
    {
        command:"start",
        description:"Старт"
    },{
        command:"help",
        description:"Помощь"
    },{
        command:"settings",
        description:"Настройки"
    },{
        command:"list",
        description:"Список записей"
    },{
        command:"dellfile",
        description:"Удалить файл"
    }
])

bot.on('message', async function(msg){

    c(`${msg.chat.id} > ${msg.text}`)
    if(process.platform == "android"){file = `${__dirname}/../storage/downloads/${msg.chat.id}_${msg.from.first_name}.txt`
    }else{file = `${__dirname}\\${msg.chat.id}_${msg.from.first_name}.txt`}

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }else{
        fs.writeFileSync(file, `"text":"${Date.now()}"\n`)
    }

    if(msg.text == "/start"){
        await bot.sendMessage(msg.chat.id, `<i>Привет <b>${msg.from.first_name}</b> !!!</i>`, {parse_mode:"HTML"})
        await bot.sendMessage(msg.chat.id, "<b>Очистите кеш для правильной работы бота !!!</b>", {parse_mode:"HTML"})
        await bot.sendMessage(msg.chat.id, "Отгадайте число от 0 до 9 ", {parse_mode:"HTML"})
        number = Math.floor(Math.random()*10)
        await bot.sendMessage(msg.chat.id, `<tg-spoiler>Цифра ${number}</tg-spoiler>`, {parse_mode:"HTML"})
    }

    if(msg.text == "/list"){
        txt = fs.readFileSync(file, "utf-8").match(/"text":"([^"]+)"/gim).join("\n").replace(/"text":/g, '')
        await bot.sendMessage(msg.chat.id, `lenth: <b>${txt.length}</b> max: <b>4096</b>`, {parse_mode:"HTML"})
        await bot.sendMessage(msg.chat.id, `<i>${txt}</i>`, {parse_mode:"HTML"})
    }

    if(msg.text == "/dellfile"){
        fs.unlinkSync(file)
        await bot.sendMessage(msg.chat.id, "Файл удален")
    }

})




c("Бот в работе...")
bot.getMe().then(r => console.log(r)).catch(e => console.log(e))
c({
    os : process.platform,
    dir: __dirname,
})
