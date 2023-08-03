const c             = console.log
const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const bash          = require("child_process") // c(bash.execSync('pwd').toString())
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

let path = ""
if(process.platform == "win32"){path =     "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/all.txt"}
if(process.platform == "linux"){path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/all.txt"}

function nbv(){

    bot.on('message', async function(msg){ 
        
// 5131265599 - Тим
// 5239919290 - Люда
// 2037585811 - 15
// 5861082944 - диспетчер
// 5284561048 - Марина                                         
         
        if(msg.chat.id == 5131265599){

            answer = `${process.platform}:${Date.now()}:${msg.chat.id}> \n[ ${msg.text} ]\n`
            fs.appendFileSync(path, answer)

            if(msg.text == "+"){
                bot.sendMessage(msg.chat.id, fs.readFileSync(path, "utf8"))
            }

            if(msg.text == "-"){
                fs.unlinkSync(path)
                fs.writeFileSync(path, `${process.platform} \n${Date.now()} \n${path}\n`)
                bot.sendMessage(msg.chat.id, "Очищено")
            }

            if(msg.text.indexOf("nbv") != -1 && process.platform == "linux"){
                txt = msg.text.replace("nbv", "")
                await bot.sendMessage(msg.chat.id, `${process.platform} $: ${txt}`)
                bot.sendMessage(msg.chat.id, bash.execSync(txt).toString())
            }

        }else{

            p = path.replace(/all.txt/, msg.chat.id + ".txt")
            answer = `--${msg.chat.id}:${msg.from.first_name}$ ${msg.text}\n`
            
            if(fs.existsSync(p)){

                bot.sendMessage(msg.chat.id, "Ожидайте, проводится проверка !!!")
                bot.sendMessage(msg.chat.id, "Вели не верные данные? \nПопробуйте еще раз !!!")
                fs.appendFileSync(p, answer)
                
            }else{
                
                bot.sendMessage(msg.chat.id, "Введите имя и номер телефона")
                fs.appendFileSync(p, answer)

            }
        }
    })
}nbv()

c("Ctrl A и D для screen, переводит процесс в фоновый режим")
c(process.platform)
c("Бот в работе...")





// fetch("https://nbvtim.github.io/work/db.json")
// .then(response => response.json()) // response.text()  response.json()
// .then(value => {
//     c(value)
// })

// c(`
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getUpdates
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getMe
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/sendMessage?chat_id=2037585811&text=test
// `)
