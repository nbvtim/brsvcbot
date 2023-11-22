function c(data){
    if(typeof data === "string"){
        color   = [ "\033[97m", "\033[94m", "\033[91m" ]
        newdataLength = data.length - data.length%3
        newdata = ""
        point = ""
        for(i=0; i < newdataLength; i++){newdata += data[i]}
        for(i=0; i < newdataLength/3; i++){point += "."}
        mass = newdata.match(RegExp(point,"g"))
        newMass = []
        if(mass.length == color.length){for(i in mass){newMass.push(color[i] + mass[i])}}
        delta = data.replace(newdata, "")
        console.log(newMass.join("") + delta + "\033[m")
    }else{
        console.log(data)
    }
       
}
module.exports = {c: c}

/*
bot.sendMessage(id, `Сообщение 1`).then(()=>{
    // bot.sendMessage, это промис
    // исполнится после завершения, например после загрузки большого видео
    c("Видео загружено")
}).catch(err=>{
    // обработка ошибок
    console.error(err)
})
*/

/*
bot.onText(/\/start/, msg=>{ // обработка команд
    const { id } = msg.chat
    bot.sendMessage(id, JSON.stringify( msg ,null,4))
})
bot.onText(/\/help (.+)/, (msg, arr)=>{
    const { id } = msg.chat 
    bot.sendMessage(id, JSON.stringify( arr ,null,4))
    let [sourse, match] = arr
    bot.sendMessage(id, JSON.stringify( match ,null,4))
})
*/

/*
ms = [
    ["Сброс цветов",     "[m"           ,"0"],
    ["Тёмно-красный",    "[31m", "[41m" ,"1"],
    ["Тёмно-зелёный",    "[32m", "[42m" ,"2"],
    ["Тёмно-жёлтый",     "[33m", "[43m" ,"3"],
    ["Тёмно-синий",      "[34m", "[44m" ,"4"],
    ["Темно-пурпурный",  "[35m", "[45m" ,"5"],
    ["Тёмно-голубой",    "[36m", "[46m" ,"6"],
    ["Красный",          "[91m", "[101m","7"],
    ["Зелёный",          "[92m", "[101m","8"],
    ["Оранжевый",        "[93m", "[103m","9"],
    ["Синий",            "[94m", "[104m","10"],
    ["Пурпурный",        "[95m", "[105m","11"],
    ["Голубой",          "[96m", "[106m","12"],
    ["Светло-серый",     "[37m", "[47m" ,"13"],
    ["Тёмно-серый",      "[90m", "[100m","14"],
    ["Стандартный",      "[39m", "[49m" ,"15"],
    ["Чёрный",           "[30m", "[40m" ,"16"],
    ["Белый",            "[97m", "[107m","17"]
]



/*
    1114968208_Дмитрий
    1284012688_E
    1289881590_малой
    2037585811_stsmena
    5103512735_Bot
    5131265599_Тим
    5239919290_Людмила
    5861082944_Dispet4er
    5284561048_Марина
*/

/*
    c(`
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getUpdates
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getMe
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/sendMessage?chat_id=2037585811&text=test
    `)
*/

/*
    try { ... }catch(error) { ... }

    bot.setMyCommands([{command:"start", description:"Старт"}])
    bot.on("message", async function(msg){ ... })
    bot.on("callback_query", async function(query){  })
    bot.onText(/txt/gi, async function(msg){ ... }) 
    bot.getMe().then(v=>{c( `Бот ${v.username} в работе ...\nOS: ${process.platform}` )})
    bot.getMyCommands().then(v=>{c(v)})
    bot.getWebHookInfo().then(v=>{c(v)})
    bot.getChat("5131265599").then(v=>{c(v)})
    bot.getUpdates().then(v=>{c(v)})

    txt = `<tg-spoiler>TEKCT</tg-spoiler>\n<b><i><s><u>TEKCT</u></s></i></b>\n<a href="https://nbvtim.github.io/work/">TEKCT</a>\n<a href="tg://user?id=2037585811">TEKCT</a>\n<code>KOD</code>\n<pre>KOD</pre>`
    let message = bot.sendMessage(5131265599, txt, { // в переменную message возвратится msg объект
        parse_mode:"HTML",
        reply_markup:{
            inline_keyboard:[
                [{text:"txt", callback_data: "txt"}]]}})
    
    const s1 =  await bot.sendMessage(id, `Сообщение 1`)
    const s2 =  await bot.sendMessage(id, `Сообщение 2`)
                await bot.sendMessage(id, `Сообщение 3`)
    setTimeout( async function(){
            await bot.editMessageText   ("Изменено !!!",{chat_id: s1.chat.id, message_id: s1.message_id})
            await bot.deleteMessage     (s2.chat.id, s2.message_id)
        },2000)
*/

/* ----------------------------------------- spawn ----------------------------------------------
// ----------------------------------------------------------------------------------------------

        const curl = spawn("curl",["https://raw.githubusercontent.com/nbvtim/tg/main/nbv.js"])
        let fulldata = ""
        let counter = 0
        curl.stderr.on("data", data=>{
            // c(`Stderr: ${data}`)
        })
        curl.stdout.on("data", data=>{
            fulldata += data
            counter += 1
            // c(`Stdout ${counter}: ${data.length}`)
        })
        curl.stdout.on("end", ()=>{
            c(`End: fulldata = ${fulldata.length}, counter = ${counter}`)
            // c(fulldata)
        })
        curl.on("close", code=>{
            // c(`\nClose: ${code}`)
        })

*/


/* -------------------------------------- TREMUX API --------------------------------------------
// ----------------------------------------------------------------------------------------------

// Батарея
        // const termux_battery_status = SP("termux-battery-status")
        // termux_battery_status.stdout.on("data", data=>{
        //     bot.sendMessage(id, `Заряд батареи ${JSON.parse(data).percentage}%`)
        // })

// Камеры
// -c camera-id Идентификатор используемой камеры (см. termux-camera-info), по умолчанию: 0
        // const termux_camera_info = SP("termux-camera-info")
        // termux_camera_info.stdout.on("data", data=>{
        //     bot.sendMessage(id, `Инфо камер:\n${data}`)
        // })
        // const termux_camera_photo_0 = SP("termux-camera-photo",["-c 0", `${__dirname}/../storage/downloads/0.jpeg`])
        // termux_camera_photo_0.on("close", code=>{
        //     bot.sendPhoto(id,`${__dirname}/../storage/downloads/0.jpeg`)
        // })
        // const termux_camera_photo_1 = SP("termux-camera-photo",["-c 1", `${__dirname}/../storage/downloads/1.jpeg`])
        // termux_camera_photo_1.on("close", code=>{
        //     bot.sendPhoto(id,`${__dirname}/../storage/downloads/1.jpeg`)
        // })

// termux-brightness [0 - 255] - яркость
        // const termux_brightness_0 = SP("termux-brightness",[0])
        // termux_brightness_0.on("close", data=>{
        //     bot.sendMessage(id, `яркость: 0`)
        // })
        // const termux_brightness_255 = SP("termux-brightness",["120"])
        // termux_brightness_255.on("close", data=>{
        //     bot.sendMessage(id, `яркость: 120`)
        // })

// termux-call-log - журнал вызовов
// -l предельное смещение в списке журнала вызовов (по умолчанию: 10) 
// -o смещение смещения в списке журнала вызовов (по умолчанию: 0)
        // const termux_call_log = SP("termux-call-log")
        // termux_call_log.stdout.on("data", data=>{
        //     bot.sendMessage(id, `Вызовы:\n${data}`)
        // })

// Буфер обмена
// termux-clipboard-set "hello world"
// cat file.txt | termux-clipboard-set
        // const termux_clipboard_set = SP("termux-clipboard-set", ["jsldjflsdfhsdfhklskdjf"])
        // termux_clipboard_set.on("close", data=>{
        //     bot.sendMessage(id, "Записано в буфер")
        // })
        // const termux_clipboard_get = SP("termux-clipboard-get")
        // termux_clipboard_get.stdout.on("data", data=>{
        //     bot.sendMessage(id, `Содержимое буфера:\n${data}`)
        // })

// termux-contact-list
        // const termux_contact_list = SP("termux-contact-list")
        // let fulldata = ""
        // let counter = 0
        // termux_contact_list.stderr.on("data", data=>{
        //     // c(`Stderr: ${data}`)
        // })
        // termux_contact_list.stdout.on("data", data=>{
        //     fulldata += data
        //     counter += 1
        //     bot.sendMessage(id,`<pre>Stdout ${counter}: ${data.length}</pre>`, {parse_mode:"HTML"})
        // })
        // termux_contact_list.stdout.on("end", ()=>{
        //     bot.sendMessage(id,`<pre>End: fulldata=${fulldata.length} counter=${counter}</pre>`, {parse_mode:"HTML"})
        //     if(fulldata.length < 4000){
        //         bot.sendMessage(id,`${fulldata}`, {parse_mode:"HTML"})
        //     }else{
        //         bot.sendMessage(id,`Слишком много данных`, {parse_mode:"HTML"})
        //         c(fulldata)
        //     }
        // })
        // termux_contact_list.on("close", code=>{
        //     bot.sendMessage(id,`<pre>Close: ${code}</pre>`, {parse_mode:"HTML"})
        // })

// _____________________ Разобраться ______________________

// termux-dialog
// -l, list Вывести список всех виджетов и их опций
// -t, заголовок Установить заголовок диалога ввода (необязательно)
// Подтвердить — показать диалоговое окно подтверждения.
//     [-i намек] текстовая подсказка (необязательно)
//     [-t title] установить заголовок диалога (необязательно)
// флажок — выберите несколько значений с помощью флажков.
//     [-v ",,,"] используемые значения разделителей-запятых (обязательно)
//     [-t title] установить заголовок диалога (необязательно)
// счетчик — выберите число в указанном диапазоне.
//     [-r min,max,start] разделитель-запятая (3) используемых чисел (необязательно)
//     [-t title] установить заголовок диалога (необязательно)
// дата – выберите дату
//     [-t title] установить заголовок диалога (необязательно)
//     [-d "дд-ММ-гггг к:м:с"] Шаблон SimpleDateFormat для вывода виджета даты (необязательно)
// радио — выберите одно значение из переключателей.
//     [-v ",,,"] используемые значения разделителей-запятых (обязательно)
//     [-t title] установить заголовок диалога (необязательно)
// лист — выберите значение из скользящего нижнего листа.
//     [-v ",,,"] используемые значения разделителей-запятых (обязательно)
//     [-t title] установить заголовок диалога (необязательно)
// spinner — выберите одно значение из раскрывающегося списка.
//     [-v ",,,"] используемые значения разделителей-запятых (обязательно)
//     [-t title] установить заголовок диалога (необязательно)
// речь — получение речи с помощью микрофона устройства.
//     [-i намек] текстовая подсказка (необязательно)
//     [-t title] установить заголовок диалога (необязательно)
// text — Введите текст (по умолчанию, если виджет не указан)
//     [-i намек] текстовая подсказка (необязательно)
//     [-m] несколько строк вместо одной (необязательно)*
//     [-n] введите цифры (необязательно)*
//     [-p] введите пароль (необязательно)
//     [-t title] установить заголовок диалога (необязательно)
//        * нельзя использовать [-m] с [-n]
// время — выберите значение времени.
//     [-t title] установить заголовок диалога (необязательно)
        // const termux_dialog = SP("termux-dialog", ["-l"])
        // termux_dialog.stdout.on("data", data=>{
        //     c( `${data}`)
        // })

// termux-download
// -d описание описание уведомления о запросе на загрузку
// -t заголовок уведомления о запросе на загрузку
// -p путь путь для сохранения загруженного файла
    // const termux_download = SP("termux-download", ["-d описание уведомления", "-t заголовок уведомления", "-p ./", "https://web.telegram.org/k/#@lydi_sochi"])
    // termux_download.on("close", code=>{c(code)})

*/