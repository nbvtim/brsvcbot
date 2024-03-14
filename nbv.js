const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

let dataAll, users={}, obj={}, regUser={}

// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"food",        description:"Питание"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {       })
// bot.on("polling_error", err=>c("err"))

bot.on("message", async msg=>{ //users[msg.chat.id] = false
    
    if( msg.entities ){ obj[msg.chat.id] = msg.text}
    if( msg.text ){fs.appendFileSync( `${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n` )   }   
    if(users[msg.chat.id]){ // проверка для допуска





        
        if(obj[msg.chat.id] === "/start" || obj[msg.chat.id] === undefined){
            bot.sendMessage(msg.chat.id,`Ввод не поддерживается
перейдите в один из разделов:
 - поиск по АТ /auto
 - поиск по ключам /key
 - питание /food`, {parse_mode:"HTML"})}
        
        //
        if(obj[msg.chat.id] === "/auto" && msg.text === "/auto"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по автотранспорту`)
        }else if(obj[msg.chat.id] === "/auto" && msg.text !== "/auto"){
            search(msg)
        }

        //
        if(obj[msg.chat.id] === "/key" && msg.text === "/key"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по ключам`)
        }else if(obj[msg.chat.id] === "/key" && msg.text !== "/key"){
            search(msg)
        }

        //
        if(obj[msg.chat.id] === "/food" && msg.text === "/food"){
            bot.sendMessage(msg.chat.id,`<b>Подсчет остатка по питанию</b>\n<i>Ведите количество рабочих смен и сумму покупок <u>через пробел</u></i>`,{parse_mode:"HTML"})
        }else if(obj[msg.chat.id] === "/food" && msg.text !== "/food"){
            msg.text = msg.text.replace(/,/g, ".")
            days = Number(msg.text.split(" ")[0])
            summ = Number(msg.text.split(" ")[1])
            bot.sendMessage(msg.chat.id,`Лимит: ${32.5 * 11 * days}\nОстаток: ${32.5 * 11 * days - summ}`, {parse_mode:"HTML"})
        }

        //
        if(msg.text === "/settings" && msg.chat.id === 5131265599){
            bot.sendMessage(msg.chat.id, "<b> 🛠 НАСТРОЙКИ 🛠 </b>", {
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
        
        if(msg.text.split(" ").length === 3){
            regUser[msg.chat.id].name = msg.text
        }
        if( +msg.text && msg.text.length === 11 && msg.text[0] === "8" && msg.text[1] === "9" ){
            regUser[msg.chat.id].tel = msg.text
        }
        if( +msg.text && msg.text.length === 8 && msg.text[0]<4 && msg.text[1]<10 && msg.text[2]<2 && msg.text[3]<10){
            regUser[msg.chat.id].date = msg.text
        }
        if(Object.keys(regUser[msg.chat.id]).length === 3){
            bot.sendMessage(msg.chat.id,`Регистрация окончена, ожидайте подтверждения !!!\nДля изменения данных просто вводите данные в соответствующем формате`)
            fs.writeFileSync( `${__dirname}/SOURSE/${msg.chat.id}`, JSON.stringify(regUser[msg.chat.id], null, 5))
        }

        await bot.sendMessage(msg.chat.id, `ФИО: ${regUser[msg.chat.id].name || "Фамилия Имя Отчество"}\nТелефон: ${regUser[msg.chat.id].tel || "89XXXXXXXXX"}\nДата рождения: ${regUser[msg.chat.id].date || "01011970"}`)
        
        
        

    }
})




bot.on("callback_query", query=>{
    // c(query.from.id)
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
})



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
                        users[dataAll[i].data[j][0]] = true 
                    }
                }
            }
        }
    }
}getData()