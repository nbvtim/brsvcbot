const c             = console.log
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

bot.setMyCommands([{command:"test",       description:"Тест"}])

const dat = workSmens()
sm1 = dat.smena1
sm4 = dat.smena4

bot.on("message", async msg=>{


if(msg.chat.id == 5131265599){

    oklad = 47000
    await bot.sendMessage(msg.chat.id, `
<b>stSmena:</b> <i>( ${oklad/176*11} )</i>

всего : ${sm1.countSmens.length} / ${sm1.all_time} / ${oklad}
ночные : ${sm1.night_time} / ${Math.round(oklad/176*.2*sm1.night_time *100)/100}
праздничные: ${sm1.holiday_time} / ${oklad/176*sm1.holiday_time}
итого: ${oklad + Math.round(oklad/176*.2*sm1.night_time *100)/100 + oklad/176*sm1.holiday_time}
    `, {parse_mode:"HTML"})

    oklad = 35000
    await bot.sendMessage(msg.chat.id, `
<b>inspektor:</b> <i>( ${oklad/176*11} )</i>

всего : ${sm4.countSmens.length} / ${sm4.all_time} / ${oklad}
ночные : ${sm4.night_time} / ${Math.round(oklad/176*.2*sm4.night_time *100)/100}
праздничные: ${sm4.holiday_time} / ${oklad/176*sm4.holiday_time}
итого: ${oklad + Math.round(oklad/176*.2*sm4.night_time *100)/100 + oklad/176*sm4.holiday_time}
    `, {parse_mode:"HTML"})

    await bot.sendMessage(msg.chat.id, `
Питание: ${(sm1.countSmens.length + sm4.countSmens.length)*11*32.5}
    `, {parse_mode:"HTML"})

}else{
    await bot.sendMessage(msg.chat.id, `
random : ${Math.round(Math.random()*10000000000000)}
datenow: ${Date.now()}
    `, {parse_mode:"HTML"})
}
})

//////////////////////////////////////////////////////////////////////////
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
        smena1:{countSmens: [...mass[0], ...mass[1]]},
        smena2:{countSmens: [...mass[2], ...mass[3]]},
        smena3:{countSmens: [...mass[4], ...mass[5]]},
        smena4:{countSmens: [...mass[6], ...mass[7]]},
    }

    for(i in obj){
        obj[i].day = []
        obj[i].night = []
        obj[i].holiday = []
        obj[i].countSmens.forEach(elem => {
            if(elem.getUTCHours() === 8 ){obj[i].day.push(elem.getDate())}
            if(elem.getUTCHours() === 20){obj[i].night.push(elem.getDate())}
            holiday.forEach(el => {     if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){   obj[i].holiday.push(elem)}    })
        })
        obj[i].all_time        = ( obj[i].day.length + obj[i].night.length )  * 11
        obj[i].night_time      = obj[i].night.length                          * 7      // ночные 7 часов  23:00 - 06:00
        obj[i].holiday_time    = obj[i].holiday.length                        * 11     // ночные могут быть по 4 часа
    }
    return (obj)
    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
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
//////////////////////////////////////////////////////////////////////////