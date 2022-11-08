let wielkosc = 11
let plansza = document.createElement("div")
plansza.setAttribute("id", "plansza")
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
document.getElementById(nazwa).style.backgroundImage = "url(./krzak.png)"

let pozycja = []

pozycja.push({ x: random_x, y: random_y })



function show_snake(pozycja) {
    for (let i = 0; i < pozycja.length; i++) {
        let nazwa = "pole_x" + pozycja[i].x + "_y" + pozycja[i].y
    }
}