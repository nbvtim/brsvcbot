// /mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1\ смена\ СВК/nbv/brsvcbot
const h             = require("./h")
const c             = h.c
const TOKEN         = "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const cp            = require('child_process')
const fs            = require('fs')
const xlsx          = require('node-xlsx').default
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{

    function pathFile(){
        if(process.platform === "win32")    {return     "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"}
        if(process.platform === "linux")    {return "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"}
        if(process.platform === "android")  {return "запиши путь для android"}
    }       
    c(`${pathFile()}  =  ${fs.existsSync(pathFile())}`)

    fs.writeFileSync( `${__dirname}/SOURSE/all`, JSON.stringify( xlsx.parse(pathFile()) , null, 4) )
    bd = JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`, "utf8"))
    bdAT = bd[0].data

    // bot.deleteMyCommands()
    // bot.setMyCommands([ 
        // {command:"start",description:"Старт"},
        // {command:"settings",description:"Настройки"},
        // {command:"help",description:"Помощь"}
    // ])
    // bot.getMyCommands().then(t=>c(t))
    
    bot.on("message", async msg=>{ // c(msg.chat.id)
        
        if(msg.text !== undefined){
            fs.appendFileSync(`${__dirname}/SOURSE/log`, `${msg.date}_${msg.chat.id}_${msg.chat.first_name} >>> ${msg.text}\n`)
        }

        if(msg.text !== undefined && msg.text !== "/" && fs.readFileSync(`${__dirname}/SOURSE/users`,"utf8").match(RegExp(msg.chat.id, "gm")) !== null){

            re = RegExp(msg.text, "i")
            counter = 0
            for(i in bdAT){
                str = bdAT[i].join("").replace(/ /g, "").toLowerCase().match(re)
                if(str != null){
                    if(counter < 5){
                        counter++
                        t = bdAT[i].join("\n")
                        await bot.sendMessage(msg.chat.id, t)
                    }
                }
            }
            await bot.sendMessage(msg.chat.id, `<b><i>Найдено записей: ${counter}</i></b>`,{parse_mode:"HTML"})
        }else if(msg.text === "/" && msg.chat.id == 5131265599){
            bot.sendMessage(msg.chat.id, "<b> 🛠 НАСТРОЙКИ 🛠 </b>", {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard:[
                        [{text: "▶ Tmate старт", callback_data: "t"}, {text: "⏹ Tmate стоп", callback_data: "pkill tmate"}],
                        [{text: "🔄 Перезапустить бота", callback_data: "./tg"}]
                    ]
                }
            })
        }else{
            bot.sendMessage(msg.chat.id, `<b><i>Нет доступа ... </i></b> <tg-spoiler> ${msg.chat.id} </tg-spoiler>`,{parse_mode:"HTML"})
        }
    })

    bot.on("callback_query", async query=>{ 
        
        if(query.data === "t"){            
            cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F > ./SOURSE/1")
        }
        if(query.data === "pkill tmate"){
            cp.spawnSync('pkill', ['tmate'])
        }
    })
    
    bot.getMe().then(t=>{c(`${t.username.toUpperCase()} запущен на платформе ${process.platform.toUpperCase()}`)})

}catch(err){

    c("_____________________ TRY ERROR _____________________")

}