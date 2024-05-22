const c             = console.log
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

bot.setMyCommands([{command:"test",       description:"Тест"}])

bot.on("message", async msg=>{
    zp(msg.chat.id)
})





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
        smena1:{m: [...mass[0], ...mass[1]]},
        smena2:{m: [...mass[2], ...mass[3]]},
        smena3:{m: [...mass[4], ...mass[5]]},
        smena4:{m: [...mass[6], ...mass[7]]},
    }

    for(i in obj){
        obj[i].d = []
        obj[i].n = []
        obj[i].h = []
        obj[i].m.forEach(elem => {
            if(elem.getUTCHours() === 8 ){obj[i].d.push(elem.getDate())}
            if(elem.getUTCHours() === 20){obj[i].n.push(elem.getDate())}
            holiday.forEach(el => {     if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){   obj[i].h.push(elem)}    })
        })
        obj[i].all_time        = ( obj[i].d.length + obj[i].n.length )      * 11
        obj[i].night_time      = obj[i].n.length                            * 7      // ночные 7 часов  23:00 - 06:00
        obj[i].holiday_time    = obj[i].h.length                            * 11     // ночные могут быть по 4 часа
        
        
    }
    return (obj)
    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
}



function zp(id = 5131265599){
    const obj = workSmens()
    // c(obj)
    function getData(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){      if(fs.existsSync(path)){    return xlsx.parse(path)}}
    const data = getData()
    const m = []
    data.forEach(el => {
        if(el.name === "users"){
            el.data.forEach(elem => {
                if(elem[6]){
                    if(elem[6].match(/inspektor/)){
                        m.push([elem[0], elem[6].match(/inspektor./)[0], elem[6].match(/inspektor./)[0].match(/\d/)[0]])
                    }
                    if(elem[6].match(/stsmena/)){
                        m.push([elem[0], elem[6].match(/stsmena./)[0], elem[6].match(/stsmena./)[0].match(/\d/)[0]])
                    }
                }
            })
        }
    })
    m.forEach(el=>{
        if(el[0] === id){
            bot.sendMessage(id, JSON.stringify(obj[`smena${el[2]}`], null, 4))
        }
    })



    stSmena     = 47000
    inspektor   = 35000
    stSmena_hour    = stSmena   / 176
    inspektor_hour  = inspektor / 176
    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 47000       за 16 смен
    // 35000       за 16 смен
    // питание 32.5 за час
}

