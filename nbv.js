const c             = require("./m-helpers")
const xlsx          = require('node-xlsx').default
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

if(process.platform == "win32"){
    fs.copyFileSync("C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx", "all.xlsx")
}
let xlsdb = xlsx.parse(`${__dirname}/all.xlsx`)[0].data

bot.setMyCommands([ // В command не применять заглавные буквы
    {
        command:"start",
        description:"Старт"
    },{
        command:"auto",
        description:"Автотранспорт"
    },{
        command:"history",
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
        fs.appendFileSync(file, `${msg.chat.id}_${msg.chat.username}_${msg.chat.first_name} > ${msg.text}\n`)
    }else{
        fs.writeFileSync(file, `\n`)
        fs.appendFileSync(file, `${msg.chat.id}_${msg.chat.username}_${msg.chat.first_name} > ${msg.text}\n`)
    }

    if(msg.text == "/start"){
        number = Math.floor(Math.random()*10)
        await bot.sendMessage(msg.chat.id, `
<i>Привет <b>${msg.from.first_name}</b> !!!</i>
Отгадайте число от 0 до 9
<tg-spoiler>${number} - угадали?</tg-spoiler>
`, {parse_mode:"HTML"})}

    if(msg.text == "/auto"){
        bot.sendMessage(msg.chat.id, `
<i>чтобы сделать запрос на поиск по автотранспорту наберите:</i>
<pre>ат запрос</pre>
`, {parse_mode:"HTML"})
    }

    if(msg.text.match(/^ат\s/i)){
        t = msg.text.replace(/^ат\s/igm, "")
        re = RegExp(t, "i")
        counter = 0
        for(i in xlsdb){
            if(xlsdb[i].join(", ").toLowerCase().match(re) && counter < 10){
                await bot.sendMessage(msg.chat.id, xlsdb[i].join("\n"))
                counter++
            }
        }
        await bot.sendMessage(msg.chat.id, `<i>Выведено ответов ${counter}</i>`, {parse_mode:"HTML"})
    }
    

    if(msg.text == "/history"){
        mass = fs.readFileSync(file, "utf8").match(/^.+/gim)
        counter = 0
        await bot.sendMessage(msg.chat.id, `---------${mass.length}---------`)
        for(i = mass.length-1; i >= 0; i--){
            if(counter < 10){
                await bot.sendMessage(msg.chat.id, `<i>${mass[i]}</i>`, {parse_mode:"HTML"})
                counter++
            }
        }
        await bot.sendMessage(msg.chat.id, `---------${mass.length}---------`, {
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
        await bot.sendMessage(query.message.chat.id, `<u>История очищена</u> \n/history`, {parse_mode:"HTML"})
        file = `${__dirname}/${query.message.chat.id}_${query.message.chat.first_name}.txt`
        txt = `\n`
        fs.writeFileSync(file, txt)
    }
})



bot.getMe().then(function(r){
    c(`Бот ${r.username} в работе...`) 
}).catch(function(e){
    console.error(e)
})