
// "6997016766:AAGEyqHbedZPqMT060glZYweCgKDkrBVC_w"         - ntbabot
// "6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E"         - brsvcbot
const c             = console.log
const xlsx          = require('node-xlsx')
const appExpress    = require("express")()
const fs            = require('fs')
const cp            = require('child_process')
const TelegramApi   = require('node-telegram-bot-api')
const bot           = new TelegramApi ("6608143923:AAExMM5ymFM3A7DA0oDGX-Ko8lGXOOH9g3E", {polling: true})


// bot.deleteMyCommands()
bot.setMyCommands([
    {command:"start",       description:"Старт"},
    {command:"auto",        description:"Автотранспорнт"},
    {command:"key",         description:"Ключи"},
    {command:"zp",          description:"Зарплата"},
    {command:"settings",    description:"Настройки"},
    // {command:"help",        description:"Помощь"}
])

// bot.getMyCommands().then(   (t) =>  {       })
// bot.getMe().then(           (t) =>  {   c(t)    })
// bot.on("polling_error", err=>c("err"))

const nbv = {
    
    search:     function(list, txt){
        pathXLSX = "/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx"
        if(!this.xlsx){

            if(fs.existsSync(pathXLSX)){
                let myXLSX = []
                xlsx.parse("/mnt/c/Users/User/Desktop/ДОКУМЕНТЫ/1 смена СВК/ОПИСИ/all.xlsx").worksheets.forEach((el, i) => {
                    myXLSX.push({name: el.name, data: []})
                    el.data.forEach(ell=>{
                        m = []
                        ell.forEach(elll=>{
                            if(!elll.value){
                                m.push("")
                            }
                            if(elll.value){
                                m.push(elll.value)
                            }
                        })
                        myXLSX[i].data.push(m)
                    })
                })
                this.xlsx = myXLSX
                
                fs.writeFileSync(`${__dirname}/data`, JSON.stringify(this.xlsx, null))
            }else{
                this.xlsx = JSON.parse(fs.readFileSync(`${__dirname}/data`, "utf8"))
            }

            this.xlsx.forEach(el=>{
                if(el.name === "users"){
                    el.data.forEach(ell=>{
                        if(ell[0]){
                            this[ell[0]] = {xlsx: ell, access: true}
                        }
                    })
                }
            })
        }

        out = []
        this.xlsx.forEach(el=>{
            if(el.name === list){
                if(txt){
                    step = 0
                    el.data.forEach(ell=>{
                        newel = []
                        ell.forEach(elll=>{
                            if(elll && elll !== "" && elll !== " "){
                                newel.push(elll)
                            }
                        })
                        try {   // + ? \ * ( ) [  -  для RegExp ошибка
                            if(     ell.join(" ").match(RegExp(txt,"i")     )  && step < 5){   out.push(newel); step++}
                        } catch (err) {
                            positions = []
                            txt = txt.split('')
                            txt.forEach((el, i)=>{
                                try {
                                    RegExp(el)
                                } catch (error) {
                                    txt[i] = "\\"+txt[i]
                                }
                            })
                            txt = txt.join("")
                            if(ell.join(" ").match(RegExp(       txt,"i"))  && step < 5){   out.push(newel); step++}
                        }
                    })
                }else{
                    out = el.data
                }
            }
        })
        return out
    },

    calcSmens:  function (){
        // --------------------------------------------------------------------------------------------
        // РАСЧЕТ РАБОЧИХ СМЕН В МЕСЯЦЕ ПОСМЕННО 
        // let daysInMounth = 32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate()
        now = new Date()
        now.setUTCHours(now.getHours())
        if(now.getDate() < 16){n = 1}else{n = 0}
        now.setMonth(now.getMonth() - n) // установка месяца
        const holiday = [
            new Date(now.getFullYear(), 2 -1, 23, 0 +3),        // 23 Февраля
            new Date(now.getFullYear(), 3 -1, 8,  0 +3),        // 8 Марта
            new Date(now.getFullYear(), 5 -1, 1,  0 +3),        // 1 мая
            new Date(now.getFullYear(), 5 -1, 9,  0 +3),        // 9 мая
            new Date(now.getFullYear(), 6 -1, 12, 0 +3),        // День России
        ]
        const start_date = [
            new Date("2024-01-02T08:00:00.000Z"),   // смена 1 день
            new Date("2024-01-03T20:00:00.000Z"),   // смена 1 ночь
            new Date("2024-01-03T08:00:00.000Z"),   // смена 2 день
            new Date("2024-01-04T20:00:00.000Z"),   // смена 2 ночь
            new Date("2024-01-04T08:00:00.000Z"),   // смена 3 день
            new Date("2024-01-05T20:00:00.000Z"),   // смена 3 ночь
            new Date("2024-01-05T08:00:00.000Z"),   // смена 4 день
            new Date("2024-01-06T20:00:00.000Z")    // смена 4 ночь
        ]
    
        const mass = []
        for(i in start_date){
            while (now.getMonth() != start_date[i].getMonth()) {
                start_date[i].setDate(start_date[i].getDate() + 4)
            }
    
            arr = []
            while (now.getMonth() == start_date[i].getMonth()) {
                arr.push(new Date(start_date[i]))
                start_date[i].setDate(start_date[i].getDate() + 4)
            }
            mass.push(arr)
        }
    
        const obj_smens = {
            smena_1:{day:mass[0], night:mass[1], holiday:[]},
            smena_2:{day:mass[2], night:mass[3], holiday:[]},
            smena_3:{day:mass[4], night:mass[5], holiday:[]},
            smena_4:{day:mass[6], night:mass[7], holiday:[]},
        }
    
        // добавление праздничных
        for(i in obj_smens){ 
            for(j in obj_smens[i]){
                obj_smens[i][j].forEach(elem=>{
                    if(j !== "holiday"){
                        holiday.forEach(el => {
                            if(elem.getMonth() === el.getMonth() && elem.getDate() === el.getDate()){
                                obj_smens[i].holiday.push(elem)
                            }
                        })
                    }
                })
            }
        }
    
        return obj_smens
    
        // 16 смен * 11 часов = 176 - закрывают в месяц если без прогулов
        // ночные 7 часов  23:00 - 06:00         20%
        // праздничные     00:00 - 23:59         
        // летние = 7% от 
        // 54000       за 16 смен
        // 45000       за 16 смен
        // питание 32.5 за час
        
    },

}

// --------------------------------------------------------------------------------------------
// БОТ ОЖИДАЕТ ВВОДА ОТ ПОЛЬЗОВАТЕЛЯ
// --------------------------------------------------------------------------------------------
bot.on("message", async msg=>{ 
    
    fs.appendFileSync   (`${__dirname}/log`, `\n${msg.chat.id}_${msg.from.first_name}: ${msg.text}`)
    if(!nbv[msg.chat.id]){nbv.search()}
    
// Если пользователь есть в базе то бот будет работать
    if(nbv[msg.chat.id].access){ 
        if(msg.entities){   nbv[msg.chat.id].command = msg.text     }
        if(!nbv[msg.chat.id].command){   bot.sendMessage(msg.chat.id, `Выберите пункт меню`)   }

        // /start
        if(nbv[msg.chat.id].command === "/start"){
            if(msg.text === "/start") {
                bot.getMyCommands().then(   (t) =>  {
                    txt=""
                    t.forEach(el=>{
                        txt += `/${el.command} - ${el.description}\n`
                    })
                    bot.sendMessage(msg.chat.id,  txt, {reply_markup:{remove_keyboard:true}})
                })
            }else{
                bot.sendMessage(msg.chat.id, `Выберите пункт меню`)
            }
        }

        // Поиск по автотранспорту
        if(nbv[msg.chat.id].command === "/auto"){
            if(msg.text === "/auto") {
                bot.sendMessage(    msg.chat.id, `Режим поиска по автотранспорту`   )
            }else{
                search = nbv.search("АТ", msg.text)
                if(search.length === 0){    bot.sendMessage(    msg.chat.id, `По запросу "${msg.text}" совпадений не найдено`   )   }
                if(search.length >   0){
                    search.forEach(el=>{
                        bot.sendMessage(    msg.chat.id, JSON.stringify(el,null,4)   )
                    })
                }
            }
        }

        // Поиск по ключам
        if(nbv[msg.chat.id].command === "/key"){
            if(msg.text === "/key") {
                bot.sendMessage(    msg.chat.id, `Режим поиска по ключам`   )
            }else{
                search = nbv.search("Ключи", msg.text)
                if(search.length === 0){    bot.sendMessage(    msg.chat.id, `По запросу "${msg.text}" совпадений не найдено`   )   }
                if(search.length >   0){
                    search.forEach(el=>{
                        bot.sendMessage(    msg.chat.id, JSON.stringify(el,null,4)   )
                    })
                }
            }
        }
                
        // Расчет з/п
        if(nbv[msg.chat.id].command === "/zp"){
            if(msg.text === "/zp") {
                bot.sendMessage(msg.chat.id, `- сумма оклада (нужно разделить на 1000) \n- количество смен в месяце (если отработаны все смены вводим 16 даже если по графику в месяце 15 смен)\n- количество фактически отработанных ночных смен\n- количество праздничных часов\n\nПример: <i>45 16 8 0</i>`, {
                    parse_mode: "HTML"
                    // reply_markup:{
                    //     keyboard:[
                    //         [{text: "45 16 8 0"}, {text: "54 16 8 0"}],
                    //         [{text: "45 15 8 0"}, {text: "54 15 8 0"}],
                    //         [{text: "45 15 7 0"}, {text: "54 15 7 0"}],
                    //     ],
                    //     input_field_placeholder:"Быстрый ввод", 
                    //     // resize_keyboard: true,
                    //     // remove_keyboard: true,
                    //     // one_time_keyboard: true
                    //     // force_reply: true
                    // }

                })

            }else{

                msgtextMass     =  msg.text.split(" ")
                oklad           = +msgtextMass[0]*1000
                allSmens        = +msgtextMass[1]
                nightSmens      = +msgtextMass[2]
                holiHours       = +msgtextMass[3]
            
                rubOneHour      = oklad / 176
                rubOneDay       = oklad / 16
                rubOneNight     = rubOneDay + rubOneHour * 7 * 0.2

                kviplate        = rubOneDay*allSmens
                night           = nightSmens*rubOneHour*7*0.2
                letnie          = kviplate*.07
                holiday         = holiHours*rubOneHour
                result          = kviplate      +       night      +       holiday        +       letnie

                bot.sendMessage(msg.chat.id, JSON.stringify({
                    "оклад":                    Math.round(oklad        * 100) / 100,
                    "оплата за 1 час":          Math.round(rubOneHour   * 100) / 100,
                    "оплата за 1 день":         Math.round(rubOneDay    * 100) / 100,
                    "оплата за 1 ночь":         Math.round(rubOneNight  * 100) / 100,
                    "закрыто часов д / н":      `${allSmens*11} / ${nightSmens*7}`,
                    "к выплате":                Math.round(kviplate     * 100) / 100,
                    "ночные":                   Math.round(night        * 100) / 100,
                    "доплата (летние)":         Math.round(letnie       * 100) / 100,
                    "доплата (праздничные)":    Math.round(holiday      * 100) / 100,
                    "итого":                    Math.round(result       * 100) / 100,
                }, null, 4))

            }
            
        }

        // Мои настройки
        if(nbv[msg.chat.id].command === "/settings"){

            if(msg.chat.id === 5131265599){
                bot.sendMessage(msg.chat.id, `<b> 🛠     НАСТРОЙКИ     🛠 </b>`, {
                    parse_mode: "HTML",
                    remove_keyboard: true,
                    reply_markup:{ 
                        inline_keyboard:[
                            // [{text: "tmate старт",          callback_data:   "t"},          {text: "tmate стоп", callback_data: "pkill tmate"}],
                            [{text: "Показать log",         callback_data:   "log"}]
                        ]
                    }
                })
            }
        
            await bot.sendMessage(msg.chat.id, JSON.stringify(    nbv[msg.chat.id], null, 4)      )

        }

        
        
    }

// Если пользователя нет в базе то бот будет предлагать регистрацию
    if(!nbv[msg.chat.id].access){
        fs.appendFileSync(`${__dirname}/*${msg.chat.id}`, msg.text)
        bot.sendMessage(msg.chat.id, `Для предоставления доступа необходимо ввести\n"Фамилия", "Имя", "Отчечтво", "Номер телефона", "Дата рождения"`)
    }


})



// --------------------------------------------------------------------------------------------
// БОТ ОБРАБАТЫВАЕТ ЗАПРОСЫ С КЛАВИАТУРЫ 
// --------------------------------------------------------------------------------------------
bot.on("callback_query", query=>{ 
    // c(query)
    if(query.data === "t"){ 
        cp.exec("tmate -k tmk-B9DVq6DFEkpcOQKWDwSDccfJRL -n pc -F")
        bot.sendMessage(query.from.id, `Сессия доступна по этой <a href="https://tmate.io/t/nbv/pc">ССЫЛКЕ</a>`, {parse_mode:"HTML"})
    }
    if(query.data === "pkill tmate"){
        cp.spawnSync('pkill', ['tmate'])
        bot.sendMessage(query.from.id, "Сессия tmate остановлена")
    }
    if(query.data === "log"){  // Текст отправляемого сообщения, 1-4096 символов после разбора сущностей
        txt = fs.readFileSync("./log", "utf8")
        if(txt.length < 4096){
            bot.sendMessage(query.from.id, txt, {
                link_preview_options: {is_disabled: true}//   -    не работает !!!!     
            })
        }else{
            bot.sendMessage(query.from.id, txt.length, {parse_mode:"HTML"})
        }
        
    }

})





// --------------------------------------------------------------------------------------------
// EXPRESS доработать !!!!
// --------------------------------------------------------------------------------------------
// appExpress.get      ('/', ( req, res ) =>               {   res.send(`EXPRESS START...<br><pre>${JSON.stringify( xlsx , null, 5)}</pre>`)     })
// appExpress.listen   (65535, "127.255.255.254", () =>    {   
//     c(`\tEXPRESS LISTEN\n\thttp://127.255.255.254:65535/`)
// })