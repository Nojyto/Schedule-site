const timeOptions = {hour: "numeric", minute: "numeric", second: "numeric", hour12: false}
const text        = document.getElementById("text")
const curTime     = document.getElementById("curTime")
const curSec      = document.getElementById("curSec")
const timetable   = [
    {s : "07:10:00", e : "07:55:00", i : 0},
    {s : "08:00:00", e : "08:45:00", i : 1},
    {s : "08:55:00", e : "09:40:00", i : 2},
    {s : "09:50:00", e : "10:35:00", i : 3},
    {s : "11:05:00", e : "11:50:00", i : 4},
    {s : "12:10:00", e : "12:55:00", i : 5},
    {s : "13:05:00", e : "13:50:00", i : 6},
    {s : "13:55:00", e : "14:40:00", i : 7},
    {s : "14:45:00", e : "15:30:00", i : 8},
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
                break
            }
            if(d < curEv.e){
                let curDate       = (SecToHMS(HMSToSec(curEv.e) - HMSToSec(d))).split(":")
                text.innerHTML    = `${curEv.i} pamoka baigias už`
                curTime.innerHTML = `${curDate[0]}∶${curDate[1]}∶`
                curSec.innerHTML  = `${curDate[2]}`
                break
                /*if(HMSToSec(curEv.e) - HMSToSec(d) == 5 * 60){
                    const endOfReminder = new Notification("5 min ligi pamokos pabaigos", {icon: "dependencies/clock.png"})
                    greeting.onclick = () => window.open(window.location.href)
                }*/
            }
        }
    }
}

/*window.onload = () => {
    //test
    const d = new Date()
    updateTime(new Date(d.getFullYear(), d.getMonth(), d.getDay() - 3, d.getHours(), d.getMinutes() +32, d.getSeconds()).toLocaleTimeString("en-US", timeOptions), 3)
    ScrollReveal().reveal(".hero", {distance: '60px', duration: 1500, delay: 150,})
    window.setInterval(() => {
        const d = new Date()
        updateTime(new Date(d.getFullYear(), d.getMonth(), d.getDay() - 3, d.getHours(), d.getMinutes() + 32, d.getSeconds()).toLocaleTimeString("en-US", timeOptions), 3)
    }, 1000)
}*/

window.onload = async () => {
    //await Notification.requestPermission()
    updateTime(new Date().toLocaleTimeString("en-US", timeOptions), new Date().getDay())
    ScrollReveal().reveal(".hero", {distance: '60px', duration: 1500, delay: 150,})
    window.setInterval(() => {
        updateTime(new Date().toLocaleTimeString("en-US", timeOptions), new Date().getDay())
    }, 1000)
}

