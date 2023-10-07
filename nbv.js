const c             = console.log
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{ 
    
    c(__dirname)
    fs.writeFileSync( `${__dirname}/#all`, JSON.stringify( xlsx.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx") , null, 4) )
    bd = JSON.parse(fs.readFileSync(`${__dirname}/#all`, "utf8"))
    bdAT = bd[0].data    
        
    bot.on("message", async msg=>{ //c(msg)
        mid = msg.chat.id
        txt = msg.text
        
        if(msg.text !== undefined && msg.text.match(/\//) === null){
            fs.appendFileSync(`${__dirname}/#logLong`, JSON.stringify(msg)+"\n")
            fs.appendFileSync(`${__dirname}/#logText`, `${msg.text}\n`)
        }



        if( txt !== undefined && fs.readFileSync(`${__dirname}/#users`,"utf8").match(mid) !== null ){
            
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
            
            await bot.sendMessage(mid, `Нет доступа\n\nПредставьтесь и ждите одобрения`)
            await bot.sendMessage(5131265599, `${msg.from.first_name}_${msg.from.username}:\n${txt}`, {
                reply_markup:{
                    inline_keyboard:[
                        [{text: "добавить", callback_data: mid+"_yes"}, {text: "отказать", callback_data: mid+"_no"}]
                    ]
                }
            })
        }
    })

    bot.on("callback_query", async query=>{
        m = query.data.split("_")
        if(m[1] === "yes"){
            fs.appendFileSync(`${__dirname}/#users`, `${m[0]}\n`)
            await bot.deleteMessage(query.from.id, query.message.message_id)
            await bot.sendMessage(m[0], `Доступ предоставлен`)
        }
        if(m[1] === "no"){
            await bot.sendMessage(m[0], `Доступ не предоставлен\n\nПовторите попытку\nУкажите больше данных`)
            await bot.deleteMessage(query.from.id, query.message.message_id)
        }
    })
    
    bot.getMe().then(t=>{c("\033[93m" + `${t.username.toUpperCase()} в работе ...\nЗапущен на платформе ${process.platform.toUpperCase()}` + "\033[m")})

}catch(err){

    c("_____________________ TRY ERROR _____________________")
    c(err)

}