class Ui {
    constructor() {
        this.mainDiv = document.createElement("div")
        this.dajDane = document.createElement("input")
        this.logujButton = document.createElement("div")
        this.resetButton = document.createElement("div")

        this.mainDiv.classList.add("mainDiv")
        this.mainDiv.innerText = "LOGOWANIE"

        this.logujButton.classList.add("logujButton")
        this.logujButton.innerText = "Zaloguj"

        this.resetButton.classList.add("resetButton")
        this.resetButton.innerText = "Reset"


        this.mainDiv.append(this.dajDane, this.logujButton, this.resetButton)

        document.body.append(this.mainDiv)
    }

}
