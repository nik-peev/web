

function randomColor() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + ")";
}

function createDivs() {
    var number = parseInt(document.getElementById("numberOfDivs").value);
    for (var i = 0; i < number; i++) {
        var randomLeft = Math.floor(Math.random() * 1200);
        var randomTop = Math.floor(Math.random() * (550 - 70) + 70);
        var randomWidth = Math.floor(Math.random() * (100 - 20) + 20);
        var randomHeight = Math.floor(Math.random() * (100 - 20) + 20);
        var randomBorderRadius = Math.floor(Math.random() * 100);
        var randomBorderWidth = Math.floor(Math.random() * (20 - 1) + 1);

        var div = document.createElement("div");
        div.innerHTML = "<strong>div</strong>";
        div.style.textAlign = "center";
        div.style.position = "absolute";
        div.style.top = randomTop + "px";
        div.style.left = randomLeft + "px";
        div.style.height = randomHeight + "px";
        div.style.width = randomWidth + "px";
        div.style.color = randomColor();
        div.style.borderRadius = randomBorderRadius + "px";
        div.style.border = randomBorderWidth + "px solid " + randomColor();
        div.style.backgroundColor = randomColor();
        document.body.appendChild(div);
    }
}
