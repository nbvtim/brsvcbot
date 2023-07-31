const TOKEN         = "5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8"
const bash          = require("child_process") // c(bash.execSync('pwd').toString())
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi (TOKEN, {polling: true})

if(process.platform == "win32"){path =     "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/all.txt"; nbv()}
if(process.platform == "linux"){path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/nbv/all.txt"; nbv()}

function nbv(){

    bot.on('message', async function(msg){                                            
         
        if(msg.chat.id == 5131265599){

            answer = `${process.platform}:${Date.now()}:${msg.chat.id}> ${msg.text}\n`
            fs.appendFileSync(path, answer)

            if(msg.text == "+"){
                bot.sendMessage(msg.chat.id, fs.readFileSync(path, "utf8"))
            }

            if(msg.text == "-"){
                fs.unlinkSync(path)
                fs.writeFileSync(path, `${process.platform} \n${Date.now()} \n${path}`)
                bot.sendMessage(msg.chat.id, "Очищено")
            }

            if(msg.text.indexOf("bash") != -1){
                txt = msg.text.replace("bash", "")
                await bot.sendMessage(msg.chat.id, `${process.platform} $: ${txt}`)
                bot.sendMessage(msg.chat.id, bash.execSync(txt).toString())
            }

c(fs.readFileSync(path, "utf-8"))

        }else{
            
            answer = `--${msg.chat.id}:${msg.from.first_name} ${msg.text}`
            fs.appendFileSync(path, answer)

c(fs.readFileSync(path, "utf-8"))

        }

    })
}

c(process.platform)
c(__dirname)
c("Ctrl A и D для screen, переводит процесс в фоновый режим")
c("Бот в работе...")



function c(text){
    let m = [["Тёмно-красный", "\033[31m", "\033[41m" ],["Тёмно-зелёный", "\033[32m", "\033[42m" ],["Тёмно-жёлтый", "\033[33m", "\033[43m" ],["Тёмно-синий", "\033[34m", "\033[44m" ],["Темно-пурпурный", "\033[35m", "\033[45m" ],["Тёмно-голубой", "\033[36m", "\033[46m" ],/*["Красный", "\033[91m", "\033[101m"],["Зелёный", "\033[92m", "\033[101m"],["Оранжевый", "\033[93m", "\033[103m"],["Синий", "\033[94m", "\033[104m"],["Пурпурный", "\033[95m", "\033[105m"],["Голубой", "\033[96m", "\033[106m"],["Светло-серый", "\033[37m", "\033[47m" ],["Тёмно-серый", "\033[90m", "\033[100m"],["Стандартный", "\033[39m", "\033[49m" ],["Чёрный", "\033[30m", "\033[40m" ],["Белый", "\033[97m", "\033[107m"]*/]
    
// Разноцветные буквы
    // if(typeof text == "string"){
    //     let textOut=""
    //     for(i=0;i<text.length;i++){
    //         r = Math.floor(Math.random()*m.length)
    //         textOut +=  m[r][1] + text[i]
    //     }
    //     console.log(textOut + "\033[m")
    // }else{
    //     console.log(text)
    // }

// Разоцветные строки
    if(typeof text == "string"){
        r = Math.floor(Math.random()*m.length)
        console.log(m[r][1] + text + "\033[m") // m[r][1]
    }else{
        console.log(text)
    }
}





// fetch("https://nbvtim.github.io/work/db.json")
// .then(response => response.json()) // response.text()  response.json()
// .then(value => {
//     c(value)
// })

// 5131265599 - Тим
// 5239919290 - Люда
// 2037585811 - 15
// 5861082944 - диспетчер
// 5284561048 - Марина 

// c(`
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getUpdates
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getMe
//     https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/sendMessage?chat_id=2037585811&text=test
// `)
