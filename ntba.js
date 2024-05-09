let c               = console.log

const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
bot.setMyCommands([{command:"test",       description:"Тест"}])

m1 = ["message_id",    "from",    "chat",    "date"]

bot.on("message", async msg=>{
    m2 = Object.keys(msg)
    for(i in m2){
        if(m2[i] !== m1[i]){
            bot.sendMessage(msg.chat.id, `<b><u>${ m2[i]  }</u></b> : \n<b>${ JSON.stringify(msg[m2[i]], null, 4) }</b>`, {parse_mode:"HTML"})
        }
    }

    bot.sendMessage(msg.chat.id, `моя мишель - ветер меняет направление (amice remix)
almary - до скорых встреч (nikita lexx remix)
нюша - цунами
xolidayboy - пожары (monamour x slim x shmelev remix)
filatov & karas - это всё не помню я
ap$ent - можно я с тобой (ramirez / pavlov remix)
big baby tape, aarne - hoodak mp3 (ramirez & emil remix)
anna asti - царица (ramirez remix)`, {parse_mode:"HTML"})

})



function smensParse(){

    let now = new Date()
    now.setHours(now.getHours() +3)
    now = new Date(2024, 2 -1, 1, 0+3)
    let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()

    let holiday = [
        new Date(now.getFullYear(), 2 -1, 23, 0 +3),        // 23 Февраля 
        new Date(now.getFullYear(), 3 -1, 8,  0 +3),        // 8 Марта
        new Date(now.getFullYear(), 5 -1, 1,  0 +3),        // 1 мая
        new Date(now.getFullYear(), 5 -1, 9,  0 +3),        // 9 мая
    ]

    let s1d = new Date(2024, 1 -1, 2   , 8 +3    , 0,0,0)
    let s2d = new Date(2024, 1 -1, 2 +1, 8 +3    , 0,0,0)
    let s3d = new Date(2024, 1 -1, 2 +2, 8 +3    , 0,0,0)
    let s4d = new Date(2024, 1 -1, 2 +3, 8 +3    , 0,0,0)
    let s1n = new Date(2024, 1 -1, 2 +1, 8 +3 +12, 0,0,0)
    let s2n = new Date(2024, 1 -1, 2 +2, 8 +3 +12, 0,0,0)
    let s3n = new Date(2024, 1 -1, 2 +3, 8 +3 +12, 0,0,0)
    let s4n = new Date(2024, 1 -1, 2 +4, 8 +3 +12, 0,0,0)
    
    let smens = {}

    massName    = ["smena_1_Day", "smena_1_Night", "smena_2_Day", "smena_2_Night", "smena_3_Day", "smena_3_Night", "smena_4_Day", "smena_4_Night"]
    mass        = [ s1d,           s1n,             s2d,           s2n,             s3d,           s3n,             s4d,           s4n]
    arr = []
    for(i in mass){

        smens[massName[i]] = {smens:arr, holiday:[], holidayHour: 0, night:0}
        
        while (now.getMonth() !== mass[i].getMonth()) {
            mass[i].setDate(mass[i].getDate() + 4)
        }
        while (now.getMonth() === mass[i].getMonth()) {
            arr.push(new Date(mass[i]))
            if(mass[i].getHours() - 3 === 20){
                smens[massName[i]].night += 7
            }
            for(j in holiday){
                if(mass[i].getDate() === holiday[j].getDate() && mass[i].getMonth() === holiday[j].getMonth()){
                    smens[massName[i]].holiday.push(holiday[j])
                    if(mass[i].getHours()-3 === 8){
                        smens[massName[i]].holidayHour += 11 
                    }
                    if(mass[i].getHours()-3 === 20){
                        smens[massName[i]].holidayHour += 4
                    }
                }
            }
            mass[i].setDate(mass[i].getDate() + 4)
        }
        smens[massName[i]].length = arr.length,
        
        arr = []
    }
    
    c({
        smena1:{day: smens.smena_1_Day,night: smens.smena_1_Night},
        smena2:{day: smens.smena_2_Day,night: smens.smena_2_Night},
        smena3:{day: smens.smena_3_Day,night: smens.smena_3_Night},
        smena4:{day: smens.smena_4_Day,night: smens.smena_4_Night},
    }) 
    
    // c(smens)

    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 47000       за 16 смен
    // 35000       за 16 смен
    // питание 32.5 за час

    // аванс в марте 29272.9
}



smensParse()