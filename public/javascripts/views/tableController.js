function parseFeed(array){
    var table = document.getElementById("mainContainer");
    function createRow(rowOfData){
        function createTd(data){
            var td = document.createElement("td");
            td.innerHTML=data;

            return td;
        }
        var row = document.createElement("tr");
        var keys = Object.keys(dataScheme);
        for(var j=0; j < keys.length; j++){
            row.appendChild(createTd(rowOfData[keys[j]]))
        }

        row.setAttribute("data-id", JSON.stringify(rowOfData["_id"]));

        return row;
    }
    for(var i=0; i < array.length; i++){
        table.appendChild(createRow(array[i]))
    }
}

function clearData(){
    var table = document.getElementById("mainContainer");
    var childNodes = table.childNodes;

    for(var i = 0 ; i < childNodes.length; i++) {
        if (childNodes[i].tagName == "TR" || childNodes[i].nodeName == "TR") {
            table.removeChild(childNodes[i]);
            i--
        }
    }
}