export class NewGame {
    constructor() {
        this.ctx = document.getElementById("speedway").getContext("2d")
        this.canvasHeight = document.getElementById("speedway").height
        this.canvasWidth = document.getElementById("speedway").width
        this.grassPattern
        this.pathPattern
        this.init()
    };
    init() {
        this.makeImagesAndPatterns();
    };
    makeImagesAndPatterns() {
        let grassImg = new Image()
        grassImg.src = './img/grass.png'
        grassImg.onload = () => {
            this.grassPattern = this.ctx.createPattern(grassImg, "repeat");

            let pathImg = new Image()
            pathImg.src = './img/path.png'

            pathImg.onload = () => {
                this.pathPattern = this.ctx.createPattern(pathImg, "repeat");
                this.makeSpeedway();
            }
        };

    };
    makeSpeedway() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 5;
        this.ctx.arc(this.canvasWidth / 4 * 1, this.canvasHeight / 2, 200, Math.PI / 2, Math.PI / 2 * 3);
        this.ctx.arc(this.canvasWidth / 4 * 3, this.canvasHeight / 2, 200, Math.PI / 2 * 3, Math.PI / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.pathPattern;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 5;
        this.ctx.arc(this.canvasWidth / 4 * 1, this.canvasHeight / 2, 50, Math.PI / 2, Math.PI / 2 * 3);
        this.ctx.arc(this.canvasWidth / 4 * 3, this.canvasHeight / 2, 50, Math.PI / 2 * 3, Math.PI / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        let Player1 = new Player(1)
    }
}

export class Player {
    constructor(playerNumber) {
        this.playerColor
        this.playerMotorcycle
        this.leftKey
        this.rightKey
        this.playerColor
        this.ctx = document.getElementById("speedway").getContext("2d")

        switch (playerNumber) {
            case 1:
                this.playerX = 500
                this.playerY = 300
                this.leftKey = "ArrowLeft"
                this.rightKey = "ArrowRight"
                this.playerColor = "red"
                break;

            case 2:
                this.playerX = 100
                this.playerY = 100
                this.leftKey = "KeyA"
                this.rightKey = "KeyD"
                this.playerColor = "blue"
                break;

            case 3:
                this.playerX = 100
                this.playerY = 100
                this.leftKey = "KeyZ"
                this.rightKey = "KeyX"
                this.playerColor = "green"
                break;

            case 4:
                this.playerX = 100
                this.playerY = 100
                this.leftKey = "KeyV"
                this.rightKey = "KeyB"
                this.playerColor = "yellow"
                break;
        }

        this.init()
    }
    init() {
        this.makePlayer();
        this.movePlayer();
    }
    makePlayer() {
        this.playerMotorcycle = new Image()
        this.playerMotorcycle.src = './img/motorcycle.png'
        this.playerMotorcycle.onload = () => {
            this.ctx.drawImage(this.playerMotorcycle, this.playerX, this.playerY, 20, 50)
        }
    }
    movePlayer() {
        let alfa = 90 * Math.PI / 180, dx = 0, dy = 0, turnLeft = false, turnRight = false

        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case this.leftKey:
                    turnLeft = true
                    break;

                case this.rightKey:
                    turnRight = true
                    alfa += 15 * Math.PI / 180
                    break;
            }

            if (turnLeft) {
                alfa -= 15 * Math.PI / 180
            } else if (turnRight) {
                alfa += 15 * Math.PI / 180
            }

            if (turnLeft || turnRight) {
                dx = 2 * Math.cos(alfa)
                dy = 2 * Math.sin(alfa)
            }
        })

        document.addEventListener('keyup', () => {
            turnLeft = false
            turnRight = false
        })

        setInterval(() => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.playerColor;
            this.ctx.moveTo(this.playerX, this.playerY);

            this.playerX += dx
            this.playerY += dy

            this.ctx.lineTo(this.playerX, this.playerY);
            this.ctx.closePath();
            this.ctx.stroke();
        }, 10);
    }
}