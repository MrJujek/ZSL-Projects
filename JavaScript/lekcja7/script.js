let wielkosc = 11
let snake_length = 4
generateBoard()




let pozycja = []

createApple(pozycja);




document.onkeydown = (e) => {
    //console.log("klik");
    let new_position
    let new_x, new_y
    let direction
    switch (e.key) {
        case "ArrowRight":
            // pozycja[0].x + 1 > wielkosc ? new_x = 0 : new_x = pozycja[0].x + 1
            // new_position = { x: new_x, y: pozycja[0].y }
            // pozycja.unshift(new_position)
            // console.log(pozycja);
            direction = "right"
            break;

        case "ArrowLeft":
            // pozycja[0].x - 1 < 0 ? new_x = wielkosc : new_x = pozycja[0].x - 1
            // new_position = { x: new_x, y: pozycja[0].y }
            // pozycja.unshift(new_position)
            // console.log(pozycja);
            direction = "left"
            break;

        case "ArrowDown":
            // pozycja[0].y + 1 > wielkosc ? new_y = 0 : new_y = pozycja[0].y + 1
            // new_position = { x: pozycja[0].x, y: new_y }
            // pozycja.unshift(new_position)
            // console.log(pozycja);
            direction = "down"
            break;

        case "ArrowUp":
            // pozycja[0].y - 1 < 0 ? new_y = wielkosc : new_y = pozycja[0].y - 1
            // new_position = { x: pozycja[0].x, y: new_y }
            // pozycja.unshift(new_position)
            // console.log(pozycja);
            direction = "up"
            break;

    }
    //console.log("po kliku");
    if (pozycja.length > snake_length) {
        pozycja.pop()
    }
    show_snake(pozycja, direction)
}

var snake_move
function show_snake(pozycja, direction) {
    clearInterval(snake_move)
    snake_move = setInterval(() => {
        let new_position
        let new_x, new_y
        //console.log(direction);

        switch (direction) {
            case "up":
                pozycja[0].y - 1 < 0 ? new_y = wielkosc-1 : new_y = pozycja[0].y - 1
                new_position = { x: pozycja[0].x, y: new_y }
                pozycja.unshift(new_position)
                //console.log(pozycja);
                break;

            case "down":
                pozycja[0].y + 1 > wielkosc ? new_y = 0 : new_y = pozycja[0].y + 1
                new_position = { x: pozycja[0].x, y: new_y }
                pozycja.unshift(new_position)
                //console.log(pozycja);
                break;

            case "left":
                pozycja[0].x - 1 < 0 ? new_x = wielkosc-1 : new_x = pozycja[0].x - 1
                new_position = { x: new_x, y: pozycja[0].y }
                pozycja.unshift(new_position)
                //console.log(pozycja);
                break;

            case "right":
                pozycja[0].x + 1 > wielkosc ? new_x = 0 : new_x = pozycja[0].x + 1
                new_position = { x: new_x, y: pozycja[0].y }
                pozycja.unshift(new_position)
                //console.log(pozycja);
                break;
        }
        let last_snake_part
        if (pozycja.length > snake_length) {
            last_snake_part = pozycja.pop()
        }
        let nazwa1 = "pole_x" + new_position.x + "_y" + new_position.y
        console.log(nazwa1);
        newSnakeHead(nazwa1)

        //console.log("new_position:\t" , new_position);
        //console.log("last_snake_part:\t" , last_snake_part);

        // let nazwa2 = "pole_x" + last_snake_part.x + "_y" + last_snake_part.y
        // clearTileFromSnake(nazwa2)
    }, 1000)

    // for (let i = 0; i < pozycja.length; i++) {
    //     console.log("asdasdasd");
    //     let nazwa = "pole_x" + pozycja[i].x + "_y" + pozycja[i].y
    //     let element = document.getElementById(nazwa)
    //     element.classList.add("snake_straight")
    // }
}

function createApple(pozycja) {
    let random_x = Math.round(Math.random() * wielkosc-1)
    let random_y = Math.round(Math.random() * wielkosc-1)
    let nazwa = "pole_x" + random_x + "_y" + random_y
    document.getElementById(nazwa).style.backgroundImage = "url('./krzak.png')"

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
    let element = document.getElementById(nazwa)
    element.classList.add("snake_head")
}