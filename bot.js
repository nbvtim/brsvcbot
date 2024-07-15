
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"         - ntba
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"  
const c             = console.log
const appExpress    = require("express")()
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const { env } = require("process")
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



// --------------------------------------------------------------------------------------------
// БОТ ОЖИДАЕТ ВВОДА ОТ ПОЛЬЗОВАТЕЛЯ
// --------------------------------------------------------------------------------------------
bot.on("message", async msg=>{ 
    fs.appendFileSync   (`${__dirname}/log`, `\n${JSON.stringify(msg)}`)

    if(msg.text === "/" && msg.chat.id === 5131265599){
        bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard:[
                    [{text: "tmate старт",          callback_data:   "t"},          {text: "tmate стоп", callback_data: "pkill tmate"}],
                    [{text: "Обновить данные",      callback_data:   "getData"}],
                    [{text: "Показать log",         callback_data:   "log"}]
                ]
            }
        })
        bot.sendMessage(msg.chat.id, JSON.stringify(start()[msg.chat.id].zpResult, null, 4))
    }



})



// --------------------------------------------------------------------------------------------
// БОТ ОБРАБАТЫВАЕТ ЗАПРОСЫ С КЛАВИАТУРЫ 
// --------------------------------------------------------------------------------------------
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
    // if(query.data === "getData"){
    //     bot.sendMessage(query.from.id, "Данные обновлены")
    // }
    if(query.data === "log"){  // Текст отправляемого сообщения, 1-4096 символов после разбора сущностей
        txt = fs.readFileSync("./log", "utf8").length
        
        // bot.sendMessage(query.from.id, txt)
    }

})






// --------------------------------------------------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// --------------------------------------------------------------------------------------------

// НАЧАЛЬНАЯ ФУНКЦИЯ
function start(){
    // --------------------------------------------------------------------------------------------
    // РАСЧЕТ РАБОЧИХ СМЕН В МЕСЯЦЕ ПОСМЕННО 
    // let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
    now = new Date()
    now.setUTCHours(now.getHours())
    if(now.getDate() < 16){n = 1}else{n = 0}
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

    // --------------------------------------------------------------------------------------------
    // ОБЪЕКТ с пользователями 
    const obj_id = {}
    xlsx.forEach(el=>{
        if(el.name === "users"){
            el.data.forEach(ell=>{
                if(+ell[0]  && ell[6] && ell[6].match(/\d/)){
                    obj_id[ell[0]] = {} 
                    obj_id[ell[0]].smenaDate = []
                    ell[6].split(", ").forEach(elll=>{
                        obj_id[ell[0]].smenaDate.push({
                            jobTitle: [elll.split("_")[0], elll.split("_")[1]],
                            smenaCount: obj_smens["smena_" + elll.split("_")[1]]
                        })
                    })
                }
            })
        }
    })

    for(id in obj_id){
        obj_id[id].zp = []
        obj_id[id].smenaDate.forEach((el, i)=>{

            if(obj_id[id].smenaDate[i].jobTitle[0] === 'stsmena'){      oklad = 54000   }
            if(obj_id[id].smenaDate[i].jobTitle[0] === 'inspektor'){    oklad = 45000   }
            rubHour     =   oklad                                                                 / 176
            rubNight    =   obj_id[id].smenaDate[i].smenaCount.night.length                       * rubHour * 7 * .2
            rubHoliday  =   5 * rubHour// obj_id[id].smenaDate[i].smenaCount.holiday.length                                        
            doplata     =   oklad                                                                 * .07
            result      =   oklad + rubNight + rubHoliday + doplata
            pitanie     =   (obj_id[id].smenaDate[i].smenaCount.day.length + obj_id[id].smenaDate[i].smenaCount.night.length) * 11 * 32.5
            
            obj_id[id].zp.push({
                pitanie:    Math.round(pitanie      *100)/100,
                id: id,
                jobTitle:       obj_id[id].smenaDate[i].jobTitle[0],
                smenaNumber:    obj_id[id].smenaDate[i].jobTitle[1],
                oklad:      Math.round(oklad        *100)/100,
                rubHour:    Math.round(rubHour      *100)/100,
                rubNight:   Math.round(rubNight     *100)/100,
                rubHoliday: Math.round(rubHoliday   *100)/100,
                doplata:    Math.round(doplata      *100)/100,
                result:     Math.round(result       *100)/100,
            })
        })
    }
    for(id in obj_id){
        pitanie = 0
        itogo = 0
        homePay = 0
        calc = {}
        obj_id[id].zp.forEach((el, i)=>{
            calc[el.jobTitle+" "+el.smenaNumber] = {
                rubHour:    el.rubHour,
                rubNight:   el.rubNight,
                rubHoliday: el.rubHoliday,
                doplata:    el.doplata,
                result:     el.result
            }

            itogo       += obj_id[id].zp[i].result 
            pitanie     += obj_id[id].zp[i].pitanie
            if(obj_id[id].smenaDate[i].jobTitle[0] === 'stsmena'){      pay = 7000   }
            if(obj_id[id].smenaDate[i].jobTitle[0] === 'inspektor'){    pay = 1000   }
            homePay     += pay


        })
        obj_id[id].zpResult = {
            calc,
            itogo, 
            pitanie, 
            homePay, 
            result: itogo - homePay
        }
    }
    return(obj_id)

    

    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         
    // летние = 7% от 
    // 54000       за 16 смен
    // 45000       за 16 смен
    // питание 32.5 за час
    
}





// --------------------------------------------------------------------------------------------
// EXPRESS доработать !!!!
// --------------------------------------------------------------------------------------------
// appExpress.get      ('/', ( req, res ) =>               {   res.send(`EXPRESS START...<br><pre>${JSON.stringify( xlsx , null, 5)}</pre>`)     })
// appExpress.listen   (65535, "127.255.255.254", () =>    {   /*c(`\tEXPRESS LISTEN\n\thttp://127.255.255.254:65535/`)*/      })