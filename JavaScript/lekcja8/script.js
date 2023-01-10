let linie = {
    canvas: document.getElementById("linie"),
    ctx: document.getElementById("linie").getContext("2d"),
    start: function () {
        setInterval(() => {
            this.rysuj();
        }, 100)
    },
    rysuj: function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = random_hex(6);
        this.ctx.moveTo(200, 200);
        this.ctx.lineTo(Math.floor(Math.random() * 400), Math.floor(Math.random() * 400));
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
linie.start()

let kolka = {
    canvas: document.getElementById("kolka"),
    ctx: document.getElementById("kolka").getContext("2d"),
    start: function () {
        let x, y
        document.getElementById("kolka").addEventListener("mousemove", (e) => {
            x = (e.clientX) - ((window.innerWidth - 400) / 2)
            y = e.clientY - 400
        })
        setInterval(() => {
            this.rysuj(x, y);
        }, 100)
    },
    rysuj: function (x, y) {
        let start = Math.random() * 6
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255,0,0,0.5)";
        this.ctx.arc(x, y, 50, start, start + Math.PI / 4);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
kolka.start()

function random_hex(count) {
    let hex = "#";
    for (let i = 0; i < count; i++) {
        hex += Math.floor(Math.random() * 15).toString(16)
    }
    return hex
}