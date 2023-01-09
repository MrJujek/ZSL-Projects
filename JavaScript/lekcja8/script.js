var c1 = document.getElementById("linie");
var ctx1 = c1.getContext("2d");
setInterval(() => {
    console.log("interval");
    let x = Math.floor(Math.random() * 400)
    let y = Math.floor(Math.random() * 400)
    ctx1.beginPath();
    ctx1.strokeStyle = random_hex(6)
    ctx1.moveTo(200, 200);
    ctx1.lineTo(x, y);
    ctx1.closePath();
    ctx1.stroke();
}, 100)

var c2 = document.getElementById("kolka");
var ctx2 = c2.getContext("2d");
let x
let y
c2.addEventListener("mousemove", (e) => {
    x = (e.clientX) - ((window.innerWidth - 400) / 2)
    y = e.clientY - 400
})

setInterval(() => {
    let start = Math.random() * 6
    ctx2.strokeStyle = "rgba(255,0,0,0.5)"
    ctx2.beginPath();
    ctx2.arc(x, y, 50, start, start + Math.PI / 4);
    ctx2.stroke();
    ctx2.closePath();
}, 10)



function random_hex(count) {
    let hex = "#";
    for (let i = 0; i < count; i++) {
        hex += Math.floor(Math.random() * 15).toString(16)
    }
    return hex
}