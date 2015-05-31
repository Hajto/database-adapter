var dataScheme = {
    name: "ds-name",
    surname: "ds-surname",
    nickname: "ds-nickname",
    age: "ds-age",
    zirytowanie: "ds-agrolevel",
    stupidity: "ds-stupidity"
};

function gatherData(){
    var keys = Object.keys(dataScheme);
    var outcome = {};
    outcome.isAwesome = document.getElementById("ds-checkbox").checked;
    for(var i=0; i<keys.length;i++){
        outcome[keys[i]] = document.getElementById(dataScheme[keys[i]]).value
    }
    return outcome
}

function hideWrapper(){
    document.getElementById("wrapper").style.display = "none"
}
function showWrapper(){
    document.getElementById("wrapper").style.display = "block"
}