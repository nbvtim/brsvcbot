
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"         - ntba
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"  
const c             = console.log
const appExpress    = require("express")()
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    // {command:"zp",          description:"Зарплата"},
    // {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
    // {command:"help",        description:"Помощь"}
])

// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))


const obj = {}
xlsx.forEach(el=>{
    if(el.name === "users"){
        el.data.forEach(el=>{ 
            if(+el[0]) {obj[el[0]] = {}}
        })
    }
})


// --------------------------------------------------------------------------------------------
// БОТ ОЖИДАЕТ ВВОДА ОТ ПОЛЬЗОВАТЕЛЯ
// --------------------------------------------------------------------------------------------
bot.on("message", async msg=>{ 
    // c(msg)
    fs.appendFileSync   (`${__dirname}/log`, `\n${msg.chat.id}_${msg.from.first_name}: ${msg.text}`)
    
// Если пользователь есть в базе то бот будет работать
    if(obj[msg.chat.id]){ 
        if(msg.entities){obj[msg.chat.id].command = msg.text}
        if(!obj[msg.chat.id].command){   bot.sendMessage(msg.chat.id, `Выберите пункт меню`)   }


// Поиск по автотранспорту
        if(obj[msg.chat.id].command === "/auto"){
            if(msg.text === "/auto") {
                bot.sendMessage(msg.chat.id, `Режим поиска по автотранспорту`)
            }else{
                count = 0
                try {   // + ? \ * ( ) [  -  для RegExp ошибка
                    xlsx.forEach(el=>{
                        if(el.name === "АТ"){
                            el.data.forEach(ell=>{ 
                                if(ell.join(" , ").match(RegExp(msg.text, "i")) && count < 5){
                                    bot.sendMessage(msg.chat.id, JSON.stringify(ell, null, 5))
                                    count++
                                }
                            })
                        }
                    })
                    if(count === 0){
                        bot.sendMessage(msg.chat.id, `По запросу совпадений нет`)
                    }
                } catch (err) {
                    bot.sendMessage(msg.chat.id, `Ошибка try catch`)
                }
            }
        }

// Мои настройки
        if(obj[msg.chat.id].command === "/settings" && msg.chat.id === 5131265599){
            bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "tmate старт",          callback_data:   "t"},          {text: "tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "Показать log",         callback_data:   "log"}]
                    ]
                }
            })
        }


    }

// Если пользователя нет в базе то бот будет предлагать регистрацию
    if(!obj[msg.chat.id]){ 
        bot.sendMessage(msg.chat.id, `Нет доступа !!!\nДля предоставления доступа отправьте:\n- Ф.И.О.\n- номер телефона\n- дату рождения`)
    }
// c(obj)
})



// --------------------------------------------------------------------------------------------
// БОТ ОБРАБАТЫВАЕТ ЗАПРОСЫ С КЛАВИАТУРЫ 
// --------------------------------------------------------------------------------------------
bot.on("callback_query", query=>{ 
    // c(query)
    if(query.data === "t"){ 
        cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ</a>`, {parse_mode:"HTML"})
    }
    if(query.data === "pkill tmate"){
        cp.spawnSync('pkill', ['tmate'])
        bot.sendMessage(query.from.id, "Сессия tmate остановлена")
    }
    if(query.data === "log"){  // Текст отправляемого сообщения, 1-4096 символов после разбора сущностей
        txt = fs.readFileSync("./log", "utf8")
        bot.sendMessage(query.from.id, txt.length, {parse_mode:"HTML"})
    }

})






// --------------------------------------------------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// --------------------------------------------------------------------------------------------

// НАЧАЛЬНАЯ ФУНКЦИЯ
function calcSmens(){
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

    return obj_smens

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




