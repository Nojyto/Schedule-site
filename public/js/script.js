const timeOptions = {hour: "numeric", minute: "numeric", second: "numeric", hour12: false}
const text        = document.getElementById("text")
const curTime     = document.getElementById("curTime")
const curSec      = document.getElementById("curSec")
const table       = document.getElementById("table")
const dropper     = document.getElementById("dropper")
const timetable   = [
    {s : "07:10:00", e : "07:55:00", i : 0, Pir : "Fizika (M)",   Ant : "",              Tre : "",             Ket : "",              Pen : ""           },
    {s : "08:00:00", e : "08:45:00", i : 1, Pir : "Fizika",       Ant : "",              Tre : "",             Ket : "Programavimas", Pen : ""           },
    {s : "08:55:00", e : "09:40:00", i : 2, Pir : "Fizika",       Ant : "",              Tre : "",             Ket : "Programavimas", Pen : "Geografija" },
    {s : "09:50:00", e : "10:35:00", i : 3, Pir : "Anglų k.",     Ant : "Matematika",    Tre : "Tikyba",       Ket : "Lietuvių k.",   Pen : "Geografija" },
    {s : "11:05:00", e : "11:50:00", i : 4, Pir : "Matematika",   Ant : "Technologijos", Tre : "Matematika",   Ket : "Lietuvių k.",   Pen : "Lietuvių k."},
    {s : "12:10:00", e : "12:55:00", i : 5, Pir : "Kūno kultūra", Ant : "Anglų k.",      Tre : "Kūno kultūra", Ket : "Technologijos", Pen : "Lietuvių k."},
    {s : "13:05:00", e : "13:50:00", i : 6, Pir : "Anglų k.",     Ant : "Anglų k.",      Tre : "Lietuvių k.",  Ket : "Anglų k.",      Pen : "Matematika" },
    {s : "13:55:00", e : "14:40:00", i : 7, Pir : "Matematika",   Ant : "Matematika",    Tre : "Lietuvių k.",  Ket : "Braižyba",      Pen : "Fizika"     },
    {s : "14:45:00", e : "15:30:00", i : 8, Pir : "",             Ant : "Geografija",    Tre : "",             Ket : "",              Pen : "Fizika"     },
]

function HMSToSec(s) {
    let b = s.split(':')
    return b[0]*3600 + b[1]*60 + (+b[2] || 0)
}

function SecToHMS(s) {
    function z(n){return (n<10?'0':'') + n}
    let sign = s < 0? '-':''
    s = Math.abs(s)
    return sign + z(s/3600 |0) + ':' + z((s%3600) / 60 |0) + ':' + z(s%60)
}

function updateTime(d, wd){
    //console.log(d, wd)

    for(let i = 0; i <= 8; i++){
        document.getElementById(`les${i}`).className = ""
    }

    if((timetable[8].e < d && wd == 5) || wd == 6 || wd == 0){
        text.innerHTML    = "Savaitgalis"
        curTime.innerHTML = ""
        curSec.innerHTML  = ""
    }else if(timetable[8].e < d){
        text.innerHTML    = "Šulė baigės"
        curTime.innerHTML = ""
        curSec.innerHTML  = ""
    }else{
        for(const curEv of timetable){
            if(d < curEv.s){
                let curDate       = (SecToHMS(HMSToSec(curEv.s) - HMSToSec(d))).split(":")
                text.innerHTML    = `${curEv.i} pamoka prasideda už`
                curTime.innerHTML = `${curDate[0]}∶${curDate[1]}∶`
                curSec.innerHTML  = `${curDate[2]}`
                document.getElementById(`les${curEv.i}`).classList.add("next")
                break
            }
            if(d < curEv.e){
                let curDate       = (SecToHMS(HMSToSec(curEv.e) - HMSToSec(d))).split(":")
                text.innerHTML    = `${curEv.i} pamoka baigias už`
                curTime.innerHTML = `${curDate[0]}∶${curDate[1]}∶`
                curSec.innerHTML  = `${curDate[2]}`
                document.getElementById(`les${curEv.i}`).classList.add("cur")
                break
            }
        }
    }
}

function updateTable(wd){
    const getDay = (w) => {
        switch(w){
            case 0:  return "Pirmadienis"
            case 1:  return "Pirmadienis"
            case 2:  return "Antradienis"
            case 3:  return "Trečiadienis"
            case 4:  return "Ketvirtadienis"
            case 5:  return "Penktadienis"
            case 6:  return "Pirmadienis"
            default: return "error"
        }
    }
    const weekDay = getDay(wd)
    document.getElementById("weekDay").innerHTML = weekDay

    for(let i = 0; i <= 8; i++){
        document.getElementById(`lesName${i}`).innerHTML = timetable[i][`${weekDay.substring(0, 3)}`]
    }
}

function dropTimeTable() {
    if(dropper.checked)
        table.classList.remove("hideEl")
    else               
        table.classList.add("hideEl")
}

window.onload = async () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    //let d = new Date()
    //const curDate = new Date(d.getFullYear(), d.getMonth(), d.getDay() - 3, d.getHours() - 4, d.getMinutes(), d.getSeconds())
    const curDate = new Date()
    updateTime(curDate.toLocaleTimeString("en-US", timeOptions), curDate.getDay())
    
    ScrollReveal().reveal(".hero", {distance: '60px', duration: 1500, delay: 150,})
    updateTable(curDate.getDay() + ((curDate.getHours() >= 16) ? 1 : 0))

    window.setInterval(() => {
        updateTime(curDate.toLocaleTimeString("en-US", timeOptions), curDate.getDay())
        curDate.setSeconds(curDate.getSeconds() + 1)
    }, 1000)
}