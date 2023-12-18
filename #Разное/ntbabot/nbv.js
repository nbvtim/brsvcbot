const c             = console.log
const TOKEN         = "6442530903:AAGkpmYCCs7vdB6GWUfJtBMGP9KeQjT4uyk"
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

try{

    bot.on("message", async msg=>{ // c(m)
        fs.appendFileSync(__dirname+"/log", `${msg.chat.id} ${msg.chat.first_name} ${msg.chat.username} "${msg.text}"\n`,"utf8")
        function users(){
            fs.readFile(__dirname+"/users", "utf8", (err,data)=>{
                if(err){
                    fs.appendFileSync(__dirname+"/users", `${msg.chat.id}- ${msg.chat.first_name} ${msg.chat.username}`, "utf8")
                }else{
                    mass = fs.readFileSync(__dirname+"/users", "utf8").split("\n")
                    for(i in mass){
                        res = mass[i].match(RegExp(msg.chat.id))
                        if(res !== null){
                            if(mass[i][10] === "-"){
                                bot.sendMessage(msg.chat.id, `<b>${msg.chat.first_name}</b>, нет доступа !!!`, {parse_mode:"HTML"})  
                            }
                        }
                    }
                }
            })
        }
        users()
    })

}catch(err){
    c("Ошибка TRY:\n"+err)
}
