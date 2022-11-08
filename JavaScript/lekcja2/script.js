//https://www.bioinformatics.org/sms2/random_dna.html

let ciag //= "tgaactatgataataagtttaggatacgcaaaatgttaaagctatgttccctagtga"
do {
    ciag = window.prompt("Podaj ciąg DNA");
    if (ciag.length % 3 != 0) {
        window.alert("Podaj ciag podzielny przez 3!")
    }
} while (ciag.length % 3 != 0)

ciag = ciag.replace(/(\r\n|\n|\r)/gm, "");
/*
to | potem to
m - więcej lini
g - więcej zamian
*/
let nic = ciag;

let nic_komplementarna = ciag.replaceAll("a", "T");
nic_komplementarna = nic_komplementarna.replaceAll("t", "A");
nic_komplementarna = nic_komplementarna.replaceAll("c", "G");
nic_komplementarna = nic_komplementarna.replaceAll("g", "C");

let wszystkie = [];
let j = 0;
let kodon1;

for (let i = 0; i < ciag.length; i = i + 3) {
    kodon1 = (ciag.substring(i, i + 3)).toUpperCase();
    if (!wszystkie.includes(kodon1)) {
        wszystkie[j] = kodon1;
        j++;
    }
}

let wystepowanie = new Array(wszystkie.length).fill(0);
for (let i = 0; i < ciag.length; i = i + 3) {
    kodon1 = (ciag.substring(i, i + 3)).toUpperCase();
    if (wszystkie.includes(kodon1)) {
        wystepowanie[wszystkie.indexOf(kodon1)]++;
    }
}

let po_kolei = true;
while (po_kolei) {
    po_kolei = false
    for (let i = 0; i < wszystkie.length - 1; i++) {
        if (wszystkie[i] > wszystkie[i + 1]) {
            let temp1 = wszystkie[i]
            wszystkie[i] = wszystkie[i + 1]
            wszystkie[i + 1] = temp1

            let temp2 = wystepowanie[i]
            wystepowanie[i] = wystepowanie[i + 1]
            wystepowanie[i + 1] = temp2

            po_kolei = true
        }
    }
}

po_kolei = true;
while (po_kolei) {
    po_kolei = false
    for (let i = 0; i < wszystkie.length - 1; i++) {
        if (wystepowanie[i] < wystepowanie[i + 1]) {
            let temp1 = wystepowanie[i]
            wystepowanie[i] = wystepowanie[i + 1]
            wystepowanie[i + 1] = temp1

            let temp2 = wszystkie[i]
            wszystkie[i] = wszystkie[i + 1]
            wszystkie[i + 1] = temp2

            po_kolei = true
        }
    }
}

document.write("<pre>")
document.write(ciag + "<br>")
for (let i = 0; i < ciag.length; i = i + 3) {
    let kodon = (ciag.substring(i, i + 3)).toUpperCase();
    if (kodon == "TAA" || kodon == "TAG" || kodon == "TGA") {
        document.write('<span style="background: yellow;">')
    } else if (kodon == "ATG") {
        document.write('<b><span style="color: green;">')
    }
    document.write(kodon + "</span></b> ");
}

document.write("<br><br>")
for (let i = 0; i < nic_komplementarna.length; i = i + 3) {
    let kodon = (nic_komplementarna.substring(i, i + 3)).toUpperCase();
    // if (kodon == "TAA" || kodon == "TAG" || kodon == "TGA") {
    //     document.write('<span style="background: yellow;">')
    // } else if (kodon == "ATG") {
    //     document.write('<b><span style="color: green;">')
    // }
    document.write("<span>")
    document.write(kodon + "</span></b> ");
}
document.write("<br>" + nic_komplementarna.toLowerCase())
document.write("<br><br>")

for (let i = 0; i < wszystkie.length; i++) {
    if (i % 5 == 0) {
        document.write('</span><span style="background-color: #' + random_hex(6) + ';">')
    }
    document.write(wszystkie[i] + " - " + wystepowanie[i] + "<br>")
}
document.write("</pre>")

function random_hex(count) {
    let hex = "";
    for (let i = 0; i < count; i++) {
        hex += Math.floor(Math.random() * 15).toString(16)
    }
    return hex
}
