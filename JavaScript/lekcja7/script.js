let wielkosc = 11
let plansza = document.createElement("div")
plansza.setAttribute("id", "plansza")
plansza.style.position = "relative"
let snake_length = 1

for (let y = 0; y < wielkosc; y++) {
    for (let x = 0; x < wielkosc; x++) {
        let pole = document.createElement("div")

        pole.setAttribute("id", "pole_x" + x + "_y" + y)
        pole.setAttribute("class", "pole")

        pole.style.position = "absolute"
        pole.style.left = x * 30 + "px"
        pole.style.top = y * 30 + "px"

        if ((x + y) % 2 == 0) {
            pole.style.backgroundColor = "rgb(195, 160, 100)"
        } else {
            pole.style.backgroundColor = "rgb(180, 115, 0)"
        }

        plansza.appendChild(pole);
    }
}

let random_x = Math.round(Math.random() * wielkosc)
let random_y = Math.round(Math.random() * wielkosc)

document.body.appendChild(plansza)

let nazwa = "pole_x" + random_x + "_y" + random_y
document.getElementById(nazwa).style.backgroundImage = "url('./krzak.png')"

let pozycja = []

pozycja.push({ x: random_x, y: random_y })
document.onkeydown = (e) => {
    console.log("klik");
    let new_position
    let new_x, new_y
    let direction
    switch (e.key) {
        case "ArrowRight":
            pozycja[0].x + 1 > wielkosc ? new_x = 0 : new_x = pozycja[0].x + 1
            new_position = { x: new_x, y: pozycja[0].y }
            pozycja.unshift(new_position)
            console.log(pozycja);
            break;

        case "ArrowLeft":
            pozycja[0].x - 1 < 0 ? new_x = wielkosc : new_x = pozycja[0].x - 1
            new_position = { x: new_x, y: pozycja[0].y }
            pozycja.unshift(new_position)
            console.log(pozycja);
            break;

        case "ArrowDown":
            pozycja[0].y + 1 > wielkosc ? new_y = 0 : new_y = pozycja[0].y + 1
            new_position = { x: pozycja[0].x, y: new_y }
            pozycja.unshift(new_position)
            console.log(pozycja);
            break;

        case "ArrowUp":
            pozycja[0].y - 1 < 0 ? new_y = wielkosc : new_y = pozycja[0].y - 1
            new_position = { x: pozycja[0].x, y: new_y }
            pozycja.unshift(new_position)
            console.log(pozycja);
            break;

    }
    console.log("po kliku");
    if (pozycja.length > snake_length) {
        pozycja.pop()
    }
    show_snake(pozycja, direction)
}

var snake_move
function show_snake(pozycja, direction) {
    clearInterval(snake_move)
    snake_move = setInterval(() => {
        console.log("asd");
    }, 1000)

    for (let i = 0; i < pozycja.length; i++) {
        console.log("asdasdasd");
        let nazwa = "pole_x" + pozycja[i].x + "_y" + pozycja[i].y
        let element = document.getElementById(nazwa)
        if ((pozycja[i].x + pozycja[i].y) % 2 == 0) {
            element.style.backgroundColor = "rgb(195, 160, 100)"
        } else {
            element.style.backgroundColor = "rgb(180, 115, 0)"
        }
        element.style.background = "url('./krzak.png')"
    }
}