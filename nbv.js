const c             = require("./h")
const xlsx          = require('node-xlsx').default
const spawn         = require("child_process").spawn
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{ // ------------------------------------------------------------------

if(process.platform == "win32"){
    allarr = xlsx.parse("C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")
    fs.writeFileSync(`${__dirname}/all`, JSON.stringify(allarr, null, 4))
    c("Данные обновлены !!!")
}

let xlsdb = JSON.parse(fs.readFileSync(`${__dirname}/all`, "utf8"))[0].data

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

    if(process.platform == "win32"){
        file = `${__dirname}/${id}_${msg.from.first_name}.txt`

        fileUser = `${__dirname}/user.txt`
        fs.writeFileSync(fileUser, `${id}\n`)
        re = RegExp(`${id}`,"g")
        access = fs.readFileSync(fileUser,"utf8").match(re)
    }
    if(process.platform == "android"){
        file = `${__dirname}/../storage/downloads/${id}_${msg.from.first_name}.txt`

        fileUser = `${__dirname}/../storage/downloads/user.txt`
        re = RegExp(`${id}`,"g")
        access = fs.readFileSync(fileUser,"utf8").match(re)
    }

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${id}_${msg.chat.first_name} > ${msg.text}\n`)
    }else{
        fs.writeFileSync(file, `\n`)
        fs.appendFileSync(file, `${id}_${msg.chat.first_name} > ${msg.text}\n`)
    }

    if( access != null ){

        if(msg.text == "/start"){ // 
            number = Math.floor(Math.random()*10)
            await bot.sendMessage(id, `<i>Привет <b>${msg.from.first_name}</b> !!!</i>\nОтгадайте число от 0 до 9`, {
                parse_mode:"HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text:"1"},{text:"2"},{text:"3"}],
                        [{text:"4"},{text:"5"},{text:"6"}],
                        [{text:"7"},{text:"8"},{text:"9"}],
                        [{text:"0"}]
                    ]
                }
            })
        }

        if(msg.text == "/auto"){ // 
            bot.sendMessage(id, `<i>Чтобы сделать запрос на поиск по автотранспорту наберите:\n</i><pre>ат запрос</pre>`, {parse_mode:"HTML"})
        }
        if( typeof msg.text == "string" && msg.text.match(/^ат\s/i) ){
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
        
        if(msg.text == "/history"){ // 
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
        
        if(msg.text == "/settings"){ //    
            const termux_battery_status = spawn("termux-battery-status")
            termux_battery_status.stdout.on("data", data => {
                bot.sendMessage(id, `Заряд батареи <b>${JSON.parse(data).percentage}</b>%`,{
                    parse_mode: "HTML",
                    reply_markup:{
                        inline_keyboard:[
                            [{text:"кнопка_1", callback_data:"out_1"},{text:"кнопка_2", callback_data:"out_2"}],
                            [{text:"кнопка_3", callback_data:"out_3"},{text:"кнопка_4", callback_data:"out_4"}]
                        ]
                    }
                })
            })
        }
        
        if(msg.text == "/help"){ //
            await bot.sendMessage(id, "<b>Очистите кеш для правильной работы бота !!!</b>", {parse_mode:"HTML"})
        }



    }else{

        await bot.sendMessage(id, `<b>${msg.from.first_name}</b> доступ ограничен !!!\nДля рассмотрения заявки напишите мне @timnbv`, {parse_mode:"HTML"})
        await bot.sendMessage(5131265599, `Пользователь ${id}_${msg.from.first_name} подал заявку на добавление`, {
            reply_markup:{ inline_keyboard:
                [
                    [{text:"Добавить ?", callback_data: `userAdd_${id}`},{text:"Отказать", callback_data: `userDell_${id}`}]
                ]}})
        await bot.sendMessage(5131265599, `${JSON.stringify(msg, null, 5)}`, {parse_mode:"HTML"})
    }

})

bot.on("callback_query", async function(query){
    c(query)
    if(process.platform == "win32"){
        file = `${__dirname}/${query.message.chat.id}_${query.message.chat.first_name}.txt`
        fileUser = `${__dirname}/user.txt`
    }
    if(process.platform == "android"){
        file = `${__dirname}/../storage/downloads/${query.message.chat.id}_${query.message.chat.first_name}.txt`
        fileUser = `${__dirname}/../storage/downloads/user.txt`
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

bot.getMe().then(function(data){ c(`Бот ${data.username} в работе...`) })


}catch(err){ // ------------------------------------------------------------------
    bot.sendMessage(5131265599, `Ошибка TRY CATCH`)
    c(`Ошибка TRY CATCH`)
}