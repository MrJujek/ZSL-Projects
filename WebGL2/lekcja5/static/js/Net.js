class Net {
    constructor() {
        this.playerInfo = document.getElementById("playerInfo")
        this.mainDiv = document.getElementById("mainDiv")
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
                    if (data == "1") {
                        game.givePawns()
                        game.setPlayer(1)
                        this.mainDiv.remove()
                        this.playerInfo.innerHTML = nick + " grasz bialymi"
                    } else if (data == "2") {
                        game.givePawns()
                        game.setPlayer(2)
                        this.mainDiv.remove()
                        this.playerInfo.innerHTML = nick + " grasz czarnymi"
                    } else if (data == "userExists") {
                        this.playerInfo.innerHTML = data
                    } else if (data == "gameFull") {
                        this.playerInfo.innerHTML = data
                    }
                }
            )
    }

    reset = () => {
        const body = JSON.stringify({ reset: "reset" })

        const headers = { "Content-Type": "application/json" }

        fetch("/RESET", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    this.playerInfo.innerHTML = data
                    document.getElementById("dajDane").value = ""
                    console.log(data)
                }

            )
    }

}