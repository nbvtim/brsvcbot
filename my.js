//      "C:/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
//  "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"

const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6442530903:AAGkpmYCCs7vdB6GWUfJtBMGP9KeQjT4uyk", {polling: true})
const xlsx          = require('node-xlsx').default
const fs            = require('fs')



const dataAll = new function(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){ 
    if(fs.existsSync(path)){
        return xlsx.parse(path)
    }
}
const users = new function(){
    objUsers = {}
    for(i in dataAll){
        if(dataAll[i].name === "users"){
            for(j in dataAll[i].data){
                if(+dataAll[i].data[j][0]){
                   objUsers[dataAll[i].data[j][0]] = true 
                }
            }
        }
    }
    return objUsers
}



bot.on("message", async msg=>{ users[msg.chat.id] = false
    c(msg.text)
})




// c("Яицких Тим Евгеньевич".match(/[А-Я]+/g))
// c("Яицких Тим Евгеньевич".match(/[А-я]+/g))
// c("Яицких Тим Евгеньевич".match(/[а-я]+/g))