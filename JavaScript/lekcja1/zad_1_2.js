// ZAD 1
document.write("<b>Witaj JavaScript!</b><br>")

for (let i = -22; i < 22; i++) {
    document.write(i + "<br>")
}
document.write("<br>")

for (let i = 55; i > -15; i--) {
    if (i % 5 == 0) {
        document.write(i + " ")
    }
}
document.write("<br><br>")

for (let i = 40; i >= 10; i--) {
    if (!(i > 15 && i < 25)) {
        document.write(i + " ")
    }
}

// ZAD 2
for (let i = -40; i < 40; i++) {
    if (!(i >= 3 && i < 30)) {
        if (Math.abs(i) % 2 == 1) {
            console.log(i)
        }
    }
}
console.log("")

for (let i = -20; i < 20; i++) {
    if (!(i > 5 && i < 10)) {
        if (Math.abs(i) % 2 == 0) {
            console.log(i)
        }
    }
}
console.log("")

for (let i = -100; i < 41; i++) {
    if (!(i > -28 && i < 14)) {
        if (Math.abs(i) % 7 == 0) {
            console.log(i)
        }
    }
}