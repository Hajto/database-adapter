function init() {
    selectSlaves();

    document.getElementById("ds-submit").addEventListener("submit", createSlave, false);
    document.addEventListener("keypressed", function (event) {
        switch (event.which) {
            case 27:
                alert("Worczy");
                hideWrapper();
                break;
            default:
                break;
        }
        console.log(event.which)
    }, false);
    document.getElementById("wrapper").addEventListener("click", function (event) {
        if (event.target.id == "wrapper") {
            hideWrapper();
        }
        event.stopPropagation()
    }, false);
}