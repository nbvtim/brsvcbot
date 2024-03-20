const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
// bot.getMe().then(           (t) =>  {   c(t)    })
    
let workSmens = new function (){

    let s1d = new Date(2024, 2 -1, 27  , 8 +3   , 0,0,0)
    let s1n = new Date(2024, 2 -1, 27+1, 8 +3+12, 0,0,0)
    let s2d = new Date(2024, 2 -1, 28  , 8 +3   , 0,0,0)
    let s2n = new Date(2024, 2 -1, 28+1, 8 +3+12, 0,0,0)
    let s3d = new Date(2024, 2 -1, 29  , 8 +3   , 0,0,0)
    let s3n = new Date(2024, 2 -1, 29+1, 8 +3+12, 0,0,0)
    let s4d = new Date(2024, 2 -1, 30  , 8 +3   , 0,0,0)
    let s4n = new Date(2024, 2 -1, 30+1, 8 +3+12, 0,0,0)

    let now = new Date()
    now.setHours(now.getHours()+3)
    let daysInMounth = (new Date(now.getFullYear(), now.getMonth()+1) - new Date(now.getFullYear(), now.getMonth()))/1000/60/60/24 // 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
    
    let obj = {}
    massName    = ["smena1d", "smena1n", "smena2d", "smena2n", "smena3d", "smena3n", "smena4d", "smena4n"]
    mass        = [ s1d,       s1n,       s2d,       s2n,       s3d,       s3n,       s4d,       s4n]
    arr = []
    for(i in mass){
        while (now.getMonth() !== mass[i].getMonth()) {
            mass[i].setDate(mass[i].getDate()+4)
        }
        while (now.getMonth() === mass[i].getMonth()) {
            arr.push(new Date(mass[i]))
            mass[i].setDate(mass[i].getDate()+4)
        }
        obj[massName[i]] = {dates:arr}
        obj[massName[i]]["datesLength"] = arr.length
        obj[massName[i]]["startDate"] = arr[0]
        obj[massName[i]]["finishDate"] = arr[arr.length -1]
        obj[massName[i]]["daysInMounth"] = daysInMounth
        arr = []
    }
    return obj

}


let zp = new function (){
// 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
// ночные + 20% за час
// в ночь 7 часов ночных 23:00 - 06:00
// 47000       за 16 смен
// 35000       за 16 смен
// 92380.13

// c(zp(47000, 7000, 6000 ,143, 6*7))
// c(zp(35000, 7000))
// c(zp(47000, 7000, 6000 ,143, 6*7).summ + zp(35000, 7000).summ)
}


bot.on("message", async msg=>{
    if(msg.text === "зп")bot.sendMessage(msg.chat.id,JSON.stringify(workSmens.smena1n,null,5))
})

