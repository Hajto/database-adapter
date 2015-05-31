function createSlave(event) {
    var connection = new _haitoRequest(
        "create",
        "POST",
        gatherData(),
        function () {
            alert("Success");
            selectSlaves()
        },
        function () {
            alert("Ups coś poszło nie tak");
        }
    );
    event.preventDefault();
    console.log(connection.data);
    ajaxAPI(connection);
    return false
}

function selectSlaves(event) {
    clearData();
    var connection = new _haitoRequest(
        "all",
        "GET",
        {},
        function (response) {
            console.log(JSON.parse(response));
            parseFeed(JSON.parse(response))
        },
        function (response) {
            alert(response)
        }
    );
    ajaxAPI(connection)
}

function deleteSlave(id) {
    var connection = new _haitoRequest(
        "remove",
        "POST",
        {_id: id},
        function (response) {
            selectSlaves()
        },
        function (response) {
            alert(response)
        }
    );
    if (confirm("Czy na pewno chcesz usunąć ziomka?"))
        ajaxAPI(connection)
}

function updateSlave(data) {
    var connection = new _haitoRequest(
        "update",
        "POST",
        data,
        function (response) {
            selectSlaves()
        },
        function (response) {
            alert(response)
        }
    );
    ajaxAPI(connection)
}