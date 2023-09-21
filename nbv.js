const c             = console.log
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{ 
    
    if(fs.existsSync("C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")){
        fs.writeFileSync(`${__dirname}/#all`, JSON.stringify(xlsx.parse("C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"), null, 4),)
        bd = JSON.parse(fs.readFileSync(`${__dirname}/#all`, "utf8"))
        bdAT = bd[0].data
    }else{
        bd = JSON.parse(fs.readFileSync(`${__dirname}/#all`, "utf8"))
        bdAT = bd[0].data
    }

    bot.on("message", async msg=>{

        mid = msg.chat.id
        txt = msg.text

        fs.appendFileSync(`${__dirname}/#log`, JSON.stringify(msg)+"\n")

        if( (fs.readFileSync(`${__dirname}/#users`,"utf8")).match(mid) ){

            re = RegExp(txt, "i")
            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g,"").toLowerCase().match(re)
                if(str != null && counter < 10){
                    counter++
                    t = JSON.stringify(bdAT[i], null, 4)
                    await bot.sendMessage(mid, t)
                }
            }
            await bot.sendMessage(mid, `Выведено записей: ${counter}`)

        }else{

            await bot.sendMessage(5131265599, JSON.stringify(msg), {
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
        }
    })

}catch(err){
    c("_____________________ TRY ERROR _____________________")
}
