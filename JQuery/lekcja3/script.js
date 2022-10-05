$(document).ready(function () {
    let iloscPol

    do {
        iloscPol = window.prompt("Podaj ilosc pol")
        if (!(iloscPol >= 9)) {
            window.alert("Musisz podac co najmniej 9 pol")
        }
    } while (!(iloscPol >= 9))

    let pozycja = []
    let postep1 = 0
    let postep2
    let koniec = false


    let nrPola = 0

    for (let i = 0; i < iloscPol; i++) {
        for (let j = 0; j < Math.sqrt(iloscPol); j++) {
            $("#mainDiv").append("<div id=box" + nrPola + ">")
            $("#box" + nrPola)
                .css("position", "absolute")
                .css("top", i * 50 + "px")
                .css("left", j * 50 + "px")
                .css("width", "50px")
                .css("height", "50px")
                .css("background", "gray")
                .css("border", "1px solid black")

            nrPola++

            if (nrPola >= iloscPol) {
                koniec = true
                break
            } else {
                koniec = false
            }

        }
        if (koniec) {
            break
        }
    }

    $("#mainDiv").prepend("<div id='kolko1'>")
    $("#mainDiv").prepend("<div id='kolko2'>")

    $("#mainDiv")
        .css("position", "relative")
        .css("margin", "0px auto 0px")
        .css("width", Math.sqrt(iloscPol) * 50)

    $("#start").on("click", () => {
        $("#kolko1")
            .css("height", "50px")
            .css("width", "50px")
            .css("background", "blue")
            .css("border-radius", "50%")
            .css("position", "absolute")
            .css("z-index", "10")
        $("#kolko2")
            .css("height", "50px")
            .css("width", "50px")
            .css("background", "green")
            .css("border-radius", "50%")
            .css("position", "absolute")
            .css("z-index", "10")

        $("#kolko1")
            .css("left", "-100px")
            .css("top", "0px")
        $("#kolko2")
            .css("left", "-100px")
            .css("top", "100px")


        console.log(Math.sqrt(iloscPol))

        for (let i = 0; i < iloscPol; i++) {
            $("#box" + i).css("background", "gray")
            
            $("#box" + i).on("click", function () {
                $(this).css("background", "yellow")
                let x = $(this).css("left")
                let y = $(this).css("top")
                let pole = { osx: x, osy: y }
                pozycja.push(pole)

                postep2 = pozycja.length - 1
                //console.log(pozycja)
            })
        }


        $("#next").on("click", function () {
            //console.log(pozycja)
            console.log(postep2)
            //console.log(pozycja[postep2])
            //console.log(pozycja[postep1].osy)

            $("#kolko1")
                .css("left", pozycja[postep1].osx)
                .css("top", pozycja[postep1].osy)
            $("#kolko2")
                .css("left", pozycja[postep2].osx)
                .css("top", pozycja[postep2].osy)

            // console.log(postep1)
            // console.log(pozycja)
            // console.log(pozycja[postep2].osx)


            postep1++
            postep2--

            if (postep2 < 0) {
                $("#next").prop("disabled", true);
            }
        })
    })

    $("#reset").on("click", function () {
        for (let i = 0; i < iloscPol; i++) {
            $("#box" + i).css("background", "gray")
        }
        pozycja = []
        $("#kolko1")
            .css("left", "-100px")
            .css("top", "0px")
        $("#kolko2")
            .css("left", "-100px")
            .css("top", "100px")

        postep1 = 0

        $("#next").prop("disabled", false);

    })
})
