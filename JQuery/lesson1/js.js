$(document).ready(function () {
    let count = 0
    $("#div").css("width", 200 + "px").css("height", 200 + "px").css("background-color", "orange").css("user-select", "none")
    $("#div").html(count)

    $("#div").on("click", () => {
        count++
        $("#div").html(count)

        if (count % 2 == 0) {
            $("#div").css("background-color", "orange")
        } else {
            $("#div").css("background-color", "red")
        }
    })
})