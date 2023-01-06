$(document).ready(() => {
    const tab = [
        { type: "komisariat 1 - dzielnica I", c1: "111111", c2: "f5aa00", start: 70 },
        { type: "komisariat 2 - dzielnica II", c1: "333333", c2: "f5bb00", start: 60 },
        { type: "komisariat 3 - dzielnice III i IV", c1: "555555", c2: "f5cc00", start: 50 },
        { type: "komisariat 4 - dzielnice V, VI i VII", c1: "777777", c2: "f5dd00", start: 40 },
        { type: "komisariat 5 - dzielnice VIII, IX, i XIII", c1: "999999", c2: "f5ee00", start: 50 },
        { type: "komisariat 6 - dzielnice X, XI i XII", c1: "777777", c2: "f5dd00", start: 60 },
        { type: "komisariat 7 - dzielnice XV, XVI i XVII", c1: "555555", c2: "f5cc00", start: 70 },
        { type: "komisariat 8 - dzielnice XIV i XVIII", c1: "333333", c2: "f5bb00", start: 80 },
    ]
    let legenda = ["komisariat", "noc", "dane o przestepczosci", "dzien"]

    let tablica = $("<table border='1'>")
    tablica.css("border", "1px dotted blue").css("width", "800px")

    let wiersz = $("<tr>")
    for (let i = 0; i < 4; i++) {
        let naglowek = $("<th>")

        naglowek.append(legenda[i])
        wiersz.append(naglowek)

    }
    tablica.append(wiersz)

    for (let i = 0; i < tab.length; i++) {
        let wiersz = $("<tr>")
        for (let j = 0; j < Object.keys(tab[j]).length; j++) {

            let komorka
            switch (j) {
                case 0:
                    komorka = $("<td>")
                    komorka.append(tab[i].type)
                    break

                case 1:
                    komorka = $("<th>")
                    komorka
                        .attr("id", "noc_" + i)
                        .css("margin", "10px")
                    komorka.append(100 - tab[i].start)
                    break

                case 2:
                    komorka = $("<td>")
                    let suwak = $("<div>")
                    suwak
                        .attr("id", "suwak_" + i)
                        .css("position", "relative")
                        .css("height", "50px")
                        .css("width", "400px")
                        .css("border-radius", "50px")
                        .css("margin", "10px")
                        .css("background-color", "#" + tab[i].c1)

                    let kolko = $("<div>")
                    kolko
                        .attr("id", "kolko_" + i)
                        .css("position", "absolute")
                        .css("left", 4 * tab[i].start + "px")
                        .css("height", "50px")
                        .css("width", "50px")
                        .css("border-radius", "50px")
                        .css("background-color", "#" + tab[i].c2)

                    suwak.append(kolko)
                    komorka.append(suwak)
                    break

                case 3:
                    komorka = $("<th>")
                    komorka
                        .attr("id", "dzien_" + i)
                        .css("margin", "10px")
                    komorka.append(tab[i].start)
            }
            wiersz.append(komorka)
        }

        tablica.append(wiersz)
    }

    $(document.body).append(tablica)
    let div = $("<div>")
    div
        .css("width", "800px")
        .css("display", "flex")
        .css("flex-direction", "column")
        .css("align-items", "center")
        .css("border", "1px dotted blue")

    let p1 = $("<b id='p1'>")
    p1.append("Srednia przestepczosc w krakowie")
    let p2 = $("<b id='p2'>")
    p2.append("dzien - 60")
    let p3 = $("<b id='p3'>")
    p3.append("noc - 40")

    div.append(p1, p2, p3)
    $("body").append(div)

    for (let i = 0; i < tab.length; i++) {
        $("#kolko_" + i).on("mousedown", (e) => {
            $("#suwak_" + i).on("mousemove", (e) => {
                let lewo = e.clientX - 350
                if (lewo > 350) lewo = 350
                else if (lewo < 0) lewo = 0
                $("#kolko_" + i)
                    .css("left", lewo + "px")

                $("#dzien_" + i)
                    .empty()
                    .append(Math.round(lewo / 3.5))
                $("#noc_" + i)
                    .empty()
                    .append(100 - $("#dzien_" + i).text())

                let suma = 0
                for (let j = 0; j < tab.length; j++) {
                    console.log($("#dzien_" + j).text())
                    suma += parseInt($("#dzien_" + j).text())
                }
                suma = Math.round(suma / tab.length)
                $("#p2")
                    .empty()
                    .append("dzien - " + suma)
                $("#p3")
                    .empty()
                    .append("noc - " + (100 - suma))


                $(window).on("mouseup", (e) => {
                    $("#suwak_" + i).off("mousemove")
                })
            })
        })

    }
})