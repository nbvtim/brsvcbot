const c             = console.log
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w", {polling: true})
const xlsx          = require('node-xlsx').default.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx")

bot.setMyCommands([{command:"test",       description:"Тест"}])
bot.on("message", async msg=>{

    oklad = 54000
    kviplate = oklad
    night = oklad/176*56*.2
    holi  = oklad/176*22
    doplata = kviplate * .07
    summ  = oklad + night + holi + doplata
    stsm = {
        oklad,kviplate,night,holi,doplata,summ,
    }
    await bot.sendMessage(msg.chat.id, `${JSON.stringify(stsm, null, 4)}`)

    oklad = 45000
    kviplate = oklad/176 * 14*11
    night = oklad/176*56*.2
    holi  = oklad/176*8
    doplata = kviplate * .07
    summ  = oklad + night + holi + doplata
    insp = {
        oklad,kviplate,night,holi,doplata,summ,
    }
    await bot.sendMessage(msg.chat.id, `${JSON.stringify(insp, null, 4)}`)

    summ = stsm.summ + insp.summ
    vichet = 8000
    itogo = summ - vichet
    delta = 37133.11 + 69872.59 - itogo
    obsum = {
        summ, vichet, itogo, delta
    }
    await bot.sendMessage(msg.chat.id, `${JSON.stringify(obsum, null, 4)}`)

})