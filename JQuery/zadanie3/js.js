$(document).ready(function () {
    console.log($(window).width())
    $("#blue").css("width", (($(window).width() - 20) / 2) + "px")
    $("#yellow").css("width", (($(window).width() - 20) / 2) + "px")

    $("#line").on("mousedown", function (e) {
        $(window).on("mousemove", function (e) {
            $("#line")
                .css("position", "fixed")
                .css("left", e.clientX - 10 + "px")
                .css("z-index", "1")

            $("#yellow")
                .css("position", "fixed")
                .css("left", e.clientX + "px")
                .css("width", $(window).width() - e.clientX + "px")

            $("#blue")
                .css("position", "fixed")
                .css("left", "0px")
                .css("width", e.clientX + "px")

            $(window).on("mouseup", function (e) {
                $(window).off("mousemove")
            })
        })
    })
})