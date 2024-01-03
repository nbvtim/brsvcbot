// /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1\ смена\ СВК/nbv/brsvcbot
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')

const h             = require("./h")
const c             = h.c
const bot           = new TelegramApi (h.token, {polling: true})

try{
const bdAT = h.bd_all[0].data

    // bot.deleteMyCommands()
    // bot.setMyCommands([ 
        // {command:"start",description:"Старт"},
        // {command:"settings",description:"Настройки"},
        // {command:"help",description:"Помощь"}
    // ])
    // bot.getMyCommands().then(t=>c(t))
    
    bot.on("message", async msg=>{ // c(msg.chat.id)
        
        if(msg.text !== undefined){
            fs.appendFileSync(`${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n`)
        }

        if(msg.text !== undefined && msg.text !== "/" && fs.readFileSync(`${__dirname}/SOURSE/users`,"utf8").match(RegExp(msg.chat.id, "gm")) !== null){
            c(fs.readFileSync(`${__dirname}/SOURSE/users`,"utf8").match(RegExp(msg.chat.id, "gm")))

            re = RegExp(msg.text, "i")
            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(re)
                if(str != null){
                    if(counter < 5){
                        counter++
                        t = bdAT[i].join("\n")
                        await bot.sendMessage(msg.chat.id, t)
                    }
                }
            }
            await bot.sendMessage(msg.chat.id, `<b><i>Найдено записей: ${counter}</i></b>`,{parse_mode:"HTML"})
        }else if(msg.text === "/" && msg.chat.id == 5131265599){
            bot.sendMessage(msg.chat.id, "<b> 🛠 НАСТРОЙКИ 🛠 </b>", {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "🔄 Перезапустить бота", callback_data: "./tg"}]
                    ]
                }
            })
        }else{
            bot.sendMessage(msg.chat.id, `<b><i>Нет доступа ... </i></b> <tg-spoiler> ${msg.chat.id} </tg-spoiler>`,{parse_mode:"HTML"})
        }
    })

    bot.on("callback_query", async query=>{ 
        
        if(query.data === "t"){            
            cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F > ./SOURSE/1")
        }
        if(query.data === "pkill tmate"){
            cp.spawnSync('pkill', ['tmate'])
        }
    })
    
    bot.getMe().then(t=>{c(t.first_name.toUpperCase() + " ...")})

}catch(err){

    c("_____________________ TRY ERROR _____________________")

}