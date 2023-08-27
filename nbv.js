const c             = require("./m-helpers")
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

bot.setMyCommands([
    {
        command:"start",
        description:"Старт"
    },
    {
        command:"nbv",
        description:"Команда"
    }
])
bot.getMyCommands()
bot.on('message', async function(msg){
    
    // c(`${msg.chat.id} > ${msg.text}`)
    if(process.platform == "android"){file = `${__dirname}/../storage/downloads/${msg.chat.id}_${msg.from.first_name}.txt`
    }else{file = `${__dirname}\\${msg.chat.id}_${msg.from.first_name}.txt`}

    if(fs.existsSync(file)){
        fs.appendFileSync(file, `${JSON.stringify(msg)}\n`)}else{
        fs.writeFileSync(file, `"text":"${Date.now()}"\n`)}        
    
    if(msg.text == "/ls"){
        txt = fs.readFileSync(file, "utf-8")
        await bot.sendMessage(msg.chat.id, `<b>${txt.match(/"text":"([^"]+)"/gim).join("\n")}</b>`, {parse_mode:"HTML"}) 
    }

    if(msg.text == "/rm"){
        fs.unlinkSync(file)
        await bot.sendMessage(msg.chat.id, "Очищено")     
    }

})




c("Бот в работе...")
bot.getMe().then(r => console.log(r)).catch(e => console.log(e))
c({
    os : process.platform,
    dir: __dirname,
    token: "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
})

