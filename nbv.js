const c             = require("./h")
const xlsx          = require('node-xlsx').default
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
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
    id = msg.chat.id
    c(`${id}_${msg.from.first_name} > ${msg.text}`)

    if(process.platform == "win32"){
        file = `${__dirname}/${id}_${msg.from.first_name}.txt`

        fileUser = `${__dirname}/user`
        fs.writeFileSync(fileUser, `${id}\n`)
        re = RegExp(`${id}`,"g")
        access = fs.readFileSync(fileUser,"utf8").match(re)
    }
    if(process.platform == "android"){
        file = `${__dirname}/../storage/downloads/${id}_${msg.from.first_name}.txt`

        fileUser = `${__dirname}/../storage/downloads/user`
        re = RegExp(`${id}`,"g")
        access = fs.readFileSync(fileUser,"utf8").match(re)
    }

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${id}_${msg.chat.first_name} > ${msg.text}\n`)
    }else{
        fs.writeFileSync(file, `\n`)
        fs.appendFileSync(file, `${id}_${msg.chat.first_name} > ${msg.text}\n`)
    }

    

    if( access != null ){//dostup != null

        if(msg.text == "/start"){
            number = Math.floor(Math.random()*10)
            await bot.sendMessage(id, `
<i>Привет <b>${msg.from.first_name}</b> !!!</i>
Отгадайте число от 0 до 9
<tg-spoiler>${number} - угадали?</tg-spoiler>
`, {parse_mode:"HTML"})}

        if(msg.text == "/auto"){
            bot.sendMessage(id, `
<i>чтобы сделать запрос на поиск по автотранспорту наберите:</i>
<pre>ат запрос</pre>
`, {parse_mode:"HTML"})
        }

        if( typeof msg.text == "string" && msg.text.match(/^ат\s/i) ){// 
            t = msg.text.replace(/^ат\s/i, "")
            re = RegExp(t, "i")
            counter = 0
            for(i in xlsdb){
                if(xlsdb[i].join(", ").toLowerCase().match(re) && counter < 10){
                    await bot.sendMessage(id, xlsdb[i].join("\n"))
                    counter++
                }
            }
            await bot.sendMessage(id, `<i>Выведено ответов ${counter}</i>`, {parse_mode:"HTML"})
        }
        
        if(msg.text == "/history"){
            mass = fs.readFileSync(file, "utf8").match(/^.+/gim)
            counter = 0
            txt = ""
            for(i = mass.length-1; i >= 0; i--){
                if(counter < 10){
                    await bot.sendMessage(id, `<i>${mass[i]}</i>`, {parse_mode:"HTML"})
                    counter++
                }
            }
            await bot.sendMessage(id, `В истории ${mass.length} записей`, {
                reply_markup:{ inline_keyboard:
                    [
                        [{text:"очистить историю", callback_data: "clear"}]
                    ]
                }
            })
        }
        
        if(msg.text == "/settings"){
            await bot.sendMessage(id, "<s>данный раздел в разработке</s>", {parse_mode:"HTML"})
        }
        
        if(msg.text == "/help"){
            await bot.sendMessage(id, "<b>Очистите кеш для правильной работы бота !!!</b>", {parse_mode:"HTML"})
            
        }

    }else{

        await bot.sendMessage(id, `<b>${msg.from.first_name}</b> доступ ограничен !!!\nДля рассмотрения заявки напишите мне @timnbv`, {parse_mode:"HTML"})
        await bot.sendMessage(5131265599, `Пользователь: ${id}_${msg.from.first_name}`, {
            reply_markup:{ inline_keyboard:
                [
                    [{text:"Добавить ?", callback_data: `userAdd_${id}`},{text:"Отказать", callback_data: `userDell_${id}`}]
                ]}})
    }

})

bot.on("callback_query", async function(query){
    if(process.platform == "win32"){
        file = `${__dirname}/${query.message.chat.id}_${query.message.chat.first_name}.txt`
        fileUser = `${__dirname}/user`
    }
    if(process.platform == "android"){
        file = `${__dirname}/../storage/downloads/${query.message.chat.id}_${query.message.chat.first_name}.txt`
        fileUser = `${__dirname}/../storage/downloads/user`
    }



    if(query.data == "clear"){
        await bot.sendMessage(query.message.chat.id, `<u>История очищена</u>`, {parse_mode:"HTML"})
        fs.writeFileSync(file, `\n`)
    }
    if(query.data.match(/userAdd/) != null){
        id = query.data.match(/\d+/)[0]
        fs.appendFileSync(fileUser , `${id}\n`)
        await bot.sendMessage(query.message.chat.id, `Пользователь добавлен`)
        await bot.sendMessage(id, `Регистрация прошла успешно`)
    }
    if(query.data.match(/userDell/) != null){
        id = query.data.match(/\d+/)[0]
        await bot.sendMessage(query.message.chat.id, `Отказано`)
        await bot.sendMessage(id, `Отказано`)
    }


})

bot.getMe().then(function(r){ c(`Бот ${r.username} в работе...`) })