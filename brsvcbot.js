
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})


// bot.deleteMyCommands()
bot.setMyCommands([
//     {command:"start",       description:"Старт"},
//     {command:"auto",        description:"Автотранспорнт"},
//     {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))


// -------------------------------------------------------------------------------------------------------------------------------------------

const obj       = {}
let   xlsxData  = []
start()


bot.on("message", async msg=>{  //c(obj) 
    fs.appendFileSync(`${__dirname}/SOURSE/log`, `\n${obj[msg.chat.id].secure} ${msg.chat.id} ${msg.from.first_name}: ${msg.text}`)
    if(msg.entities){obj[msg.chat.id].command = msg.text}
    reg(msg)
    search(msg)
    my(msg)
    zp(msg)
})
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
        start()
        bot.sendMessage(query.from.id, "Данные обновлены")
    }
    
    if(query.data === "ntbaStart"){
        // require("./ntba")
        bot.sendMessage(query.from.id, "ntba в работе")
    }
}) 



function start(){

    path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
    if(fs.existsSync(path)){
        xlsxData = xlsx.parse(path)
        fs.writeFileSync(`${__dirname}/SOURSE/all`, JSON.stringify(xlsxData, null, 5))
    }else{
        xlsxData = JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`, "utf8")) 
    }

    xlsxData.forEach(e=>{
        if(e.name == "users"){
            e.data.forEach(el=>{
                if(+el[0]){
                    obj[el[0]] = {
                        command:    "",
                        secure:     true,                        
                        jobTitle:   el[6],
                    }
                }
            })
        }
    })
}

function reg(msg){
    
    if(!obj[msg.chat.id]){
        obj[msg.chat.id] = {
            secure:     false,
            command:    "",
        }
        bot.sendMessage(msg.chat.id, "Нет доступа\n\nВведите ФИО, дату рождения и номер телефона\n\nОжидайте обновления !!!")
    }
}

function search(msg){ 
try {
    if(obj[msg.chat.id].secure && msg.text !== "/"){
        arr = []
        counter = 0
        
            xlsxData.forEach(el=>{
                if(el.name == "АТ"){
                    el.data.forEach(ell=>{
                        if(ell.join(" ").match(RegExp(msg.text, "i")) && counter<5){
                            counter++
                            arr.push(ell)
                        }
                    })
                }
            })
        if(arr.length == 0){
            bot.sendMessage(msg.chat.id, `По запросу ничего не найдено`)
        }else{
            arr.forEach(el=>{
                bot.sendMessage(msg.chat.id, JSON.stringify(el, null, 4))
            })
        }
    }
    
} catch (err) {
    // c(`TRY ERR > RegExp("${msg.text}", "i") > не допустимый ввод "${msg.text}"`)
    bot.sendMessage(msg.chat.id, `Неверный ввод "${msg.text}"`)
}
}

function my(msg){    
    if(msg.text === "/settings" && msg.chat.id === 5131265599){
        bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard:[
                    [{text: "tmate старт",          callback_data:   "t"},          {text: "tmate стоп", callback_data: "pkill tmate"}],
                    [{text: "Обновить данные",      callback_data:   "getData"}],
                    [{text: "ntba старт",           callback_data:   "ntbaStart"}]
                ]
            }
        })
    }
}

function zp(msg){

    // let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
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
        obj_smens[el].hoursNight        =   obj_smens[el].night.length * 11
        obj_smens[el].hoursHoliday      =   0
        obj_smens[el].holiday.forEach(ell=>{
            if(ell.getUTCHours() == 8){   obj_smens[el].hoursHoliday += 11 }
            if(ell.getUTCHours() == 20){  obj_smens[el].hoursHoliday += 4}
        })


        
    })
    
    // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
    // ночные 7 часов  23:00 - 06:00         20%
    // праздничные     00:00 - 23:59         *2
    // 54000       за 16 смен
    // 45000       за 16 смен
    // питание 32.5 за час
    
    if(obj[msg.chat.id].jobTitle && obj[msg.chat.id].jobTitle.match(/\d/)){
        arrZp = []
        obj[msg.chat.id].jobTitle.split(", ").forEach(el=>{
            smenaObj = obj_smens["smena_" + el.split("_")[1]]
            all =       smenaObj.hours
            day =       smenaObj.hoursDay
            night =     smenaObj.hoursNight
            holi =   smenaObj.hoursHoliday
            
            if(el.split("_")[0] === "stsmena")   {   oklad = 54000}
            if(el.split("_")[0] === "inspektor") {   oklad = 45000}
            rubHours = oklad / 176

            summ = oklad // ????
            summNight = night * rubHours * .2
            summHoliday = holi * rubHours
            result = summ + summNight + summHoliday

            obj_calc = {
                jobTitle: el.split("_")[0],
                hours: `all: ${all}, night: ${night}, holiday: ${holi}`,
                result: `${Math.round(result*100)/100} (${Math.round(summ*100)/100} ${Math.round(summNight*100)/100} ${Math.round(summHoliday*100)/100})`
            }
            arrZp.push(obj_calc)
        })
        obj[msg.chat.id].jobTitleArr = arrZp
    }
    if(obj[msg.chat.id].command === "/settings"){
        bot.sendMessage(msg.chat.id, JSON.stringify(obj[msg.chat.id].jobTitleArr, null, 4))
    }
    
}