const nbv = {
    file:       function () {},
    fileUser:   function () {}
}
/*
    5131265599 - Тим
    5239919290 - Люда
    2037585811 - 15
    5861082944 - диспетчер
    5284561048 - Марина
*/

/*
    bot.sendMessage("msg.chat.id", "TEKCT", {parse_mode:"HTML"})
    <tg-spoiler><b><i><s><u>TEKCT</u></s></i></b></tg-spoiler>
    <a href="https://nbvtim.github.io/work/">TEKCT</a>
    <a href="tg://user?id=2037585811">TEKCT</a>
    <code>KOD</code>
    <pre>KOD</pre>
*/

/*
    c(`
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getUpdates
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/getMe
        https://api.telegram.org/bot5965701331:AAG21HoAObaJtCGqB-KeVNx1hlabD8e8TB8/sendMessage?chat_id=2037585811&text=test
    `)
*/

/*
    bot.onText(/\/txt/, async function(msg){

        await bot.sendMessage(msg.chat.id, "<b>Добро пожаловать</b>", {parse_mode:"HTML"})

        bot.sendMessage(msg.chat.id, "КЛАВИАТУРА", {reply_markup: {inline_keyboard: 
                [
                    [{text:"очистить\nисторию", callback_data: "clear"}],
                    [{text:"удалить\nфайл", callback_data: "dell"}]
                ]
            }
        })

    })

    bot.on("callback_query", async function(query){
        id = query.message.chat.id
        txt = JSON.stringify(query.data)
        
        await bot.sendMessage(id, `<i>${query.data}</i>\n\n<pre>${txt}</pre>\n`, {
            parse_mode:"HTML",
            reply_markup: {inline_keyboard: [inlineKeyboard]}
        })
    })
*/

function c(txt){
    if(typeof txt == "string"){
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
        t = ""
        for(i in txt){
            m = Math.floor(Math.random()*18)
            t += "\033" + ms[m][1] + txt[i] + "\033" + ms[0][1]
        }
        console.log( t )
    }else{
        console.log( txt )
    }
}

module.exports = c