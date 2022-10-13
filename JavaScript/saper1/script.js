let formularz = document.createElement("form");
let input, label, height, width, mines, pozostalo
let dane, box
let opis = ["Height", "Width", "Mines"]
let element, count, pozostale_miny
let saperFreezeClic

for (let i = 0; i < 3; i++) {
    input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("value", 10)
    input.setAttribute("id", "input_" + opis[i])

    label = document.createElement("label")
    label.setAttribute("for", "input_" + opis[i])
    label.setAttribute("for", "input_" + opis[i])
    label.innerHTML = opis[i] + ":"

    formularz.appendChild(label)
    formularz.appendChild(input)
}

input = document.createElement("input")
input.setAttribute("type", "button")
input.setAttribute("id", "generuj")
input.setAttribute("value", "GENERUJ")

formularz.appendChild(input)

formularz.setAttribute("class", "flex-column")

dane = document.createElement("div");
dane.setAttribute("class", "flex-column")
dane.appendChild(formularz);

pozostalo = document.createElement("p")
pozostalo.setAttribute("id", "pozostalo")
pozostalo.style.height = 40 + "px"
dane.appendChild(pozostalo)

document.body.appendChild(dane);

let saper_div = document.createElement("div");
saper_div.setAttribute("id", "saper")
document.body.appendChild(saper_div);

document.getElementById('generuj').onclick = () => {
    saperFreezeClic = false
    document.getElementById("saper").innerText = null

    height = parseInt(document.getElementById("input_" + opis[0]).value)
    width = parseInt(document.getElementById("input_" + opis[1]).value)
    mines = parseInt(document.getElementById("input_" + opis[2]).value)

    if (isNaN(height) || isNaN(width) || isNaN(mines) || mines > (height - 1) * (width - 1)) {
        //console.log("Zle dane")
        setTimeout(() => {
            document.getElementById("input_" + opis[0]).value = ""
            document.getElementById("input_" + opis[1]).value = ""
            document.getElementById("input_" + opis[2]).value = ""
        }, 1000)
    } else {
        saper(height, width, mines);
    }
}

function saper(height, width, mines) {
    pozostale_miny = mines
    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " min"
    console.log(height, width, mines)

    let saper = document.getElementById("saper")
    saper.style.width = width * 20 + "px"
    saper.style.position = "relative"

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            box = document.createElement("div")
            box.setAttribute("id", "box_x" + i + "_y" + j)
            box.setAttribute("class", "box")

            box.style.position = "absolute"
            box.style.left = j * 20 + "px"
            box.style.top = i * 20 + "px"

            saper.appendChild(box);
        }
    }

    document.body.appendChild(saper);

    saper.addEventListener("click", e => {
        if (saperFreezeClic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
    saper.addEventListener("contextmenu", e => {
        if (saperFreezeClic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);

    let bomby = []
    for (let i = 0; i < height; i++) {
        bomby[i] = []
        for (let j = 0; j < width; j++) {
            let nazwa = "box_x" + i + "_y" + j
            element = document.getElementById(nazwa)
            element.style.backgroundImage = "url(./img/klepa.PNG)"

            element.addEventListener("click", () => {
                element = document.getElementById(nazwa)
                if (bomby[i][j] == 9) {
                    for (let i = 0; i < height; i++) {
                        for (let j = 0; j < width; j++) {
                            let nazwa_bomb = "box_x" + i + "_y" + j
                            let bomb = document.getElementById(nazwa_bomb)
                            if (bomby[i][j] == 9)
                                bomb.style.backgroundImage = 'url("./img/pbomb.PNG")'
                        }
                    }

                    element.style.backgroundImage = 'url("./img/bomb.PNG")'
                    alert("przegrales")
                    saperFreezeClic = true
                } else {
                    element.style.backgroundImage = ""
                    element.innerText = bomby[i][j]
                }
                element.style.backgroundImage = 0
                console.log(element.style.backgroundImage)
                console.log("lewy klik: ", element)
            })

            element.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                element = document.getElementById(nazwa)
                console.log("prawy klik: ", element)

                if (element.style.backgroundImage == 'url("./img/klepa.PNG")') {
                    if (pozostale_miny > 0) {
                        pozostale_miny--
                        document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " min"
                        element.style.backgroundImage = 'url("./img/flaga.PNG")'
                    }
                } else if (element.style.backgroundImage == 'url("./img/flaga.PNG")') {
                    pozostale_miny++
                    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " min"
                    element.style.backgroundImage = 'url("./img/pyt.png")'
                } else if (element.style.backgroundImage == 'url("./img/pyt.png")') {
                    element.style.backgroundImage = 'url("./img/klepa.PNG")'
                }
            });


        }
    }

    for (let k = 0; k < mines;) {
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * height)
        if (bomby[y][x] !== 9) {
            bomby[y][x] = 9
            k++
        }
    }


    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (bomby[i][j] !== 9) {
                count = 0

                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (k >= 0 && l >= 0 && k < height && l < width) {
                            if (bomby[k][l] === 9) {
                                count++
                            }
                        }
                    }
                }

                bomby[i][j] = count
            }
        }
    }

    console.log(bomby)
}