const c             = require("./m-helpers")
const xlsx          = require('node-xlsx').default
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

if(process.platform == "win32"){
    fs.copyFileSync("C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx", "all.xlsx")
}
let xlsdb = xlsx.parse(`${__dirname}/all.xlsx`)
// c(xlsdb[0].data)
bot.setMyCommands([ // В command не применять заглавные буквы
    {
        command:"start",
        description:"Старт"
    },{
        command:"auto",
        description:"Автотранспорт"
    },{
        command:"histiry",
        description:"История"
    },{
        command:"settings",
        description:"Настройки"
    },{
        command:"help",
        description:"Помощь"
    }
])

bot.on('message', async function(msg){
    
    c(`${msg.chat.id}_${msg.from.first_name} > ${msg.text}`)
    file = `${__dirname}/${msg.chat.id}_${msg.from.first_name}.txt`

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }else{
        fs.writeFileSync(file, `{"text":"${msg.from.first_name}"}\n`)
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }

    if(msg.text == "/start"){
        number = Math.floor(Math.random()*10)
        await bot.sendMessage(msg.chat.id, `<i>Привет <b>${msg.from.first_name}</b> !!!</i>`, {parse_mode:"HTML"})
        await bot.sendMessage(msg.chat.id, "Отгадайте число от 0 до 9 ", {parse_mode:"HTML"})
        
        await bot.sendMessage(msg.chat.id, `<tg-spoiler>Цифра ${number}</tg-spoiler>`, {parse_mode:"HTML"})

    }

    if(msg.text == "/auto"){
        bot.sendMessage(msg.chat.id, `<i>чтобы сделать запрос на поиск по автотранспорту наберите:</i> \n<pre>ат запрос</pre>`, {parse_mode:"HTML"})
    }

    if(msg.text == "/histiry"){

        mass = fs.readFileSync(file, "utf8").match(/^.+/gim)
        await bot.sendMessage(msg.chat.id, `-----------------------------------------------`)
        for(i in mass){
            await bot.sendMessage(msg.chat.id, `<i>${JSON.parse( mass[i] ).text}</i>`, {parse_mode:"HTML"})
        }
        await bot.sendMessage(msg.chat.id, `-----------------------------------------------`, {
            reply_markup:{ inline_keyboard:
                [
                    [{text:"очистить историю", callback_data: "clear"}]
                ]
            }
        })

    }
    
    if(msg.text == "/settings"){
        await bot.sendMessage(msg.chat.id, "<s>данный раздел в разработке</s>", {parse_mode:"HTML"})
    }
    
    if(msg.text == "/help"){
        await bot.sendMessage(msg.chat.id, "<b>Очистите кеш для правильной работы бота !!!</b>", {parse_mode:"HTML"})
    }

})

bot.on("callback_query", async function(query){
    if(query.data == "clear"){
        await bot.sendMessage(query.message.chat.id, `<u>История очищена</u>`, {parse_mode:"HTML"})
        fs.writeFileSync(file, `{"text":"${query.message.chat.first_name}"}\n`)
    }
})

bot.getMe().then(function(r){
    console.log(`Бот ${r.username} в работе...`) 
}).catch(function(e){
    console.log(e)
})