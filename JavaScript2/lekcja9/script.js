let linie = {
    ctx: document.getElementById("linie").getContext("2d"),
    start: function () {
        setInterval(() => {
            this.rysuj();
        }, 10)
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
    ctx: document.getElementById("kolka").getContext("2d"),
    start: function () {
        let x, y
        document.getElementById("kolka").addEventListener("mousemove", (e) => {
            x = (e.clientX) - ((window.innerWidth - 400) / 2)
            y = e.clientY - 400
        })
        setInterval(() => {
            this.rysuj(x, y);
        }, 10)
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

let dolarek = {
    canvas: document.getElementById("dolar"),
    ctx: document.getElementById("dolar").getContext("2d"),
    x: Math.random() * 370,
    y: Math.random() * 340,
    angle: Math.random() * 360,
    speed: 5,
    start: function () {
        setInterval(() => {
            this.rysuj();
        }, 10)
    },
    rysuj: function () {
        this.ctx.clearRect(0, 0, 400, 400)
        let img = new Image()
        img.src = './dollar.jpg'
        this.ctx.drawImage(img, this.x, this.y, 30, 60);
        this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
        this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
        if (this.x + 30 > 400 || this.x < 0) {
            this.angle = 180 - this.angle;
        }
        if (this.y > 400 - 60 || this.y < 0) {
            this.angle = 360 - this.angle;
        }
    }
}
dolarek.start()

function random_hex(count) {
    let hex = "#";
    for (let i = 0; i < count; i++) {
        hex += Math.floor(Math.random() * 16).toString(16)
    }
    return hex
}