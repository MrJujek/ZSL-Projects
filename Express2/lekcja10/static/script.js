function createNewFile() {
    let element = document.createElement("div")
    element.id = "dialognewfile"
    element.innerText = "Input file name:"

    let input = document.createElement("input")
    element.append(input)

    let buttons = document.createElement("div")
    buttons.classList.add("dialogButtons")

    let create = document.createElement("a")
    create.innerText = "Create"
    create.href = "/newFile"//?name=" + input.value

    let cancel = document.createElement("div")
    cancel.innerText = "Cancel"
    cancel.addEventListener("click", () => {
        document.getElementById("dialognewfile").remove()
    })

    input.addEventListener("input", () => {
        create.href = "/newFile?name=" + input.value
    })

    buttons.append(create, cancel)
    element.append(buttons)

    document.body.append(element)
}

function createNewFolder() {
    let element = document.createElement("div")
    element.id = "dialognewfolder"
    element.innerText = "Input folder name:"

    let input = document.createElement("input")
    element.append(input)

    let buttons = document.createElement("div")
    buttons.classList.add("dialogButtons")

    let create = document.createElement("a")
    create.innerText = "Create"
    create.href = "/newFolder?"//?name=" + input.value

    let cancel = document.createElement("div")
    cancel.innerText = "Cancel"
    cancel.addEventListener("click", () => {
        document.getElementById("dialognewfolder").remove()
    })

    input.addEventListener("input", () => {
        create.href = "/newFolder?name=" + input.value
    })

    buttons.append(create, cancel)
    element.append(buttons)

    document.body.append(element)
}