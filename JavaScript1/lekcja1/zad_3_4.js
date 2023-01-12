// ZAD 3
let liczba = parseInt(window.prompt("Podaj liczbe"))

/************************************************************************************************************************************/
document.write("a)</br><pre>")
for (let i = 1; i <= liczba; i++) {
    document.write("X")
}
document.write("</pre>")

/************************************************************************************************************************************/
document.write("<br>b)</br><pre>")
for (let i = 1; i <= liczba; i++) {
    if (i == 1 || i == liczba) {
        for (let j = 1; j <= liczba; j++) {
            document.write("X ")
        }
        document.write("<br>")
    } else {
        document.write("X ")
        for (let k = 1; k < liczba - 1; k++) {
            document.write("  ")
        }
        document.write("X<br>")
    }
}
document.write("</pre>")

/************************************************************************************************************************************/
document.write("<br>c)</br><pre>")
for (let i = 0; i < liczba; i++) {
    for (var j = liczba - 1; j > i; j--) {
        document.write(" ")
    }
    for (let k = 0; k <= j; k++) {
        if (k == 0 || k == j || i == liczba - 1) {
            document.write("X")
        } else {
            document.write(" ");
        }
    }
    document.write("<br>")
}
document.write("</pre>")

/************************************************************************************************************************************/
document.write("<br>d)</br><pre>")
for (let i = 1; i <= liczba; i++) {
    for (let j = 1; j <= i; j++) {
        document.write(j)
    }
    document.write("<br>")
}
document.write("</pre>")

/************************************************************************************************************************************/
document.write("<br>e)</br><pre>")
for (let i = 0; i < liczba; i++) {
    for (var j = liczba - 1; j > i; j--) {
        document.write(" ")
    }
    let lewo = j + 1
    for (let k = 1; k <= j + 1; k++) {
        document.write(lewo)
        lewo--
    }
    document.write("<br>")
}
document.write("</pre>")

/************************************************************************************************************************************/
function silnia(liczba) {
    if (liczba == 0)
        return 1;
    else
        return liczba * silnia(liczba - 1)
}

document.write("<br>f)</br><pre>")
document.write(liczba + "! = " + silnia(liczba))
document.write("</pre>")

/************************************************************************************************************************************/
function suma_parzystych(liczba) {
    let wartosc = 0
    for (let i = liczba; i > 0; i--) {
        if (i % 2 == 0) {
            wartosc += i
        }
    }
    return wartosc
}

document.write("<br>g)</br><pre>")
document.write("Suma liczba parzystych od 0 do " + liczba + " wynosi: " + suma_parzystych(liczba))
document.write("</pre>")

/************************************************************************************************************************************/
function czy_pierwsza(liczba) {
    let liczba_dzienikow = 0
    for (let i = liczba; i > 2; i--) {
        if (((Math.round(liczba / i) - (liczba / i))) == 0) {
            liczba_dzienikow++
        }
    }
    if (liczba_dzienikow < 2) {
        return "jest"
    } else {
        return "nie jest"
    }
}

document.write("<br>h)</br><pre>")
document.write("Liczba " + liczba + " " + czy_pierwsza(liczba) + " liczbą pierwszą.")
//window.alert("Liczba " + liczba + " " + czy_pierwsza(liczba) + " liczbą pierwszą.")
document.write("</pre>")

/************************************************************************************************************************************/
function tabliczka_mnozenia(liczba) {
    for (let i = 0; i <= liczba; i++) {
        for (let j = 0; j <= liczba; j++) {
            if (i == 0 && j == 0) {
                document.write('<div style="height: 40px; width: 40px;"')
            } else {
                if (i == 0 || j == 0) {
                    document.write('<div class="legenda"><b>')
                } else {
                    if (i == j) {
                        document.write('<div class="przekatna">')
                    } else {
                        document.write('<div class="wyniki">')
                    }
                }
            }
            if (i == 0 && j == 0) {
                document.write("</b></div>")
            } else {
                if (i == 0) {
                    document.write(j + "</b></div>")
                } else {
                    if (j == 0) {
                        document.write(i + "</b></div>")
                    } else {
                        document.write(i * j + "</b></div>")
                    }
                }
            }
        }
    }
}

document.write('<br>i)</br>')
document.write('<div class="tabliczka" style="width: ' + (liczba + 1) * 40 + 'px;">')
console.log(liczba);
tabliczka_mnozenia(liczba)
document.write("</div>")


// ZAD 4
function sprawdzenie(numer) {
    if (numer.length == 9) {
        wagi = [8, 9, 2, 3, 4, 5, 6, 7]
    } else if (numer.length == 14) {
        wagi = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]
    } else {
        return "zly"
    }
    let suma = 0
    for (let i = 0; i < numer.length - 1; i++) {
        suma += numer[i] * wagi[i]
    }
    if (suma % 11 == numer[numer.length - 1]) {
        return "dobry"
    }
    return "zly"
}

let numer = parseInt(window.prompt("Podaj numer REGON"))
document.write("<br>4.<br><pre>")
document.write("Podales " + sprawdzenie(numer) + " numer REGON")
document.write("</pre>")