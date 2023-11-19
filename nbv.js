// /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1\ смена\ СВК/nbv/brsvcbot
const c             = console.log
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{

    function pathFile(){
        if(process.platform === "win32")    {return     "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"}
        if(process.platform === "linux")    {return "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"}
        if(process.platform === "android")  {return "запиши путь для android"}
    }       
    c("\033[93m"+`${pathFile()}  =  ${fs.existsSync(pathFile())}`+"\033[m")

    fs.writeFileSync( `${__dirname}/SOURSE/all`, JSON.stringify( xlsx.parse(pathFile()) , null, 4) )
    bd = JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`, "utf8"))
    bdAT = bd[0].data

    // bot.deleteMyCommands()
    bot.setMyCommands([ 
        {command:"start",description:"Старт"},
        {command:"settings",description:"Настройки"},
        {command:"help",description:"Помощь"}
    ])
    // bot.getMyCommands().then(t=>c(t))
    
    bot.on("message", async msg=>{ // c(msg.chat.id)
        mid = msg.chat.id
        txt = msg.text

        if(msg.text[0] !== "/"){
            
            if(txt !== undefined){
                fs.appendFileSync(`${__dirname}/SOURSE/log`, `${msg.date}_${mid}_${msg.chat.first_name} >>> ${txt}\n`)
            }

            if( txt !== undefined && fs.readFileSync(`${__dirname}/SOURSE/users`,"utf8").match(RegExp(mid, "gm")) !== null ){
                
                re = RegExp(txt, "i")
                counter = 0
                for(i in bdAT){
                    str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(re)
                    if(str != null){
                        counter++
                        if(counter <= 7){
                            t = bdAT[i].join("\n")
                            await bot.sendMessage(mid, t)
                        }
                    }
                }
                await bot.sendMessage(mid, `> По запросу: ${msg.text}\n> Найдено записей: ${counter} `)

            }else if(txt !== undefined){
                
                await bot.sendMessage(mid, `Нет доступа\nПредставьтесь и ждите одобрения`)
                await bot.sendMessage(5131265599, `${msg.from.first_name}_${msg.from.username}:\n${txt}`, {
                    reply_markup:{
                        inline_keyboard:[
                            [{text: "добавить", callback_data: mid+"_yes"}, {text: "отказать", callback_data: mid+"_no"}]
                        ]
                    }
                })
            
            }

        }else{
            if(txt === "/start"){
                bot.sendMessage(mid, "<pre>В разработке</pre>", {parse_mode: "HTML"})
            }
            if(txt === "/settings"){
                bot.sendMessage(mid, "--- Настройки ---", {
                    parse_mode: "HTML",
                    reply_markup:{
                        inline_keyboard:[
                            [{text: "Tmate start", callback_data: "tmate_start"}]
                        ]
                    }
                })
            }
            if(txt === "/help"){
                bot.sendMessage(mid, "<pre>В разработке</pre>", {parse_mode: "HTML"})
            }
        }

    })

    bot.on("callback_query", async query=>{ // c(query.data)
        m = query.data.split("_")
        c(m)
        if(m[1] === "yes"){
            fs.appendFileSync(`${__dirname}/SOURSE/users`, `${m[0]}\n`)
            await bot.deleteMessage(query.from.id, query.message.message_id)
            await bot.sendMessage(m[0], `Доступ предоставлен`)
        }
        if(m[1] === "no"){
            await bot.sendMessage(m[0], `Доступ не предоставлен\n\nПовторите попытку\nУкажите больше данных`)
            await bot.deleteMessage(query.from.id, query.message.message_id)
        }

        if(query.data === "tmate_start"){
            bot.sendMessage(query.from.id, "В разработке")
        }
    })
    
    bot.getMe().then(t=>{c("\033[93m" + `${t.username.toUpperCase()} запущен на платформе ${process.platform.toUpperCase()}` + "\033[m")})

}catch(err){

    c("_____________________ TRY ERROR _____________________")

}