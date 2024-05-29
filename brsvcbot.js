
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

// bot.deleteMyCommands()
// bot.setMyCommands([
//     {command:"start",       description:"Старт"},
//     {command:"auto",        description:"Автотранспорнт"},
//     {command:"key",         description:"Ключи"},
//     {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
// ])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))


// -------------------------------------------------------------------------------------------------------------------------------------------

const obj = {}
const xlsxData = xlsxGet()
xlsxData.forEach(el=>{
    if(el.name == "users"){
        el.data.forEach(ell=>{
            if(+ell[0]){
                obj[ell[0]] = {
                    id:         ell[0],
                    mass:       ell,
                    secure:     true,
                }
            }
        })
    }
})
bot.on("message", async msg=>{
    fs.appendFileSync(`${__dirname}/SOURSE/log`, `\n${msg.chat.id}: ${msg.text}`)
    
    search(msg.chat.id, msg.text).forEach(el=>{
        bot.sendMessage(msg.chat.id, JSON.stringify(el, null, 4))
    })
        
    // ------------------------------------------
    if(msg.text === "/" && msg.chat.id === 5131265599){ //  (|| msg.chat.id === 2037585811)
        await bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard:[
                    [{text: "▶ Tmate старт",            callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                    [{text: "🔄 Перезаписать getData",  callback_data: "getData"}]
                ]
            }
        })
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
        xlsxData = xlsxGet()
        bot.sendMessage(query.from.id, "Данные обновлены")
    }
})





// -------------------------------------------------------------------------------------------------------------------------------------------
function xlsxGet(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        return xlsx.parse(path)
    }else{
        return JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`, "utf8")) 
    }
}

function smensCalc(){
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

    const mass = []
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

    const obj = {
        smena1:{day:mass[0], night:mass[1]},
        smena2:{day:mass[2], night:mass[3]},
        smena3:{day:mass[4], night:mass[5]},
        smena4:{day:mass[6], night:mass[7]},
    }

    for(i in obj){
        for(j in obj[i]){
            obj[i][j].forEach(elem=>{
                holiday.forEach(el => {
                    if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){
                        if(!obj[i].holiday){obj[i].holiday = []}
                        obj[i].holiday.push(elem)
                    }
                })
            })
        }
    }
    return (obj)
    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
    stSmena     = 54000
    inspektor   = 45000
    stSmena_hour    = stSmena   / 176
    inspektor_hour  = inspektor / 176
    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 47000       за 16 смен
    // 35000       за 16 смен
    // питание 32.5 за час
}

function search(id, txt){
    arr = []
    counter = 0
    if(obj[id]){
        xlsxData.forEach(el=>{
            if(el.name == "АТ"){
                el.data.forEach(ell=>{
                    if(ell.join(" ").match(txt) && counter<5){
                        counter++
                        arr.push(ell)
                    }
                })
            }
        })
    }
    return arr
}


function nbv(){

    t = "askdjaksdjkasjd"
    r = "as"
    c(t.match(RegExp(r, "i")))
    

}nbv()