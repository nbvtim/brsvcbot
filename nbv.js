const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})

const bdAT = getData()[0].data

// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start", description:"Старт"},
    {command:"auto", description:"Автотранспорнт"},
    {command:"settings", description:"Настройки"},
    {command:"help", description:"Помощь"}
])
bot.getMyCommands().then(   (t) =>  {       })
bot.getMe().then(           (t) =>  {       })
bot.on("polling_error", err=>c(err))

try{

    bot.on("message", async msg=>{
	    if( msg.text ){fs.appendFileSync( `${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n` )   }


        if(security(msg.chat.id)){

            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(RegExp(msg.text, "i"))
                if(str !== null){
                    if(counter < 5){
                        t = bdAT[i].join("\n")
                        await bot.sendMessage(msg.chat.id, `<i>${t}</i>`, {parse_mode:"HTML"})
                    }
                    counter++
                }
            }
            await bot.sendMessage(msg.chat.id, `<b>Найдено записей: ${counter}</b>`,{parse_mode:"HTML"})
        
        }

        if(msg.text === "/" && msg.chat.id == 5131265599){
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
    })
    
    bot.on("callback_query", async query=>{
        // c(query.from.id)
        if(query.data === "t"){ // "tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F > ./SOURSE/1"
            cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
            bot.sendMessage(query.from.id, "https://tmate.io/t/nbv/pc")
        }
        if(query.data === "pkill tmate"){
            cp.spawnSync('pkill', ['tmate'])
            bot.sendMessage(query.from.id, "pkill tmate")
        }
        if(query.data === "getData"){
            getData()
            bot.sendMessage(query.from.id, "Данные обновлены")
        }

        
    })

}catch(err){

    c("_____________________ TRY ERROR _____________________")
    c(err)

}




function security(id){
    getId = +getData()[3].data.join("\n").match(RegExp(id,"g"))
    if(getId === id){return true}else{
        bot.sendMessage(id, "<b>Нет доступа !!!\nВы можете прислать данные в формате</b>\nФИО:\nНомер телефона:\nДата рождения:\n<b>После одобрения Вам предоставят доступ</b>", {parse_mode:"HTML"})
        return false
    }
}
function getData(){
    const all_XLSX_path     = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
    if(fs.existsSync(all_XLSX_path)){
        return xlsx.parse(all_XLSX_path)
    }else{
        c("ДАННЫЕ НЕ ПОЛУЧЕНЫ !!!")
    }
}