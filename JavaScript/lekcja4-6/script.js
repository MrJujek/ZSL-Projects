let formularz = document.createElement("form");
let input, label, height, width, mines, pozostalo, czas
let dane, box
let opis = ["Height", "Width", "Mines"]
let element, count, pozostale_miny
let saperFreezeClic, byl_pierwszy_klik = false
let pierwszy_x, pierwszy_y
let kolor = ["rgb(190, 190, 190)", "blue", "green", "red", "darkblue", "darkred", "darkcyan", "darkmagenta", "black"]
let licz_czas

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

czas = document.createElement("p")
czas.setAttribute("id", "czas")
czas.style.height = 40 + "px"
dane.appendChild(czas)

document.body.appendChild(dane);

for (let i = 0; i < 3; i++) {
    element = document.getElementById("input_" + opis[i])

    element.addEventListener("input", () => {
        height = (document.getElementById("input_" + opis[0]).value)
        width = (document.getElementById("input_" + opis[1]).value)
        mines = (document.getElementById("input_" + opis[2]).value)

        console.log(height, width, mines)

        if (isNaN(height) || isNaN(width) || isNaN(mines) || mines > (height - 1) * (width - 1) || mines < 1 || height < 4 || width < 4) {
            //console.log("Zle dane")
            setTimeout(() => {
                if (isNaN(height) || isNaN(width) || isNaN(mines) || mines > (height - 1) * (width - 1) || mines < 1 || height < 4 || width < 4) {
                    document.getElementById("input_" + opis[i]).value = ""
                }
            }, 1000)
        }
    })

}

let saper_div = document.createElement("div");
saper_div.setAttribute("id", "saper")
saper_div.style.margin = "0 auto"
document.body.appendChild(saper_div);

document.getElementById('generuj').onclick = () => {
    clearInterval(licz_czas)
    saperFreezeClic = false
    byl_pierwszy_klik = false
    document.getElementById("saper").innerText = null

    height = parseInt(document.getElementById("input_" + opis[0]).value)
    width = parseInt(document.getElementById("input_" + opis[1]).value)
    mines = parseInt(document.getElementById("input_" + opis[2]).value)

    if (isNaN(height) || isNaN(width) || isNaN(mines) || mines > (height - 1) * (width - 1) || mines < 1 || height < 4 || width < 4) {
        setTimeout(() => {
            document.getElementById("input_" + opis[0]).value = ""
            document.getElementById("input_" + opis[1]).value = ""
            document.getElementById("input_" + opis[2]).value = ""
        }, 1000)
    } else {
        generuj_plansze(height, width);
        saper(height, width, mines);
    }
}

function generuj_plansze(height, width) {
    document.getElementById("czas").innerText = "Czas: 0s"

    let saper = document.getElementById("saper")

    saper.style.width = width * 30 + "px"
    saper.style.height = height * 30 + "px"
    saper.style.background = "rgb(190, 190, 190)"
    saper.style.position = "relative"

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            box = document.createElement("div")
            box.setAttribute("id", "box_x" + j + "_y" + i)
            box.setAttribute("class", "box")

            box.style.position = "absolute"
            box.style.left = j * 30 + "px"
            box.style.top = i * 30 + "px"

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
}

function saper(height, width, mines) {
    pozostale_miny = mines
    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " bomb"

    let bomby = []
    for (let i = 0; i < height; i++) {
        bomby[i] = []
        for (let j = 0; j < width; j++) {
            let nazwa = "box_x" + j + "_y" + i
            element = document.getElementById(nazwa)
            element.style.backgroundImage = "url(./img/klepa.PNG)"

            element.addEventListener("click", () => {
                if (!byl_pierwszy_klik) {
                    let czas_startu = new Date().getTime()
                    licz_czas = setInterval(() => {
                        document.getElementById("czas").innerText = "Czas: " + Math.round((new Date().getTime() - czas_startu) / 1000) + "s"
                    }, 1000)

                    pierwszy_x = i
                    pierwszy_y = j

                    for (let k = pierwszy_x - 1; k <= pierwszy_x + 1; k++) {
                        for (let l = pierwszy_y - 1; l <= pierwszy_y + 1; l++) {
                            if (k >= 0 && l >= 0 && k < height && l < width) {
                                bomby[k][l] = -1
                            }
                        }
                    }
                    bomby = generuj_bomby(bomby, width, height, mines)
                    bomby = licz_cyferki(bomby, width, height)

                    byl_pierwszy_klik = true
                }

                element = document.getElementById(nazwa)
                if (element.style.backgroundImage !== 'url("./img/flaga.PNG")' && element.style.backgroundImage !== 'url("./img/pyt.png")') {
                    element = document.getElementById(nazwa)
                    if (bomby[i][j] === 9) {
                        przegrana(bomby, height, width, nazwa)
                        saperFreezeClic = true
                    } else {
                        if (element.style.backgroundImage == 'url("./img/flaga.PNG")') {
                            pozostale_miny++
                            document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " bomb"
                        }
                        element.style.backgroundImage = ""
                        if (bomby[i][j] === 0) {
                            element.innerText = ""
                            bomby = odkryj_puste(bomby, height, width, i, j, kolor)
                        } else {
                            daj_cyfre(bomby, j, i, kolor)
                        }
                    }
                    if (czy_wygrana(bomby, height, width)) {
                        zwyciestwo(bomby, height, width, kolor)
                        saperFreezeClic = true
                    }
                }

                //console.log("lewy klik: ", element)
            })

            element.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                element = document.getElementById(nazwa)
                //console.log("prawy klik: ", element)

                if (element.style.backgroundImage == 'url("./img/klepa.PNG")') {
                    pozostale_miny--
                    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " bomb"
                    element.style.backgroundImage = 'url("./img/flaga.PNG")'
                } else if (element.style.backgroundImage == 'url("./img/flaga.PNG")') {
                    pozostale_miny++
                    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " bomb"
                    element.style.backgroundImage = 'url("./img/pyt.png")'
                } else if (element.style.backgroundImage == 'url("./img/pyt.png")') {
                    element.style.backgroundImage = 'url("./img/klepa.PNG")'
                }
            })
        }
    }
}

function daj_cyfre(bomby, x, y, kolor) {
    let nazwa = "box_x" + x + "_y" + y
    element = document.getElementById(nazwa)
    for (let k = 0; k < kolor.length; k++) {
        if (bomby[y][x] === k) {
            element.style.color = kolor[k]
        }
    }
    element.style.backgroundImage = ''
    element.innerText = bomby[y][x]
}

function generuj_bomby(bomby, width, height, mines) {
    for (let k = 0; k < mines;) {
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * height)
        if (bomby[y][x] !== 9 && bomby[y][x] !== -1) {
            bomby[y][x] = 9
            k++
        }
    }
    return bomby
}

function licz_cyferki(bomby, width, height) {
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

                    bomby[i][j] = count
                }

            }
        }
    }
    return bomby
}

function odkryj_puste(bomby, height, width, box_y, box_x, kolor) {
    for (let pomoc_y = box_y - 1; pomoc_y <= box_y + 1; pomoc_y++) {
        for (let pomoc_x = box_x - 1; pomoc_x <= box_x + 1; pomoc_x++) {
            if (pomoc_y >= 0 && pomoc_x >= 0 && pomoc_y < height && pomoc_x < width) {
                let nazwa = "box_x" + pomoc_x + "_y" + pomoc_y

                if (document.getElementById(nazwa).style.backgroundImage === 'url("./img/flaga.PNG")') {
                    pozostale_miny++
                    document.getElementById("pozostalo").innerText = "Pozostało " + pozostale_miny + " bomb"
                }

                if (bomby[pomoc_y][pomoc_x] === 0 && document.getElementById(nazwa).style.backgroundImage != '') {
                    document.getElementById(nazwa).style.backgroundImage = ''
                    odkryj_puste(bomby, height, width, pomoc_y, pomoc_x, kolor)
                } else if (bomby[pomoc_y][pomoc_x] !== 9 && bomby[pomoc_y][pomoc_x] !== 0) {
                    daj_cyfre(bomby, pomoc_x, pomoc_y, kolor)
                }
            }
        }
    }
    return bomby
}

function czy_wygrana(bomby, height, width) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            element = document.getElementById("box_x" + x + "_y" + y)
            if (bomby[y][x] !== 9 && element.style.backgroundImage == 'url("./img/klepa.PNG")') {
                return false
            }
        }
    }
    clearInterval(licz_czas)
    return true
}

function zwyciestwo(bomby, height, width, kolor) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let element = document.getElementById("box_x" + x + "_y" + y)

            if (element.style.backgroundImage == 'url("./img/klepa.PNG")' && bomby[y][x] !== 9) {
                daj_cyfre(bomby, x, y, kolor)
            }
        }
    }
    document.getElementById("pozostalo").innerText = "Wygrałeś :)"

    return window.prompt("Gratulacje\nPodaj nick aby zapisać go w tabeli:")
}

function przegrana(bomby, height, width, nazwa) {
    let element = document.getElementById(nazwa)
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let nazwa = "box_x" + j + "_y" + i
            let bomb = document.getElementById(nazwa)
            if (bomby[i][j] === 9)
                bomb.style.backgroundImage = 'url("./img/pbomb.PNG")'
        }
    }

    element.style.backgroundImage = 'url("./img/bomb.PNG")'
    document.getElementById("pozostalo").innerText = "Przegrałeś :("
    alert("Przegrałeś")
    clearInterval(licz_czas)
}