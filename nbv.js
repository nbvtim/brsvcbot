const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

const dataAll = getData()
const bdAT  = dataAll[0].data
const bdUsers = dataAll[3].data

// bot.deleteMyCommands()
bot.setMyCommands([ 
    {command:"start", description:"Старт"},
    {command:"auto", description:"Автотранспорнт"},
    {command:"settings", description:"Настройки"},
    {command:"help", description:"Помощь"}
])
bot.getMyCommands().then(   (t) =>  {       })
bot.getMe().then(           (t) =>  {       })
bot.on("polling_error", err=>c(err))

try{

    bot.on("message", async msg=>{    
        if(typeof msg.text == "string"){
            fs.appendFileSync(`${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n`)
        }
        
    if(security(msg.chat.id) && typeof msg.text === "string"){
        if(msg.text[0] === "/"){ dataAll[msg.chat.id] = msg.text }
        
        if(dataAll[msg.chat.id] !== "/auto"){ bot.sendMessage(msg.chat.id, "Этот раздел в разработке, перейдите в /auto") }
        if(dataAll[msg.chat.id] === "/auto" && msg.text === "/auto"){ bot.sendMessage(msg.chat.id, "Для поиска по АТ можно вводить любые данные (марку, ФИО, номер АТ возможно не полностью)") }

        if(dataAll[msg.chat.id] === "/auto" && msg.text !== "/auto"){
            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(RegExp(msg.text, "i"))
                if(str !== null){
                    if(counter < 5){
                        t = bdAT[i].join("\n")
                        await bot.sendMessage(msg.chat.id, t)
                    }
                    counter++
                }
            }
            await bot.sendMessage(msg.chat.id, `<b><i>Найдено записей: ${counter}</i></b>`,{parse_mode:"HTML"})
            c(dataAll)
        }

        if(msg.text === "/" && msg.chat.id == 5131265599){
            bot.sendMessage(msg.chat.id, "<b> 🛠 НАСТРОЙКИ 🛠 </b>", {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "🔄 Перезаписать getData", callback_data: "getData"}]
                    ]
                }
            })
        }

        if(typeof msg.text === "undefined"){
            bot.sendMessage(msg.chat.id,"<b>Запрос не является текстом !!!</b>", {parse_mode:"HTML"})
        }
c(dataAll)
    }else{
        bot.sendMessage(msg.chat.id, `<b><i>Нет доступа ... </i></b> <tg-spoiler> ${msg.chat.id} </tg-spoiler>`,{parse_mode:"HTML"})
    }
        
    })

    bot.on("callback_query", async query=>{ 
        // c(query.from.id)
        if(query.data === "t"){ // "tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F > ./SOURSE/1"
            cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
            bot.sendMessage(query.from.id, "https://tmate.io/t/nbv/pc")
        }
        if(query.data === "pkill tmate"){
            cp.spawnSync('pkill', ['tmate'])
            bot.sendMessage(query.from.id, "pkill tmate")
        }
        if(query.data === "getData"){
            getData()
            bot.sendMessage(query.from.id, "Данные обновлены")
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
        return xlsx.parse(all_XLSX_path)
    }else{
        c("ДАННЫЕ НЕ ПОЛУЧЕНЫ !!!")
    }
}

function security(id){
    user = +bdUsers.join('\n').match(RegExp(id,"im"))
    if(user === id){return true}
}
