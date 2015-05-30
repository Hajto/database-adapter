function createSlave(event){
    var connection = new _haitoRequest(
        "create",
        "POST",
        gatherData(),
        function(){
            alert("Success")
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