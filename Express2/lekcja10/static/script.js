function createNewFile() {
    let element = document.createElement("div")
    element.id = "dialognewfile"
    element.innerText = "Input file name:"

    let form = document.createElement("form")
    form.method = "POST"
    form.action = "/newFile"

    let input = document.createElement("input")
    form.append(input)

    let buttons = document.createElement("div")
    buttons.classList.add("dialogButtons")

    let create = document.createElement("button")
    create.type = "submit"
    create.innerText = "Create"

    let cancel = document.createElement("div")
    cancel.innerText = "Cancel"
    cancel.addEventListener("click", () => {
        document.getElementById("dialognewfile").remove()
    })

    input.addEventListener("input", () => {
        form.action = "/newFile?name=" + input.value
    })

    buttons.append(create, cancel)
    form.append(buttons)
    element.append(form)

    document.body.append(element)
}

function createNewFolder() {
    let element = document.createElement("div")
    element.id = "dialognewfolder"
    element.innerText = "Input file name:"

    let form = document.createElement("form")
    form.method = "POST"
    form.action = "/newFolder"

    let input = document.createElement("input")
    form.append(input)

    let buttons = document.createElement("div")
    buttons.classList.add("dialogButtons")

    let create = document.createElement("button")
    create.type = "submit"
    create.innerText = "Create"

    let cancel = document.createElement("div")
    cancel.innerText = "Cancel"
    cancel.addEventListener("click", () => {
        document.getElementById("dialognewfolder").remove()
    })

    input.addEventListener("input", () => {
        form.action = "/newFolder?name=" + input.value
    })

    buttons.append(create, cancel)
    form.append(buttons)
    element.append(form)

    document.body.append(element)
}