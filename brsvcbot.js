// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"

// const ntba          = require('./ntba')

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
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ </a>`, {parse_mode:"HTML"})
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
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


function workSmens(){
    now = new Date()
    now.setUTCHours(now.getHours())
    now.setMonth(now.getMonth() - 0) // установка месяца
    const holiday = [
        new Date(now.getFullYear(), 2 -1, 23, 0 +3),        // 23 Февраля 
        new Date(now.getFullYear(), 3 -1, 8,  0 +3),        // 8 Марта
        new Date(now.getFullYear(), 5 -1, 1,  0 +3),        // 1 мая
        new Date(now.getFullYear(), 5 -1, 9,  0 +3),        // 9 мая
    ]
    const start_date = [
        new Date("2024-01-02T08:00:00.000Z"),   // смена 1 день 
        new Date("2024-01-03T20:00:00.000Z"),   // смена 1 ночь
        new Date("2024-01-03T08:00:00.000Z"),   // смена 2 день
        new Date("2024-01-04T20:00:00.000Z"),   // смена 2 ночь
        new Date("2024-01-04T08:00:00.000Z"),   // смена 3 день
        new Date("2024-01-05T20:00:00.000Z"),   // смена 3 ночь
        new Date("2024-01-05T08:00:00.000Z"),   // смена 4 день
        new Date("2024-01-06T20:00:00.000Z")    // смена 4 ночь
    ]

    mass = []
    for(i in start_date){
        while (now.getMonth() != start_date[i].getMonth()) {
            start_date[i].setDate(start_date[i].getDate() + 4)
        }

        arr = []
        while (now.getMonth() == start_date[i].getMonth()) {        
            arr.push(new Date(start_date[i]))
            start_date[i].setDate(start_date[i].getDate() + 4)
        }
        mass.push(arr)
    }   

    const obj1 = {
        smena1:{day:mass[0], night:mass[1]},
        smena2:{day:mass[2], night:mass[3]},
        smena3:{day:mass[4], night:mass[5]},
        smena4:{day:mass[6], night:mass[7]},
    }

    const obj2 = {
        smena1:[...mass[0], ...mass[1]],
        smena2:[...mass[2], ...mass[3]],
        smena3:[...mass[4], ...mass[5]],
        smena4:[...mass[6], ...mass[7]],
    }

    for(i in obj2){
        obj1[i].holiday = []
        for(j in obj2[i]){
            for(k in holiday){
                if(obj2[i][j].getMonth() === holiday[k].getMonth()  &&  obj2[i][j].getDate() === holiday[k].getDate()){
                    obj1[i].holiday.push(obj2[i][j])
                }
            }
        }
    }
    
    const obj = {
        smena1:{
            smens_all:[...mass[0], ...mass[1]].length,
            smens_night:mass[1].length,
            smens_holiday: obj1.smena1.holiday.length
        },

        smena2:{
            smens_all:[...mass[2], ...mass[3]].length,
            smens_night:mass[3].length,
            smens_holiday: obj1.smena2.holiday.length
        },

        smena3:{
            smens_all:[...mass[4], ...mass[5]].length,
            smens_night:mass[5].length,
            smens_holiday: obj1.smena3.holiday.length
        },

        smena4:{
            smens_all:[...mass[6], ...mass[7]].length,
            smens_night:mass[7].length,
            smens_holiday: obj1.smena4.holiday.length
        },

    }
    c(obj)

    

    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 47000       за 16 смен
    // 35000       за 16 смен
    // питание 32.5 за час

    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
}
workSmens()