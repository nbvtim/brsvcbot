// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"

const ntba          = require('./ntba')

const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

let dataAll = getData()
let obj     = {}

// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))




// -------------------------------------------------------------------------------------------------------------------------------------------
bot.on("message", async msg=>{ //users[msg.chat.id] = false
    
    if( msg.entities ){ obj[msg.chat.id] = msg.text}
    if( msg.text ){fs.appendFileSync( `${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n` )   }   

    for(i in dataAll[2].data){
        if(msg.chat.id == dataAll[2].data[i][0]){
            
            if(obj[msg.chat.id] === "/start" || obj[msg.chat.id] === undefined){
                bot.sendMessage(msg.chat.id,`Пожалуйста перейдите в один из разделов, кнопка меню находится радом с полем ввода текста`, {parse_mode:"HTML"})}
            
            // ------------------------------------------
            if(obj[msg.chat.id] === "/auto" && msg.text === "/auto"){
                bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по автотранспорту`)
            }else if(obj[msg.chat.id] === "/auto" && msg.text !== "/auto"){
                search(msg)
            }
        
            // ------------------------------------------
            if(obj[msg.chat.id] === "/key" && msg.text === "/key"){
                bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по ключам`)
            }else if(obj[msg.chat.id] === "/key" && msg.text !== "/key"){
                search(msg)
            }
        
            // ------------------------------------------
            if(msg.text === "/settings" && msg.chat.id === 5131265599){ //  (|| msg.chat.id === 2037585811)
                await bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
                    parse_mode: "HTML",
                    reply_markup:{
                        inline_keyboard:[
                            [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                            [{text: "🔄 Перезаписать getData", callback_data: "getData"}]
                        ]
                    }
                })
        
                // ---------------------------------------------------------------------------------------------------------------------------------
                
                // ---------------------------------------------------------------------------------------------------------------------------------
            }
        }
    }



    
})





// -------------------------------------------------------------------------------------------------------------------------------------------
bot.on("callback_query", query=>{
    //c(query)
    if(query.data === "t"){ 
        cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ</a>`, {parse_mode:"HTML"})
    }
    if(query.data === "pkill tmate"){
        cp.spawnSync('pkill', ['tmate'])
        bot.sendMessage(query.from.id, "Сессия tmate остановлена")
    }
    if(query.data === "getData"){
        dataAll = getData()
        bot.sendMessage(query.from.id, "Данные обновлены")
    }
})





// -------------------------------------------------------------------------------------------------------------------------------------------
async function search(msg, bd = dataAll, command = obj[msg.chat.id], txt = msg.text){
    let objec = {
        "АТ" :      "/auto",
        "Ключи" :   "/key"
    }

    for(j in bd){
        for(i in Object.keys(objec)){        
            if(Object.keys(objec)[i] === bd[j].name && command === Object.values(objec)[i]){
                counter = 0
                for(k in bd[j].data){
                    str = bd[j].data[k].join("").replace(/ /g, "").toLowerCase().match(RegExp(txt, "i"))
                    if(str !== null){
                        if(counter < 5){
                            await bot.sendMessage(msg.chat.id, `<i>${bd[j].data[k].join("\n")}</i>`, {parse_mode:"HTML"})
                        }
                        counter++
                    }
                }
                await bot.sendMessage(msg.chat.id, `<b>Найдено записей: </b>${counter}`,{parse_mode:"HTML"})
            }
        }
    }
}

function getData(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        return xlsx.parse(path)
    }else{
        return JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`, "utf8")) 
    }
}