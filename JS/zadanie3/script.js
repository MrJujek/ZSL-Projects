zad1(document.getElementById("zad1"))
function zad1(element1) {
    element1.style["height"] = "100px"
    let i = 10
    let rosnie = true
    setInterval(() => {
        if (i == 100) rosnie = false
        if (rosnie) {
            i += 1
        }
        else i -= 1
        if (i == 10) rosnie = true
        element1.style["height"] = i + "px";
    }, 50);
}

zad2(document.getElementById("zad2"))
function zad2(element2) {
    let zdanie = "Ciekawe czy uda ci sie to zrobic? "
    console.log(zdanie.length)
    let poczatek = ""
    setInterval(() => {
        poczatek = zdanie.substring(1)
        zdanie += poczatek
        element2.placeholder = zdanie
        poczatek = ""
    }, 1000);
}



