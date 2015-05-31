function createSlave(event){
    var connection = new _haitoRequest(
        "create",
        "POST",
        gatherData(),
        function(){
            alert("Success");
            selectSlaves()
        },
        function(){
            alert("Ups coś poszło nie tak");
        }
    );
    event.preventDefault();
    console.log(connection.data);
    ajaxAPI(connection);
    return false
}

function selectSlaves(event){
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