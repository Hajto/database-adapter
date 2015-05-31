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
    var inputs = document.querySelectorAll(".numberOnly");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
    }

}