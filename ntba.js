const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

bot.setMyCommands([{command:"test",       description:"Тест"}])

bot.on("message", async msg=>{
    if(5131265599 == msg.chat.id){
        let obj = workSmens()

        await bot.sendMessage(msg.chat.id, `
Ст. смены:
з/п 47 000
ночные ${obj.smena1.night.length*7} час. = ${           Math.round( obj.smena1.night.length*7*47000/176*.2 *100)/100 } руб.
праздничные ${obj.smena1.holiday.length*11} час. = ${   Math.round( obj.smena1.holiday.length*11*47000/176 *100)/100 } руб.
<b>Итого</b>: ${47000 + Math.round( obj.smena1.night.length*7*47000/176*.2 *100)/100 + Math.round( obj.smena1.holiday.length*11*47000/176 *100)/100}
`,{parse_mode:"HTML"})

        await bot.sendMessage(msg.chat.id, `
Ст. смены:
з/п 35 000
ночные ${obj.smena4.night.length*7} час. = ${           Math.round( obj.smena4.night.length*7*35000/176*.2 *100)/100 } руб.
праздничные ${obj.smena4.holiday.length*11} час. = ${   Math.round( obj.smena4.holiday.length*11*35000/176 *100)/100 } руб.
<b>Итого</b>: ${35000 + Math.round( obj.smena4.night.length*7*35000/176*.2 *100)/100 + Math.round( obj.smena4.holiday.length*11*35000/176 *100)/100}
`,{parse_mode:"HTML"})

        await bot.sendMessage(msg.chat.id, `
В общем: ${
    (35000 + Math.round( obj.smena4.night.length*7*35000/176*.2 *100)/100 + Math.round( obj.smena4.holiday.length*11*35000/176 *100)/100) +
    (47000 + Math.round( obj.smena1.night.length*7*47000/176*.2 *100)/100 + Math.round( obj.smena1.holiday.length*11*47000/176 *100)/100)
} + 7000 + 7000 - 6000 = ${
    (35000 + Math.round( obj.smena4.night.length*7*35000/176*.2 *100)/100 + Math.round( obj.smena4.holiday.length*11*35000/176 *100)/100) +
    (47000 + Math.round( obj.smena1.night.length*7*47000/176*.2 *100)/100 + Math.round( obj.smena1.holiday.length*11*47000/176 *100)/100) +
    7000 + 7000 - 6000
}
`)

await bot.sendMessage(msg.chat.id, `Питание: ${(obj.smena1.day.length+obj.smena1.night.length+obj.smena4.day.length+obj.smena4.night.length)*11*32.5}`)

    }
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

    return obj1
    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 47000       за 16 смен
    // 35000       за 16 смен
    // питание 32.5 за час

    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
}
workSmens()

