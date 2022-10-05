let formularz = document.createElement("form");
let input, label, height, width, mines
let dane, box
let opis = ["Height", "Width", "Mines"]

for (let i = 0; i < 3; i++) {
    input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("id", "input_" + opis[i])

    label = document.createElement("label")
    label.setAttribute("for", "input_" + opis[i])
    label.setAttribute("id", "label_" + opis[i])
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
dane.setAttribute("class", "dane")
dane.appendChild(formularz);

document.body.appendChild(dane);

document.getElementById('generuj').onclick = () => {
    height = parseInt(document.getElementById("input_" + opis[0]).value)
    width = parseInt(document.getElementById("input_" + opis[1]).value)
    mines = parseInt(document.getElementById("input_" + opis[2]).value)

    if (isNaN(height) || isNaN(width) || isNaN(mines) || mines > (height - 1) * (width - 1)) {
        console.log("Zle dane")
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
    let saper = document.createElement("div");
    saper.setAttribute("id", "saper")
    saper.style.width = width * 50 + "px"
    saper.style.position = "relative"

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            box = document.createElement("div")
            box.setAttribute("id", "box_x" + i + "_y" + j)
            box.setAttribute("class", "box")

            box.style.position = "absolute"
            box.style.left = j * 50 + "px"
            box.style.top = i * 50 + "px"


            saper.appendChild(box);

            // document.getElementById("box_x" + i + "_y" + j).onclick = () => {
            //     console.log("klik")
            // }
        }
    }

    document.getElementsByClassName("box").onclick = () => {
        // console.log(this.id)
        console.log("klik");
    }

    document.body.appendChild(saper);
}
