zad1(document.getElementById("zad1"))
function zad1(element1) {
    let i = 30
    let rosnie = true

    setInterval(() => {
        if (i > 100) rosnie = false
        if (rosnie) {
            i += 10
        }
        else i -= 10
        if (i < 30) rosnie = true
        element1.style["height"] = i + "px";
    }, 100);
}

zad2(document.getElementById("zad2"))
function zad2(element2) {
    let zdanie = "Udalo sie zrobic :)               "
    let poczatek = ""

    setInterval(() => {
        poczatek = zdanie.substring(0, 1)
        zdanie = zdanie.substring(1, zdanie.length)
        zdanie += poczatek
        element2.placeholder = zdanie
    }, 100);
}

zad3(document.getElementById("zad3"))
function zad3(element3) {
    let spadajacy = []
    for (let i = 0; i < 6; i++) {
        spadajacy[i] = ">>>>> " + (i + 1) + " punkt <<<<<"
    }
    for (let i = 6; i < 10; i++) {
        spadajacy[i] = ""
    }
    let zamiana = ""

    setInterval(() => {
        element3.innerHTML = spadajacy.toString().replaceAll(",", '\n')

        zamiana = spadajacy.pop()
        spadajacy.splice(0, 0, zamiana).join()
    }, 200);
}

zad4(document.getElementById("zad4"))
function zad4(element4) {
    let x, y
    let stopien = 1
    let R = 200
    setInterval(() => {
        x = Math.cos(stopien) * R + 200
        y = Math.sin(stopien) * R + 200

        element4.style.top = y + "px"
        element4.style.left = x + "px"

        stopien += 0.01
        if (stopien > 360) stopien = 1
    }, 10);
}





