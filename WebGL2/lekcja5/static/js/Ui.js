class Ui {
    constructor() {
        this.mainDiv = document.createElement("div")
        this.dajDane = document.createElement("input")
        this.logujButton = document.createElement("div")
        this.resetButton = document.createElement("div")

        this.dajDane.setAttribute("id", "dajDane")

        this.mainDiv.setAttribute("id", "mainDiv")
        this.mainDiv.innerText = "LOGOWANIE"

        this.logujButton.setAttribute("id", "logujButton")
        this.logujButton.innerText = "Zaloguj"

        this.resetButton.setAttribute("id", "resetButton")
        this.resetButton.innerText = "Reset"


        this.mainDiv.append(this.dajDane, this.logujButton, this.resetButton)
        document.body.append(this.mainDiv)

        document.getElementById("logujButton").addEventListener("click", () => {
            this.loguj()
        })
        document.getElementById("resetButton").addEventListener("click", () => {
            this.reset()
        })
    }
    loguj = () => {
        let nick = document.getElementById("dajDane").value

        const body = JSON.stringify({ nick: nick, info: "fetch" })
        const headers = { "Content-Type": "application/json" }
        fetch("/ADD_USER", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    if (data == "userAdded") {
                        game.givePawns()
                    } else if (data == "userExists") {

                    } else if (data == "gameFull") {

                    }

                    // console.log("TU JESTEM");
                } // dane odpowiedzi z serwera
            )
    }

    reset = () => {
        const body = JSON.stringify({ reset: "reset" }) // body czyli przesyłane na serwer dane

        const headers = { "Content-Type": "application/json" } // nagłowek czyli typ danych

        fetch("/RESET", { method: "post", body, headers }) // fetch
            .then(response => response.json())
            .then(
                data => console.log(data) // dane odpowiedzi z serwera
            )
    }

}
