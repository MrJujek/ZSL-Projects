$(document).ready(function () {
    let meteroid
    let name
    let jump, fly
    let count = 0, step = 0
    let rocks = []
    let start, destination

    let rocket = $("<div>", { id: "rocket" })
    $("body").append(rocket)

    $("#cosmos").click((e) => {
        name = "meteroid" + count
        meteroid = $("<div>", { id: name, class: "meteroid" })
        $("#cosmos").append(meteroid)
        $("#" + name)
            .css("left", e.clientX - 40 + "px")
            .css("top", e.clientY - 40 + "px")

        $("#" + name).append(count + 1)

        rocks.push({ osx: e.clientX - 40 + "px", osy: e.clientY - 40 + "px" })
        count++;
    })

    $("#steps").click((e) => {
        if (step >= rocks.length) step = 0

        name = "meteroid" + step
        $("#rocket")
            .css("left", rocks[step].osx)
            .css("top", rocks[step].osy)

        step++;
    })

    $("#jumping").click((e) => {
        clearInterval(jump)
        jump = setInterval(() => {
            if (step >= rocks.length) step = 0
            name = "meteroid" + step
            $("#rocket")
                .css("left", rocks[step].osx)
                .css("top", rocks[step].osy)

            step++;
        }, 500)



    })

    $("#fly").click((e) => {
        clearInterval(fly)
        if (step >= rocks.length) step = 0
        let end = step + 1
        if (end >= rocks.length) end = 0

        //console.log("fly_start_end:" + end)

        $("#rocket")
            .css("left", rocks[step].osx + "px")
            .css("top", rocks[step].osy + "px")

        fly = setInterval(() => {
            start = { x: rocks[step].osx, y: rocks[step].osy }
            destination = { x: rocks[end].osx, y: rocks[end].osy }

            console.log("start: " + step)
            console.log("end: " + end)
            console.log("skaly: " + rocks.length)
            console.log(destination.x + " ---------- " + start.x)
            console.log((parseInt(destination.x) - parseInt(start.x)) / 100)

            rocket_fly();
            
            for (let i = 0; i < 100; i++) {
                $("#rocket")
                    .css("left", parseInt($("#rocket").css("left")) + ((parseInt(destination.x) - parseInt(start.x)) / 100) + "px")
                    .css("top", parseInt($("#rocket").css("top")) + ((parseInt(destination.y) - parseInt(start.y)) / 100) + "px")

                console.log("XXXX " + i)
            }

            end++
            if (end >= rocks.length) end = 0
            step++;
            if (step >= rocks.length) step = 0
        }, 5000)
    })

    $("#stop").click((e) => {
        clearInterval(fly)
        clearInterval(jump)
    })

    function rocket_fly() {

    }
})