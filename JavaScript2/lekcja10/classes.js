class NewGame {
    constructor() {
        this.ctx = document.getElementById("speedway").getContext("2d")
        this.init()
    }
    init() {
        //setInterval(() => {
        console.log("LOG");
        this.makeSpeedway();
        //}, 10)
    }
    makeSpeedway() {
        console.log(this.ctx);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#aaf";
        this.ctx.arc(200, 200, 200, Math.PI / 2, Math.PI / 2 * 3);
        this.ctx.arc(600, 200, 200, Math.PI / 2 * 3, Math.PI / 2);
        //this.ctx.lineTo(Math.floor(Math.random() * 400), Math.floor(Math.random() * 400));
        this.ctx.closePath();
        this.ctx.stroke();
    }
    // rysuj: function (x, y) {
    //     let start = Math.random() * 6
    //     this.ctx.beginPath();
    //     this.ctx.strokeStyle = "rgba(255,0,0,0.5)";
    //     this.ctx.arc(x, y, 50, start, start + Math.PI / 4);
    //     this.ctx.stroke();
    //     this.ctx.closePath();
    // }
}