
const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("7054476589:AAEQ42O1ctVtqrS9Z8ZuJagET7gd7eyw-b8", {polling: true})
const xlsx          = require('node-xlsx').default
const fs            = require('fs')


const dataAll = new function(path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        return xlsx.parse(path)
    }
}
const global = new function(){
    obj = {}
    for(i in dataAll){
        if(dataAll[i].name === "users"){
            for(j in dataAll[i].data){
                if(+dataAll[i].data[j][0]){
                   obj[dataAll[i].data[j][0]] = "" 
                }
            }
        }
    }
    return obj
}

bot.on("message", async msg=>{
    global[msg.chat.id]
})
