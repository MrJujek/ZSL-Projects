let boardWidth, boardHeight
let snake_length = 3
let pozycja = []
let speed = 300
let appleOnBoard = false
let appleX, appleY
let makeSnakeMove = true
let start = true
let new_position
let new_x, new_y
let direction, oldDirection, oldMove
let snake_move, startPosition, hideBush

generateBoard();
createStartPosition();

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            if (oldDirection != "right") {
                direction = "left"
            }
        } else {
            if (oldDirection != "left") {
                direction = "right"
            }
        }
    } else {
        if (yDiff > 0) {
            if (oldDirection != "down") {
                direction = "up"
            }
        } else {
            if (oldDirection != "up") {
                direction = "down"
            }
        }
    }

    xDown = null;
    yDown = null;

    if (start && direction) {
        show_snake(pozycja, direction)
        start = false
    }
};

document.onkeydown = (e) => {
    switch (e.key) {
        case "d":
        case "ArrowRight":
            if (oldDirection != "left") {
                direction = "right"
            }
            break;

        case "a":
        case "ArrowLeft":
            if (oldDirection != "right") {
                direction = "left"
            }
            break;

        case "s":
        case "ArrowDown":
            if (oldDirection != "up") {
                direction = "down"
            }
            break;

        case "w":
        case "ArrowUp":
            if (oldDirection != "down") {
                direction = "up"
            }
            break;
    }

    if (start && direction) {
        show_snake(pozycja, direction)
        start = false
    }
}

function show_snake(pozycja) {
    hideBush = setTimeout(() => {
        document.getElementById(startPosition).classList.remove("krzak")
    }, 5000)

    snake_move = setInterval(() => {
        arrayChanges(direction)

        let last_snake_part
        if (pozycja.length > snake_length) {
            last_snake_part = pozycja.pop()
        }

        for (let i = 1; i < pozycja.length; i++) {
            if (new_position.x == pozycja[i].x && new_position.y == pozycja[i].y) {
                handleLoss()
                break
            }
        }

        if (makeSnakeMove) {
            console.log(speed);
            makeSnakeTail(pozycja)

            let snakeHeadPosition = "pole_x" + new_position.x + "_y" + new_position.y
            newSnakeHead(snakeHeadPosition, pozycja)

            makeSnakeSecondPart(pozycja)

            let deletedSnakePart = "pole_x" + last_snake_part.x + "_y" + last_snake_part.y
            clearTileFromSnake(deletedSnakePart)

            if (appleOnBoard == false) {
                generateApple()
            }

            newSnakeHead(snakeHeadPosition, pozycja)

            if (pozycja[0].x == appleX && pozycja[0].y == appleY) {
                let nazwa = "pole_x" + appleX + "_y" + appleY
                let element = document.getElementById(nazwa)

                element.classList.remove("japko")

                snake_length++;
                appleOnBoard = false
                if (speed > 200) {
                    speed -= 40
                }
            }
        }

        oldDirection = direction
    }, speed)
}

function arrayChanges(direction) {
    switch (direction) {
        case "up":
            if (pozycja[0].y - 1 < 0) {
                new_y = boardHeight - 1
                handleLoss()
            } else {
                new_y = pozycja[0].y - 1
            }

            new_position = { x: pozycja[0].x, y: new_y }
            pozycja.unshift(new_position)
            break;

        case "down":
            if (pozycja[0].y + 1 > boardHeight - 1) {
                new_y = 0
                handleLoss()
            } else {
                new_y = pozycja[0].y + 1
            }

            new_position = { x: pozycja[0].x, y: new_y }
            pozycja.unshift(new_position)
            break;

        case "left":
            if (pozycja[0].x - 1 < 0) {
                new_x = boardWidth - 1
                handleLoss()
            } else {
                new_x = pozycja[0].x - 1
            }

            new_position = { x: new_x, y: pozycja[0].y }
            pozycja.unshift(new_position)
            break;

        case "right":
            if (pozycja[0].x + 1 > boardWidth - 1) {
                new_x = 0
                handleLoss()
            } else {
                new_x = pozycja[0].x + 1
            }

            new_position = { x: new_x, y: pozycja[0].y }
            pozycja.unshift(new_position)
            break;
    }
}

function createStartPosition() {
    let random_x = Math.round(Math.random() * (boardWidth - 1))
    let random_y = Math.round(Math.random() * (boardHeight - 1))

    let nazwa = "pole_x" + random_x + "_y" + random_y
    startPosition = nazwa
    let element = document.getElementById(nazwa)
    element.classList.add("krzak")

    pozycja.push({ x: random_x, y: random_y })
}

function generateBoard() {
    boardWidth = document.getElementById("wielkosc").value
    boardHeight = boardWidth
    let isBoardSizeOk = true

    if (window.innerWidth - 20 < boardWidth * 30) {
        boardWidth = Math.floor((window.innerWidth - 20) / 30)
        isBoardSizeOk = false
    }
    if (window.innerHeight - 110 < boardHeight * 30) {
        boardHeight = Math.floor((window.innerHeight - 110) / 30)
        isBoardSizeOk = false
    }
    if (!isBoardSizeOk) {
        changeBoardSize()
    }

    let plansza = document.createElement("div")
    plansza.setAttribute("id", "plansza")
    plansza.style.width = boardWidth * 30 + "px"
    plansza.style.height = boardHeight * 30 + "px"
    plansza.style.position = "relative"

    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            let pole = document.createElement("div")

            pole.setAttribute("id", "pole_x" + x + "_y" + y)
            pole.setAttribute("class", "pole")

            pole.style.position = "absolute"
            pole.style.left = x * 30 + "px"
            pole.style.top = y * 30 + "px"

            if ((x + y) % 2 == 0) {
                pole.classList.add("jasniejsze")
            } else {
                pole.classList.add("ciemniejsze")
            }

            plansza.appendChild(pole);
        }
    }
    document.body.appendChild(plansza)
}

function clearTileFromSnake(nazwa) {
    let element = document.getElementById(nazwa)
    element.classList.remove("snake_straight")
    element.classList.remove("snake_turn")
    element.classList.remove("snake_head")
    element.classList.remove("snake_tail")
    element.classList.remove("rotate0")
    element.classList.remove("rotate90")
    element.classList.remove("rotate270")
    element.classList.remove("rotate180")
}

function giveRotate(obrot) {
    switch (obrot) {
        case 1:
            return "rotate0"

        case 2:
            return "rotate90"

        case 3:
            return "rotate270"

        case 4:
            return "rotate180"
    }
}

function newSnakeHead(nazwa, pozycja) {
    clearTileFromSnake(nazwa)
    let element = document.getElementById(nazwa)
    element.classList.add("snake_head")

    if (pozycja[0].y == pozycja[1].y) {
        if (pozycja[0].x < pozycja[1].x) {
            obrot = 3
        } else {
            obrot = 2
        }
    } else {
        if (pozycja[0].y < pozycja[1].y) {
            obrot = 1
        } else {
            obrot = 4
        }
    }

    element.classList.add(giveRotate(obrot))
    element.classList.remove("krzak")
}

function makeSnakeTail(pozycja) {
    let obrot
    let tailPosition = "pole_x" + pozycja[pozycja.length - 1].x + "_y" + pozycja[pozycja.length - 1].y
    clearTileFromSnake(tailPosition)

    let element = document.getElementById(tailPosition)
    element.classList.add("snake_tail")

    if (pozycja[pozycja.length - 2].y == pozycja[pozycja.length - 1].y) {
        if (pozycja[pozycja.length - 2].x < pozycja[pozycja.length - 1].x) {
            obrot = 2
        } else {
            obrot = 3
        }
    } else {
        if (pozycja[pozycja.length - 2].y < pozycja[pozycja.length - 1].y) {
            obrot = 4
        } else {
            obrot = 1
        }
    }

    element.classList.add(giveRotate(obrot))
}

function makeSnakeSecondPart(pozycja) {
    let obrot
    let snakeSecondPart = "pole_x" + pozycja[1].x + "_y" + pozycja[1].y
    clearTileFromSnake(snakeSecondPart)
    let element = document.getElementById(snakeSecondPart)

    if (pozycja[0].x == pozycja[2].x) {
        element.classList.add("snake_straight")
        obrot = 1
    } else if (pozycja[0].y == pozycja[2].y) {
        element.classList.add("snake_straight")
        obrot = 2
    } else {
        element.classList.add("snake_turn")

        if (pozycja[0].x > pozycja[2].x) {
            if (pozycja[0].y < pozycja[2].y) {
                if (pozycja[0].y == pozycja[1].y) {
                    obrot = 3
                } else {
                    obrot = 2
                }
            } else {
                if (pozycja[0].y == pozycja[1].y) {
                    obrot = 4
                } else {
                    obrot = 1
                }
            }
        } else {
            if (pozycja[0].y < pozycja[2].y) {
                if (pozycja[0].y == pozycja[1].y) {
                    obrot = 1
                } else {
                    obrot = 4
                }
            } else {
                if (pozycja[0].y == pozycja[1].y) {
                    obrot = 2
                } else {
                    obrot = 3
                }
            }
        }
    }

    element.classList.add(giveRotate(obrot))
    element.classList.remove("krzak")
}

function generateApple() {
    appleX = Math.round(Math.random() * (boardWidth - 1))
    appleY = Math.round(Math.random() * (boardHeight - 1))

    for (let i = 0; i < pozycja.length; i++) {
        if (appleX == pozycja[i].x && appleY == pozycja[i].y) {
            generateApple()
        }
    }

    let nazwa = "pole_x" + appleX + "_y" + appleY
    let element = document.getElementById(nazwa)

    element.classList.add("japko")

    appleOnBoard = true
}

function handleLoss() {
    clearInterval(snake_move)
    clearTimeout(hideBush)

    let textLoss = document.createElement("div")
    textLoss.classList.add('textLoss')
    textLoss.innerHTML = "<h1>Przegrałeś</h1><span>Kliknij aby zacząć od nowa</span>"

    document.body.append(textLoss)

    makeSnakeMove = false

    textLoss.addEventListener("click", () => {
        startAgain()
    })
}

function startAgain() {
    clearInterval(snake_move)
    clearTimeout(hideBush)

    let toRemove = document.getElementsByClassName("textLoss")
    for (let i = 0; i < toRemove.length; i++) {
        toRemove[i].remove()
    }

    document.getElementById("plansza").remove()

    snake_length = 3
    pozycja = []
    appleOnBoard = false
    makeSnakeMove = true
    start = true
    oldDirection = null
    direction = false
    speed = 400

    generateBoard()
    createStartPosition()
}

document.getElementById("generuj").addEventListener("click", () => {
    startAgain()
})

function changeBoardSize() {
    let boardSizePopUp = document.createElement("div")
    boardSizePopUp.setAttribute("id", "boardSizePopUp")
    boardSizePopUp.innerHTML = "<span>Dopasowuję wielkość aby pasowała do ekranu</span>"

    document.body.append(boardSizePopUp)

    if (Math.floor((window.innerHeight - 20) / 30) > Math.floor((window.innerHeight - 20) / 30)) {
        document.getElementById("wielkosc").value = Math.floor((window.innerHeight - 20) / 30)
    } else {
        document.getElementById("wielkosc").value = Math.floor((window.innerWidth - 20) / 30)
    }

    setTimeout(() => {
        document.getElementById("boardSizePopUp").remove()
    }, 2000)
}