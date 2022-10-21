let tabela = $("<table>")

const produkty = [
    { price: "2.22", product: "kurtka" },
    { price: "3.34", product: "szalik" },
    { price: "4.44", product: "rękawiczki" },
    { price: "5.55", product: "buty" },
    { price: "6.66", product: "bluza" },
    { price: "7.77", product: "coś na wieczór" },
    { price: "7.77", product: "coś na wieczór" }
]
const legenda = ["produkt", "cena", "ilosc", "suma"]

$(document).ready(() => {
    let wiersz = $("<tr>")
    for (let i = 0; i < 4; i++) {
        let naglowek = $("<th>")
        naglowek.addClass("legenda")
        naglowek.append(legenda[i])
        wiersz.append(naglowek)
    }
    tabela.append(wiersz)

    for (let i = 0; i < Object.keys(produkty).length; i++) {
        let wiersz = $("<tr>")
        for (let j = 0; j < 4; j++) {
            let komorka = $("<td>")
            komorka.addClass("kom")

            switch (j) {
                case 0:
                    komorka.append(produkty[i].product)
                    break
                case 1:
                    komorka.append(produkty[i].price)
                    break
                case 2:
                    let input = $("<input type='range'>")
                    input.attr("min", 0)
                        .attr("max", 10)
                        .val(0)
                        .attr("id", "input_" + i)
                    komorka.append(input)
                    break
                case 3:
                    komorka.attr("id", "suma_" + i)
                    komorka.append(0)
                    break
            }

            wiersz.append(komorka)
        }


        tabela.append(wiersz)
    }
    wiersz = $("<tr>")
    for (let i = 0; i < 4; i++) {
        if (i == 2) {
            let suma_ile = $("<th>")
            suma_ile.addClass("ile")
            suma_ile.attr("id", "suma_ile")
            suma_ile.append(0)
            wiersz.append(suma_ile)
        } else if (i == 3) {
            let suma_sum = $("<th>")
            suma_sum.attr("id", "suma_sum")
            suma_sum.addClass("suma")
            suma_sum.append(0)
            wiersz.append(suma_sum)
        } else {
            let komorka = $("<td>")
            wiersz.append(komorka)
        }

    }
    tabela.append(wiersz)

    $("body").append(tabela)

    for (let i = 0; i < Object.keys(produkty).length; i++) {
        $("#input_" + i).on("input", () => {
            $("#suma_" + i)
                .empty()
                .append(($("#input_" + i).val() * produkty[i].price).toFixed(2))

            let wartosc = 0
            for (let i = 0; i < Object.keys(produkty).length; i++) {
                wartosc += parseInt($("#input_" + i).val())
            }
            $("#suma_ile")
                .empty()
                .append(wartosc)

            wartosc = 0
            for (let i = 0; i < Object.keys(produkty).length; i++) {
                wartosc += parseFloat($("#suma_" + i).text())
                console.log(wartosc)
            }
            $("#suma_sum")
                .empty()
                .append(wartosc.toFixed(2))
        })
    }
})


