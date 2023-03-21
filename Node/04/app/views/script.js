document.getElementById("add").addEventListener("click", function () {
    console.log("add");

    let data = ["default", "default"]

    for (let i = 0; i < document.getElementsByClassName("animals")[0].children.length; i++) {
        if (document.getElementsByClassName("animals")[0].children[i].classList.contains("selected")) {
            data[0] = document.getElementsByClassName("animals")[0].children[i].id
            break;
        }
    }
    for (let i = 0; i < document.getElementsByClassName("colors")[0].children.length; i++) {
        if (document.getElementsByClassName("colors")[0].children[i].classList.contains("selected")) {
            data[1] = document.getElementsByClassName("colors")[0].children[i].id
            break;
        }
    }

    //console.log(data);

    fetch("/add", {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(data => {
            window.alert(JSON.stringify(data, null, 5))
        })
});

document.getElementById("getall").addEventListener("click", function () {
    console.log("getall");
    fetch("/getall", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            window.alert(JSON.stringify(data, null, 5))
        })
});

document.getElementById("delete").addEventListener("click", function () {
    console.log("delete");
});

document.getElementById("update").addEventListener("click", function () {
    console.log("update");
});

function choose(element) {
    //console.log(element);

    if (element.classList.contains("selected")) {
        element.classList.remove("selected");
    } else {
        for (let i = 0; i < element.parentElement.children.length; i++) {
            element.parentElement.children[i].classList.remove("selected");
        }

        element.classList.add("selected");
    }
}