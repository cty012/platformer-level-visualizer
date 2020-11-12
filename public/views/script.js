const xhttp = window.XMLHttpRequest? new XMLHttpRequest() : new ActiveXObject();

window.onload = () => {
    requestData("/json", json_data => {
        updateMap(JSON.parse(json_data));
    });
    setInterval(() => {
        requestData("/json", json_data => {
            updateMap(JSON.parse(json_data));
        });
    }, 1000);
}

function requestData(url, callback) {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.responseText);
        }
    };
    xhttp.open("GET", url);
    xhttp.send();
}

function updateMap(map_data) {
    var map = document.getElementById("map");
    var map_size = map_data["map"]["size"];
    map.setAttribute("style", `width:${map_size[0]}px;height:${map_size[1]}px;`);
    map.innerHTML = `
        ${getPlayerHTML(map_data["player"])}
        ${getStaticHTML(map_data["map"]["target"], "target")}
        ${getStaticHTML(map_data["map"]["coin"], "coin")}
        ${getStaticHTML(map_data["map"]["switch"], "switch")}
        ${getMovableHTML(map_data["map"]["monster"], "monster")}
        ${getMovableHTML(map_data["map"]["elevator"], "elevator")}
        ${getStaticHTML(map_data["map"]["obstacle"], "obstacle")}
    `;
}

function getPlayerHTML(player_data) {
    var style = `
        left: ${player_data["pos"][0]}px;
        top: ${player_data["pos"][1]}px;
        width: ${player_data["size"][0]}px;
        height: ${player_data["size"][1]}px;
        line-height: ${player_data["size"][1]}px;
        background-color: rgb(${player_data["color"]});
    `;
    return `<div id="player" class="obj player abs" style="${style}">player</div>`;
}

function getStaticHTML(static_data, type) {
    var html = ``;
    static_data.forEach(static => {
        var style = `
            left: ${static["pos"][0]}px;
            top: ${static["pos"][1]}px;
            width: ${static["size"][0]}px;
            height: ${static["size"][1]}px;
            line-height: ${static["size"][1]}px;
            background-color: rgb(${static["color"]});
        `;
        html += `<div id="${static["name"]}" class="obj ${type} abs" style="${style}">${static["name"]}</div>`;
    });
    return html;
}

function getMovableHTML(movable_data, type) {
    var html = ``;
    movable_data.forEach(movable => {
        var style = `
            left: ${movable["track"][0]["pos"][0]}px;
            top: ${movable["track"][0]["pos"][1]}px;
            width: ${movable["size"][0]}px;
            height: ${movable["size"][1]}px;
            line-height: ${movable["size"][1]}px;
            background-color: rgb(${movable["color"]});
        `;
        html += `<div id="${movable["name"]}" class="obj ${type} abs" style="${style}">${movable["name"]}</div>`;
    });
    return html;
}

function rgb(color) {
    return `rgb(${rgbToHex(color[0])}${rgbToHex(color[1])}${rgbToHex(color[2])})`
}
