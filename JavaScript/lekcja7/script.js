let wielkosc = 11
let snake_length = 5
let pozycja = []
let speed = 1000
let appleOnBoard = false

generateBoard()

createStartPosition(pozycja);

document.onkeydown = (e) => {
    let direction
    switch (e.key) {
        case "ArrowRight":
            direction = "right"
            break;

        case "ArrowLeft":
            direction = "left"
            break;

        case "ArrowDown":
            direction = "down"
            break;

        case "ArrowUp":
            direction = "up"
            break;
    }

    show_snake(pozycja, direction)
}

var snake_move
function show_snake(pozycja, direction) {
    clearInterval(snake_move)
    snake_move = setInterval(() => {
        let new_position
        let new_x, new_y

        switch (direction) {
            case "up":
                if (pozycja[0].y - 1 < 0) {
                    new_y = wielkosc - 1
                } else {
                    new_y = pozycja[0].y - 1
                }

                new_position = { x: pozycja[0].x, y: new_y }
                pozycja.unshift(new_position)
                break;

            case "down":
                if (pozycja[0].y + 1 > wielkosc - 1) {
                    new_y = 0
                } else {
                    new_y = pozycja[0].y + 1
                }

                new_position = { x: pozycja[0].x, y: new_y }
                pozycja.unshift(new_position)
                break;

            case "left":
                if (pozycja[0].x - 1 < 0) {
                    new_x = wielkosc - 1
                } else {
                    new_x = pozycja[0].x - 1
                }

                new_position = { x: new_x, y: pozycja[0].y }
                pozycja.unshift(new_position)
                break;

            case "right":
                if (pozycja[0].x + 1 > wielkosc - 1) {
                    new_x = 0
                } else {
                    new_x = pozycja[0].x + 1
                }

                new_position = { x: new_x, y: pozycja[0].y }
                pozycja.unshift(new_position)
                break;
        }

        let last_snake_part
        if (pozycja.length > snake_length) {
            last_snake_part = pozycja.pop()
        }
        //let one_before_last = pozycja[pozycja.length - 2]

        let nazwa1 = "pole_x" + new_position.x + "_y" + new_position.y
        newSnakeHead(nazwa1)

        let tail_position = pozycja[pozycja.length - 1]
        let nazwa2 = "pole_x" + tail_position.x + "_y" + tail_position.y
        makeSanaketail(nazwa2)

        let second_snake = pozycja[1]
        let nazwa3 = "pole_x" + second_snake.x + "_y" + second_snake.y
        makeSnakeBody(nazwa3)

        let nazwa4 = "pole_x" + last_snake_part.x + "_y" + last_snake_part.y
        clearTileFromSnake(nazwa4)

        if (appleOnBoard == false) {
            generateApple()
        }
    }, speed)
}

function createStartPosition(pozycja) {
    let random_x = Math.round(Math.random() * wielkosc - 1)
    let random_y = Math.round(Math.random() * wielkosc - 1)

    pozycja.push({ x: random_x, y: random_y })
}

function generateBoard() {
    let plansza = document.createElement("div")
    plansza.setAttribute("id", "plansza")
    plansza.style.width = wielkosc * 30 + "px"
    plansza.style.height = wielkosc * 30 + "px"
    plansza.style.position = "relative"

    for (let y = 0; y < wielkosc; y++) {
        for (let x = 0; x < wielkosc; x++) {
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
}

function newSnakeHead(nazwa) {
    clearTileFromSnake(nazwa)
    let element = document.getElementById(nazwa)
    element.classList.add("snake_head")
}

function makeSnakeBody(nazwa) {
    clearTileFromSnake(nazwa)
    let element = document.getElementById(nazwa)
    element.classList.add("snake_straight")
}

function makeSanaketail(nazwa) {
    clearTileFromSnake(nazwa)
    let element = document.getElementById(nazwa)
    element.classList.add("snake_tail")
}

function generateApple(appleOnBoard) {
    let random_x = Math.round(Math.random() * wielkosc - 1)
    let random_y = Math.round(Math.random() * wielkosc - 1)
    console.log(random_x, random_y);

    let nazwa = "pole_x" + random_x + "_y" + random_y
    let element = document.getElementById(nazwa)

    element.classList.add("japko")

    appleOnBoard = true
    // if (appleOnBoard == false) {
    //     let appleX = false, appleY = false
    //     let random_x, random_y

    //     while (appleX == false) {
    //         random_x = Math.round(Math.random() * wielkosc - 1)
    //         for (let i = 0; i < pozycja.length; i++) {
    //             console.log(i);
    //             if (pozycja[i].x == random_x) {
    //                 break;
    //             }
    //         }
    //         appleX = true
    //     }
    //     while (appleY == false) {
    //         random_y = Math.round(Math.random() * wielkosc - 1)
    //         for (let i = 0; i < pozycja.length; i++) {
    //             console.log(i);
    //             if (pozycja[i].y == random_y) {
    //                 break;
    //             }
    //         }

    //         appleY = true
    //     }

    //     appleOnBoard = true

    //     console.log(random_x, random_y);
    //     let nazwa = "pole_x" + random_x + "_y" + random_y
    //     let element = document.getElementById(nazwa)

    //     element.classList.add("japko")
    // }
}