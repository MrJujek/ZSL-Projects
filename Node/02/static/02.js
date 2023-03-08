function clicked() {
    console.log("Clicked");
    console.log(document.getElementById('option').value);

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: document.getElementById("a").value,
            b: document.getElementById('b').value,
            operation: document.getElementById('option').value
        })
    }).then(response => response.text())
        .then(
            data => {
                console.log(data)
            }
        )
}