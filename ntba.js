// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"
const c             = console.log
const xlsx          = require('node-xlsx').default
const fs            = require('fs')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})

const getDataa = new function (path = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"){
    if(fs.existsSync(path)){
        fs.writeFileSync( `${__dirname}/SOURSE/all`, JSON.stringify(xlsx.parse(path), null,5) )
        return xlsx.parse(path)
    }else{
        return JSON.parse(fs.readFileSync(`${__dirname}/SOURSE/all`))
    }
}

const main = {}

for(i in getDataa){
    if(getDataa[i].name === "users"){
        for(j in getDataa[i].data){
            if(+getDataa[i].data[j][0]){
                main[getDataa[i].data[j][0]] = {
                    seq: false,
                    f: getDataa[i].data[j][1],
                    i: getDataa[i].data[j][2],
                    o: getDataa[i].data[j][3],
                    tel: getDataa[i].data[j][5],}}}}}

bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"settings",    description:"Настройки"},
//     {command:"help",        description:"Помощь"}
])

bot.on("message", async msg=>{
    
})
bot.on("callback_query", query=>{

})

