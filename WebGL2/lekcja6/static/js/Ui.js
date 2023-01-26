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
            net.loguj()
        })
        document.getElementById("resetButton").addEventListener("click", () => {
            net.reset()
        })
    }

    waitForSecondPlayer = () => {
        let waitingDiv = document.createElement("div")
        waitingDiv.id = "waitingDiv"
        waitingDiv.innerHTML = "Czekam na drugiego gracza"
        document.body.appendChild(waitingDiv)
    }
}
