// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

const getDataa = new function (path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        fs.writeFileSync( `${__dirname}/SOURSE/all`, JSON.stringify(xlsx.parse(path), null,5) )
        return xlsx.parse(path)
    }else{
        return JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`))
    }
}

const main = {}

for(i in getDataa){
    if(getDataa[i].name === "users"){
        for(j in getDataa[i].data){
            if(+getDataa[i].data[j][0]){
                main[getDataa[i].data[j][0]] = {
                    seq: true,
                    f: getDataa[i].data[j][1],
                    i: getDataa[i].data[j][2],
                    o: getDataa[i].data[j][3],
                    tel: getDataa[i].data[j][5],
                }
            }
        }
    }
}







let dataAll, users={}, obj={}, regUser={}

// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))




// -------------------------------------------------------------------------------------------------------------------------------------------
bot.on("message", async msg=>{ //users[msg.chat.id] = false



    if( msg.entities ){ obj[msg.chat.id] = msg.text}
    if( msg.text ){fs.appendFileSync( `${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n` )   }   


    if(users[msg.chat.id]){ // проверка для допуска

        
        if(obj[msg.chat.id] === "/start" || obj[msg.chat.id] === undefined){
            bot.sendMessage(msg.chat.id,`Пожалуйста перейдите в один из разделов, кнопка меню находится радом с полем ввода текста`, {parse_mode:"HTML"})}
        
        // ------------------------------------------
        if(obj[msg.chat.id] === "/auto" && msg.text === "/auto"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по автотранспорту`)
        }else if(obj[msg.chat.id] === "/auto" && msg.text !== "/auto"){
            search(msg)
        }

        // ------------------------------------------
        if(obj[msg.chat.id] === "/key" && msg.text === "/key"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по ключам`)
        }else if(obj[msg.chat.id] === "/key" && msg.text !== "/key"){
            search(msg)
        }

        // ------------------------------------------
        if(msg.text === "/settings" && msg.chat.id === 5131265599){

            await bot.sendMessage(msg.chat.id, JSON.stringify(zp(1,47000),null,5))
            await bot.sendMessage(msg.chat.id, JSON.stringify(zp(4,35000),null,5))

            await bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "🔄 Перезаписать getData", callback_data: "getData"}]
                    ]
                }
            })
        }

    
    }else{


        if(regUser[msg.chat.id] === undefined){
            await bot.sendMessage(msg.chat.id,`Пройдите регистрацию !!!\nДля изменения данных просто вводите данные в соответствующем формате`)
            regUser[msg.chat.id] = {}
        }
        if(parse(msg.text)){
            regUser[msg.chat.id][parse(msg.text)[0]] = parse(msg.text)[1]
        }
        if(Object.keys(regUser[msg.chat.id]).length === 3){
            bot.sendMessage(msg.chat.id,`Регистрация окончена, ожидайте подтверждения !!!\nДля изменения данных просто вводите данные в соответствующем формате`)
            fs.writeFileSync( `${__dirname}/SOURSE/${msg.chat.id}`, JSON.stringify(regUser[msg.chat.id], null, 5))
            bot.sendMessage(5131265599, `${JSON.stringify(regUser[msg.chat.id], null, 5)}`, {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "Предоставить доступ", callback_data: `${JSON.stringify([msg.chat.id])}`}]
                    ]
                }
            })
            users[msg.chat.id] = null
        }
        await bot.sendMessage(msg.chat.id, `ФИО: ${regUser[msg.chat.id].FIO || "Фамилия Имя Отчество"}\nТелефон: ${regUser[msg.chat.id].tel || "89xxxxxxxxx"}\nДата рождения: ${regUser[msg.chat.id].date || "01011970"}`)
        

    }
})





// -------------------------------------------------------------------------------------------------------------------------------------------
bot.on("callback_query", query=>{


    //c(query)
    if(query.data === "t"){ 
        cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ </a>`, {parse_mode:"HTML"})
    }
    if(query.data === "pkill tmate"){
        cp.spawnSync('pkill', ['tmate'])
        bot.sendMessage(query.from.id, "Сессия tmate остановлена")
    }
    if(query.data === "getData"){
        getData()
        bot.sendMessage(query.from.id, "Данные обновлены")
    }
    if(users[JSON.parse(query.data)[0]] == null){
        users[JSON.parse(query.data)[0]] = true
        bot.sendMessage(JSON.parse(query.data)[0], "Вам предоставлен временный доступ !!!")
        
    }


})





// -------------------------------------------------------------------------------------------------------------------------------------------
async function search(msg, bd = dataAll, command = obj[msg.chat.id], txt = msg.text){
    let objec = {
        "АТ" :      "/auto",
        "Ключи" :   "/key"
    }

    for(j in bd){
        for(i in Object.keys(objec)){        
            if(Object.keys(objec)[i] === bd[j].name && command === Object.values(objec)[i]){
                counter = 0
                for(k in bd[j].data){
                    str = bd[j].data[k].join("").replace(/ /g, "").toLowerCase().match(RegExp(txt, "i"))
                    if(str !== null){
                        if(counter < 5){
                            await bot.sendMessage(msg.chat.id, `<i>${bd[j].data[k].join("\n")}</i>`, {parse_mode:"HTML"})
                        }
                        counter++
                    }
                }
                await bot.sendMessage(msg.chat.id, `<b>Найдено записей: </b>${counter}`,{parse_mode:"HTML"})
            }
        }
    }
}

function getData(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        dataAll = xlsx.parse(path) // =>
        for(i in dataAll){
            if(dataAll[i].name === "users"){
                for(j in dataAll[i].data){
                    if(+dataAll[i].data[j][0]){
                        users[dataAll[i].data[j][0]] = true }}}}}
}getData()

function parse(t){

    if(t.match(/[А-я]/g) && t.match(/\d/g) === null){
        mas = t.split(" ")
        if(mas.length === 3){
            masF = mas[0][0].match(/[А-Я]/g)
            masI = mas[1][0].match(/[А-Я]/g)
            masO = mas[2][0].match(/[А-Я]/g)
            if(masF && masI && masO){
                return ["FIO",t]
            }
        }
    }

    if(t.match(/\d/g)){
        
        if(t.match(/\d/g).length === 8){
            date = new Date()
            maxYear = date.getFullYear()-10
            num = t.match(/\d/g).join("")
            numDay = num[0]+num[1]
            numMonth = num[2]+num[3]
            numYear = num[4]+num[5]+num[6]+num[7]
            if(numDay<=31 && numMonth<=12 && numYear>1900 && numYear<maxYear){
                return ["date",`${numDay}.${numMonth}.${numYear}`]
            }
        }

        if(t.match(/\d/g).length === 11){
            tel = t.match(/\d/g).join("")
            cod8 = tel[0] == 8
            cod9 = tel[1] == 9
            if(cod8 && cod9){
                return ["tel",`${tel[0]} (${tel[1]}${tel[2]}${tel[3]}) ${tel[4]}${tel[5]}${tel[6]}-${tel[7]}${tel[8]}-${tel[9]}${tel[10]}`]
            }
        }   
    }
}






    function smensCalc(){

        let s1d = new Date(2024, 1 -1, 2   , 8 +3    , 0,0,0)
        let s2d = new Date(2024, 1 -1, 2 +1, 8 +3    , 0,0,0)
        let s3d = new Date(2024, 1 -1, 2 +2, 8 +3    , 0,0,0)
        let s4d = new Date(2024, 1 -1, 2 +3, 8 +3    , 0,0,0)
        let s1n = new Date(2024, 1 -1, 2 +1, 8 +3 +12, 0,0,0)
        let s2n = new Date(2024, 1 -1, 2 +2, 8 +3 +12, 0,0,0)
        let s3n = new Date(2024, 1 -1, 2 +3, 8 +3 +12, 0,0,0)
        let s4n = new Date(2024, 1 -1, 2 +4, 8 +3 +12, 0,0,0)
        
        let now = new Date()
        now.setHours(now.getHours() +3)
        now.setMonth(now.getMonth() -0)
        let daysInMounth = (new Date(now.getFullYear(), now.getMonth()+1) - new Date(now.getFullYear(), now.getMonth()))/1000/60/60/24 // 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
    
        let objSmens = {}  
        massName    = ["smena1Day", "smena1Night", "smena2Day", "smena2Night", "smena3Day", "smena3Night", "smena4Day", "smena4Night"]
        mass        = [ s1d,        s1n,           s2d,         s2n,           s3d,         s3n,           s4d,         s4n]
        arr = []
        for(i in mass){
            while (now.getMonth() !== mass[i].getMonth()) {
                mass[i].setDate(mass[i].getDate() + 4)
            }
            while (now.getMonth() === mass[i].getMonth()) {
                arr.push(new Date(mass[i]))
                mass[i].setDate(mass[i].getDate() + 4)
            }
            objSmens[massName[i]] = arr
            arr = []
        }
        return objSmens       
    }
    function zp(smena = 1, oklad = 35000){
    
        // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
        // ночные 7 часов  23:00 - 06:00         20%
        // праздничные     00:00 - 23:59         *2
        // 47000       за 16 смен
        // 35000       за 16 смен
        // питание 32.5 за час
    
        calc        =   smensCalc()
        mass_days   =   calc[`smena${smena}Day`]
        mass_nights =   calc[`smena${smena}Night`]
        
        oneHours    =   oklad/176
        smens       =   mass_days.length + mass_nights.length
        smensNight  =   mass_nights.length
        rubNight    =   smensNight*7*oneHours*.2
        result      =   oklad+rubNight
        
        return {
            [`сменa ${smena}`]: [...mass_days, ...mass_nights],
            "смен в месяце":    smens,
            "из них ночных":    smensNight,
            "оклад":            oklad,
            "оплата за час":    Math.round(oneHours*100) / 100,
            "ночные":           Math.round(rubNight*100) / 100,
            "итого":            Math.round(result*100) / 100,
        }
    }