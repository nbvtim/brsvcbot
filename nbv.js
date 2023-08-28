const c             = require("./m-helpers")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const req           = require("request")
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

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

bot.onText(/^ат\s/i, async function(msgg){
    
    req('https://nbvtim.github.io/work/db.json', async function (error, response, body) {
        db = JSON.parse(body)[0].data
        input = msgg.text.replace(/ат\s/i, "")
        for(i in db){
            indexof = JSON.parse(body)[0].data[ i ].join(", ").toLowerCase().indexOf(input)
            if(indexof > 0){
                txt = JSON.parse(body)[0].data[ i ].join("\n")
                await bot.sendMessage(msgg.chat.id, txt, {parse_mode:"HTML"})
            }
        }
        
    })

})

bot.on('message', async function(msg){

    // c(`${msg.chat.id} > ${msg.text}`)
    if(process.platform == "android"){
        file = `${__dirname}/../storage/downloads/${msg.chat.id}_${msg.from.first_name}.txt`
    }else{
        file = `${__dirname}\\${msg.chat.id}_${msg.from.first_name}.txt`}

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }else{
        fs.writeFileSync(file, `{"text":"${msg.from.first_name}"}\n`)
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)
    }

    if(msg.text == "/start"){

        await bot.sendMessage(msg.chat.id, `<i>Привет <b>${msg.from.first_name}</b> !!!</i>`, {parse_mode:"HTML"})
        await bot.sendMessage(msg.chat.id, "Отгадайте число от 0 до 9 ", {parse_mode:"HTML"})
        number = Math.floor(Math.random()*10)
        await bot.sendMessage(msg.chat.id, `<tg-spoiler>Цифра ${number}</tg-spoiler>`, {parse_mode:"HTML"})

    }

    if(msg.text == "/auto"){
        bot.sendMessage(msg.chat.id, `<i>чтобы сделать запрос на поиск по автотранспорту наберите:</i> \n<pre>ат запрос</pre>`, {parse_mode:"HTML"})
    }

    if(msg.text == "/histiry"){

        mass = fs.readFileSync("2037585811_stsmena.txt","utf8").match(/^.+/gim)
        await bot.sendMessage(msg.chat.id, `-----------------------------------------------------------------------`)
        for(i in mass){
            await bot.sendMessage(msg.chat.id, `<i>${JSON.parse( mass[i] ).text}</i>`, {parse_mode:"HTML"})
        }
        await bot.sendMessage(msg.chat.id, `-----------------------------------------------------------------------`, {
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




c("Бот в работе...")
bot.getMe().then(r => console.log(r)).catch(e => console.log(e))
c({
    os : process.platform,
    dir: __dirname,
})