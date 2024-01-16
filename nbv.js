const c             = console.log
const helpers       = require(`${__dirname}/SOURSE/helpers.js`)
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

const bd = xlsx.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")
const bdAT = bd[0].data

bot.deleteMyCommands()
bot.getMe().then(t=>{c(t)})

try{

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
            // c(fs.readFileSync(`${__dirname}/SOURSE/users`,"utf8").match(RegExp(msg.chat.id, "gm")))

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
        
        if(query.data === "t"){ // "tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F > ./SOURSE/1"
            cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        }
        if(query.data === "pkill tmate"){
            cp.spawnSync('pkill', ['tmate'])
        }
    })

}catch(err){

    console.error("_____________________ TRY ERROR _____________________")
    c(err)

}

function dataAccess(id){
    usersF = fs.readFileSync(`${__dirname}/SOURSE/users`, "utf8")
    idF = usersF.match(RegExp(id,""))
    if(id == idF){
        return {d:true, id:id}
    }else{
        return {d:false, id:id, idF:idF}
    }
}