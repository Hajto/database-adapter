function parseFeed(array) {
    function genEdit() {
        function genConfirm() {
            var confirmButton = document.createElement("i");
            confirmButton.className = "fa fa-check fa-2x";
            confirmButton.addEventListener("click", function (event) {
                console.log(collectDataForUpdate(getClosest(event.target, "tr")))
            }, false);

            return confirmButton
        }

        var editButton = document.createElement("i");

        editButton.className = "fa fa-pencil fa-2x";
        editButton.addEventListener("click", function (event) {
            var keys = Object.keys(dataScheme);
            var tr = getClosest(event.target, "tr");
            var tds = tr.childNodes;

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = false;
            var isChecked = tds[0].childNodes[0].getAttribute("data-isawesome");
            //alert(isChecked);
            if (isChecked == "true")
                checkbox.checked = true;
            checkbox.setAttribute("data-previouscontent", isChecked);

            tds[0].innerHTML = "";
            tds[0].appendChild(checkbox);

            for (var i = 1; i < tds.length - 1; i++) {
                //console.log(tds[i]);
                var currentData = tds[i].innerHTML;
                var input = document.createElement("input");
                input.type = "text";
                input.value = currentData;
                input.setAttribute("data-previouscontent", currentData);
                input.setAttribute("data-coresponding-field", keys[i - 1]);

                tds[i].innerHTML = "";
                tds[i].appendChild(input)
            }

            tds[tds.length - 1].innerHTML = "";
            tds[tds.length - 1].appendChild(genConfirm());

        }, false);

        return editButton;
    }

    function genDelete() {
        var editButton = document.createElement("i");

        editButton.className = "fa fa-trash-o fa-2x";
        editButton.addEventListener("click", function (event) {
            var closest = getClosest(event.target, "tr");
            deleteSlave(closest.getAttribute("data-id"))
        }, false);

        return editButton;
    }

    function genCanvas(ischecked) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("data-isawesome", ischecked);
        canvas.style.height = "100px";
        canvas.style.width = "100px";

        var context = canvas.getContext("2d");
        context.strokeStyle = "#000000";
        context.beginPath();
        context.moveTo(0, 75);
        context.lineTo(400, 75);
        context.stroke();
        if (ischecked) {
            context.strokeWidth = "10px";
            context.moveTo(149, 150);
            context.lineTo(151, 0);
            context.stroke()
        }


        return canvas;
    }

    var table = document.getElementById("mainContainer");

    function createRow(rowOfData) {
        function createTd(data) {
            var td = document.createElement("td");
            td.innerHTML = data;

            return td;
        }

        var row = document.createElement("tr");

        var canvasTD = document.createElement("td");
        var canvas = genCanvas(rowOfData["isAwesome"]);
        canvasTD.appendChild(canvas);
        row.appendChild(canvasTD);

        var keys = Object.keys(dataScheme);
        for (var j = 0; j < keys.length; j++) {
            row.appendChild(createTd(rowOfData[keys[j]]))
        }

        var options = document.createElement("td");
        options.appendChild(genEdit());
        options.appendChild(genDelete());
        options.style.textAlign = "center";
        options.style.letterSpacing = "10px";
        row.appendChild(options);

        row.setAttribute("data-id", rowOfData["_id"]["$oid"]);

        return row;
    }

    for (var i = 0; i < array.length; i++) {
        table.appendChild(createRow(array[i]))
    }
}

function clearData() {
    var table = document.getElementById("mainContainer");
    var childNodes = table.childNodes;

    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].tagName == "TR" || childNodes[i].nodeName == "TR") {
            table.removeChild(childNodes[i]);
            i--
        }
    }
}

function getClosest(el, tag) {
    tag = tag.toUpperCase();
    do {
        if (el.nodeName === tag) {
            return el;
        }
    } while (el = el.parentNode);
    return null;
}

function collectDataForUpdate(trReference) {
    var childNodes = trReference.childNodes;
    var keys = Object.keys(dataScheme);
    var outcome = {};
    var datasetChanged = false;

    if (childNodes[0].childNodes[0].checked != childNodes[0].childNodes[0].getAttribute("data-previouscontent")) {
        outcome["isAwesome"] = childNodes[0].childNodes[0].checked;
        datasetChanged = true
    }

    for (var i = 1; i < childNodes.length - 1; i++) {
        if (childNodes[i].childNodes[0].value != childNodes[i].childNodes[0].getAttribute("data-previouscontent")) {
            outcome[keys[i - 1]] = childNodes[i].childNodes[0].value;
            datasetChanged = true;
        }
    }

    if (datasetChanged) {
        outcome["_id"] = trReference.getAttribute("data-id")
        updateSlave(outcome)
    }

    return outcome;
}