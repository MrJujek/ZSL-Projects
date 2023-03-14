let save = false,
    read = false;

document.getElementById("startSaving").addEventListener("click", () => {
    save = !save;

    if (save) {
        document.getElementById("startSaving").innerText = "Stop saving";
    } else {
        document.getElementById("startSaving").innerText = "Start saving";
    }

    console.log("startSaving:", save);

    sendFetch();
})

document.getElementById("startReading").addEventListener("click", () => {
    read = !read;

    if (read) {
        document.getElementById("startReading").innerText = "Stop reading";
    } else {
        document.getElementById("startReading").innerText = "Start reading";
    }

    console.log("startReading:", read);

    sendFetch();
})

function sendFetch() {
    const body = JSON.stringify({ save: save, read: read })
    const headers = { "Content-Type": "application/json" }

    fetch("/", { method: "post", body, headers })
        .then(response => response.json())
        .then(
            data => console.log(data)
        )
}