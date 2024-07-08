
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const c             = console.log
// require("./ntba")
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

// bot.deleteMyCommands()
// bot.setMyCommands([
// //     {command:"start",       description:"Старт"},
//     {command:"auto",        description:"Автотранспорнт"},
// //     {command:"key",         description:"Ключи"},
//     {command:"settings",    description:"Настройки"},
// //     {command:"help",        description:"Помощь"}
// ])


// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))

// const obj = {}; start()

bot.on("message", async msg=>{ 
    c(JSON.stringify(msg))
    fs.appendFileSync(`${__dirname}/SOURSE/log`, `\n${JSON.stringify(msg)}`)








    // if(!obj[msg.chat.id]){obj[msg.chat.id] = {secure: false}}
    // if(msg.entities){obj[msg.chat.id].command = msg.text}
    // fs.appendFileSync(`${__dirname}/SOURSE/log`, `\n${obj[msg.chat.id].secure} ${msg.chat.id} ${msg.from.first_name}: ${msg.text}`)
    

    // if(obj[msg.chat.id].secure){

    //     search(msg.text).forEach(el=>{
    //         bot.sendMessage(msg.chat.id, JSON.stringify(el, null, 3))
    //     })

    // }
    // if(!obj[msg.chat.id].secure){
    //     bot.sendMessage(msg.chat.id, `Нет допуска !!! \nВведите данные в формате: \n\t - Фамилия\n\t - Имя\n\t - Отчество\n\t - Дата рождения\n\t - Номер телефона\n\t - Должность`)
    // }
    // if(obj[msg.chat.id].command === "/settings" && msg.chat.id === 5131265599){
    //     bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
    //         parse_mode: "HTML",
    //         reply_markup:{
    //             inline_keyboard:[
    //                 [{text: "tmate старт",          callback_data:   "t"},          {text: "tmate стоп", callback_data: "pkill tmate"}],
    //                 [{text: "Обновить данные",      callback_data:   "getData"}],
    //                 // [{text: "ntba старт",           callback_data:   "ntbaStart"}]
    //             ]
    //         }
    //     })

    //     zp(msg)
    // }


})

// bot.on("callback_query", query=>{
//     //c(query)
//     if(query.data === "t"){ 
//         cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
//         bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ</a>`, {parse_mode:"HTML"})
//     }
//     if(query.data === "pkill tmate"){
//         cp.spawnSync('pkill', ['tmate'])
//         bot.sendMessage(query.from.id, "Сессия tmate остановлена")
//     }
//     if(query.data === "getData"){
//         start()
//         bot.sendMessage(query.from.id, "Данные обновлены")
//     }

// })





// function start(){
//     xlsx.forEach(el=>{
//         if(el.name === "users"){
//             el.data.forEach(ell=>{
//                 if(+ell[0]){
//                     obj[ell[0]] = {secure: true}
//                 }
//             })
//         }
//     })
// }

// function search(txt){
//     try {
//         arr = []
//         counter = 0
//         xlsx.forEach(el=>{
//             if(el.name == "АТ"){
//                 el.data.forEach(ell=>{
//                     if(ell.join(" ").match(RegExp(txt, "i")) && counter < 5){
//                         counter++
//                         arr.push(ell)
//                     }
//                 })
//             }
//         })
//         if(arr.length == 0){
//             return ["По запросу ничего не найдено"]
//         }else{
//             return arr
//         }
        
//     } catch (err) {
//         // c(`TRY ERR > RegExp("${msg.text}", "i") > не допустимый ввод "${msg.text}"`)
//         return [`Неверный ввод ${txt}`]
//     }
// }

// function calcSmens(){

//     // let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
//     now = new Date()
//     now.setUTCHours(now.getHours())
//     if(now.getDate() < 14){n = 1}else{n = 0}
//     now.setMonth(now.getMonth() - n) // установка месяца
//     const holiday = [
//         new Date(now.getFullYear(), 2 -1, 23, 0 +3),        // 23 Февраля
//         new Date(now.getFullYear(), 3 -1, 8,  0 +3),        // 8 Марта
//         new Date(now.getFullYear(), 5 -1, 1,  0 +3),        // 1 мая
//         new Date(now.getFullYear(), 5 -1, 9,  0 +3),        // 9 мая
//         new Date(now.getFullYear(), 6 -1, 12, 0 +3),        // День России
//     ]
//     const start_date = [
//         new Date("2024-01-02T08:00:00.000Z"),   // смена 1 день
//         new Date("2024-01-03T20:00:00.000Z"),   // смена 1 ночь
//         new Date("2024-01-03T08:00:00.000Z"),   // смена 2 день
//         new Date("2024-01-04T20:00:00.000Z"),   // смена 2 ночь
//         new Date("2024-01-04T08:00:00.000Z"),   // смена 3 день
//         new Date("2024-01-05T20:00:00.000Z"),   // смена 3 ночь
//         new Date("2024-01-05T08:00:00.000Z"),   // смена 4 день
//         new Date("2024-01-06T20:00:00.000Z")    // смена 4 ночь
//     ]

//     const mass = []
//     for(i in start_date){
//         while (now.getMonth() != start_date[i].getMonth()) {
//             start_date[i].setDate(start_date[i].getDate() + 4)
//         }

//         arr = []
//         while (now.getMonth() == start_date[i].getMonth()) {
//             arr.push(new Date(start_date[i]))
//             start_date[i].setDate(start_date[i].getDate() + 4)
//         }
//         mass.push(arr)
//     }

//     const obj_smens = {
//         smena_1:{day:mass[0], night:mass[1], holiday:[]},
//         smena_2:{day:mass[2], night:mass[3], holiday:[]},
//         smena_3:{day:mass[4], night:mass[5], holiday:[]},
//         smena_4:{day:mass[6], night:mass[7], holiday:[]},
//     }

//     // добавление праздничных
//     for(i in obj_smens){ 
//         for(j in obj_smens[i]){
//             obj_smens[i][j].forEach(elem=>{
//                 if(j !== "holiday"){
//                     holiday.forEach(el => {
//                         if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){
//                             obj_smens[i].holiday.push(elem)
//                         }
//                     })
//                 }
//             })
//         }
//     }

//     // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
//     // ночные 7 часов  23:00 - 06:00         20%
//     // праздничные     00:00 - 23:59         
//     // летние = 7% от 
//     // 54000       за 16 смен
//     // 45000       за 16 смен
//     // питание 32.5 за час

//     c(obj_smens)
    
// }calcSmens()

// function zp(msg){
    
// }
// zp()