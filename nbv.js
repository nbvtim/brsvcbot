const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

let dataAll = getData()
const obj = {}

// bot.deleteMyCommands()
bot.setMyCommands([
//     {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])
// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {       })
// bot.on("polling_error", err=>c("err"))

bot.on("message", msg=>{
    brsvcbot(msg)
})
bot.on("callback_query", query=>{
    // c(query.from.id)
    if(query.data === "t"){ 
        cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ссылке</a>`, {parse_mode:"HTML"})
    }
    if(query.data === "pkill tmate"){
        cp.spawnSync('pkill', ['tmate'])
        bot.sendMessage(query.from.id, "Сессия tmate остановлена")
    }
    if(query.data === "getData"){
        dataAll = getData()
        bot.sendMessage(query.from.id, "Данные обновлены")
    }

    
})


async function brsvcbot(msg){
    if( msg.entities ){ obj[msg.chat.id] = msg.text}
    if( msg.text ){fs.appendFileSync( `${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n` )   }   

    if(security(msg.chat.id)){

        /*временная*/if(obj[msg.chat.id] !== "/auto" && obj[msg.chat.id] != "/key" && obj[msg.chat.id] !== "/settings"){bot.sendMessage(msg.chat.id,`Вод не поддерживается\nперейдите в раздел /auto или /key`, {parse_mode:"HTML"})}
        
        //
        if(obj[msg.chat.id] === "/auto" && msg.text === "/auto"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по автотранспорту`)
        }
        if(obj[msg.chat.id] === "/auto" && msg.text !== "/auto"){
            counter = 0
            for(i in dataAll[0].data){
                str = dataAll[0].data[i].join("").replace(/ /g, "").toLowerCase().match(RegExp(msg.text, "i"))
                if(str !== null){
                    if(counter < 5){
                        await bot.sendMessage(msg.chat.id, `<i>${dataAll[0].data[i].join("\n")}</i>`, {parse_mode:"HTML"})
                    }
                    counter++
                }
            }
            await bot.sendMessage(msg.chat.id, `<b>Найдено записей: </b>${counter}`,{parse_mode:"HTML"})
        }

        //
        if(obj[msg.chat.id] === "/key" && msg.text === "/key"){
            bot.sendMessage(msg.chat.id,`Вы находитесь в режиме поиска по ключам`)
        }
        if(obj[msg.chat.id] === "/key" && msg.text !== "/key"){
            counter = 0
            for(i in dataAll[1].data){
                str = dataAll[1].data[i].join("").replace(/ /g, "").toLowerCase().match(RegExp(msg.text, "i"))
                if(str !== null){
                    if(counter < 5){
                        await bot.sendMessage(msg.chat.id, `<i>${dataAll[1].data[i].join("\n")}</i>`, {parse_mode:"HTML"})
                    }
                    counter++
                }
            }
            await bot.sendMessage(msg.chat.id, `<b>Найдено записей: </b>${counter}`,{parse_mode:"HTML"})
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
    }
}













function getData(){
    path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
    if(fs.existsSync(path)){
        return xlsx.parse(path)
    }
}

function security(id){
    getId = ""
    for(i in dataAll){
        if(dataAll[i].name === "users"){
            for(j in dataAll[i].data){
                if(dataAll[i].data[j][0] === id){
                    getId = id
                }
            }
        }
    }
    if(getId === id){
        return true
    }else{    
        bot.sendMessage(id, `<b>Нет доступа !!!
Вы можете прислать данные в формате</b>
        <i>ФИО: ...
        Номер телефона: ...
        Дата рождения: ...</i>
<b>После одобрения Вам предоставят доступ</b>`, 
    {parse_mode:"HTML"})
    }
}
