const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

const dataAll = getData()
const bdAT  = dataAll[0].data
const bdUsers = dataAll[3].data
const obj = {}

bot.deleteMyCommands()
// bot.setMyCommands([ 
//     {command:"start", description:"Старт"},
//     {command:"auto", description:"Автотранспорнт"},
//     {command:"settings", description:"Настройки"},
//     {command:"help", description:"Помощь"}
// ])
bot.getMyCommands().then((t) => {       })
bot.getMe().then(t=>{       })
bot.on("polling_error", err=>c(err))

try{

    bot.on("message", async msg=>{      if(security(msg.chat.id)){

        if(typeof msg.text == "string"){
            fs.appendFileSync(`${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n`)
        }

        if(typeof msg.text == "string" && msg.text !== "/"){
            if(msg.text[0] === "/"){obj[msg.chat.id] = msg.text}
            c(obj)

            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(RegExp(msg.text, "i"))
                if(str != null){
                    if(counter < 5){
                        counter++
                        t = bdAT[i].join("\n")
                        await bot.sendMessage(msg.chat.id, t)
                    }
                }
            }
            await bot.sendMessage(msg.chat.id, `<b><i>Найдено записей: ${counter}</i></b>`,{parse_mode:"HTML"})
        }
        else if(msg.text === "/" && msg.chat.id == 5131265599){
            bot.sendMessage(msg.chat.id, "<b> 🛠 НАСТРОЙКИ 🛠 </b>", {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "🔄 Перезапустить бота", callback_data: "./tg"}]
                    ]
                }
            })
        }
        else if(typeof msg.text === "undefined"){
            bot.sendMessage(msg.chat.id,"<b>Запрос не является текстом !!!</b>", {parse_mode:"HTML"})
        }

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

    c("_____________________ TRY ERROR _____________________")
    c(err)

}

function getData(){
    const all_XLSX_path     = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
    const all_XLSX_exists   = fs.existsSync(all_XLSX_path)
    if(all_XLSX_exists){
        let dbJson = xlsx.parse(all_XLSX_path)
        return dbJson
    }else{
        c("ДАННЫЕ НЕ ПОЛУЧЕНЫ !!!")
    }
}

function security(id){
    user = +bdUsers.join('\n').match(RegExp(id,"im"))
    if(user === id){return true}
}
