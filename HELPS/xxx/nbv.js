let c = console.log
const fs = require('fs')
var AdmZip = require("adm-zip")

mdocs       = fs.readdirSync(`${__dirname}/docs`)
mresult     = fs.readdirSync(`${__dirname}/result`)

for(i in mdocs){
    w = mdocs[i]
    f = mdocs[i].match(/.\w+$/)[0]
    n = f.replace(".","")
    r = n+"_"+i+f

    fs.copyFileSync(`${__dirname}/docs/${w}`, `${__dirname}/result/${r}`)
}
/*
let zip = new AdmZip(`${__dirname}/result/Список для КПП трансп.проп. сотрудников.zip`)
let zipEntries = zip.getEntries()
//c(zipEntries[0].getData().toString("utf8"))
for(i in zipEntries){
    f = zipEntries[i].entryName.match(/document\.xml$/)
    if(f != null){

        mass = zipEntries[i].getData().toString("utf8").match(/<w:tr\s+/gim)
        //c(mass)
        
    }
    // if(zipEntries[i].entryName == zipEntries[i].entryName.match(/document.xml$/)){
    //     c(zipEntries[i].entryName)
    // }
        

}



// // reading archives
// var zip = new AdmZip(__dirname+"\\doc\\ТРАНСПОРТ ГОСТЕЙ БЕЗ ДОСМОТРА.zip");
// var zipEntries = zip.getEntries(); // an array of ZipEntry records

// zipEntries.forEach(function (zipEntry) {
//     // c(zipEntry.toString()); // outputs zip entries information
//     if (zipEntry.entryName == "word/document.xml") {
//         console.log(zipEntry.getData().toString("utf8").match(/<w:t>[^\/w:t]+/gim))
//     }
// })
*/
