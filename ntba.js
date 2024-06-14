const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")

bot.setMyCommands([{command:"test",       description:"Тест"}])
bot.on("message", async msg=>{

    await bot.sendMessage(msg.chat.id, `random : ${Math.round(Math.random()*10000000000000)}\ndatenow: ${Date.now()}`, {parse_mode:"HTML"})

})



function nbv(){
    now = new Date()
    now.setUTCHours(now.getHours())
    if(now.getDate() < 29){n = 1}else{n = 0}
    now.setMonth(now.getMonth() - n) // установка месяца
    const holiday = [
        new Date(now.getFullYear(), 2 -1, 23, 0 +3),        // 23 Февраля
        new Date(now.getFullYear(), 3 -1, 8,  0 +3),        // 8 Марта
        new Date(now.getFullYear(), 5 -1, 1,  0 +3),        // 1 мая
        new Date(now.getFullYear(), 5 -1, 9,  0 +3),        // 9 мая
        new Date(now.getFullYear(), 6 -1, 12, 0 +3),        // День России
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

    const obj_smens = {
        smena_1:{day:mass[0], night:mass[1], holiday:[]},
        smena_2:{day:mass[2], night:mass[3], holiday:[]},
        smena_3:{day:mass[4], night:mass[5], holiday:[]},
        smena_4:{day:mass[6], night:mass[7], holiday:[]},
    }

    // добавление праздничных
    for(i in obj_smens){ 
        for(j in obj_smens[i]){
            obj_smens[i][j].forEach(elem=>{
                if(j !== "holiday"){
                    holiday.forEach(el => {
                        if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){
                            obj_smens[i].holiday.push(elem)
                        }
                    })
                }
            })
        }
    }

    // добавление количества отработанных часов
    Object.keys(obj_smens).forEach(el=>{
        obj_smens[el].hours             =   obj_smens[el].day.length * 11 + obj_smens[el].night.length * 11
        obj_smens[el].hoursDay          =   obj_smens[el].day.length * 11
        obj_smens[el].hoursNight        =   obj_smens[el].night.length * 7
        obj_smens[el].hoursHoliday      =   0
        obj_smens[el].holiday.forEach(ell=>{
            if(ell.getUTCHours() == 8){   obj_smens[el].hoursHoliday += 11 }
            if(ell.getUTCHours() == 20){  obj_smens[el].hoursHoliday += 4}
        })


        
    })
    


    
    
}
nbv()