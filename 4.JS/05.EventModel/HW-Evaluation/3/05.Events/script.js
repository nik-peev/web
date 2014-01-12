var carousel = (function () {
    var images = [];
    var currentImage = 0;
    var intervalID;

    function addImage(name) {
        var container = document.getElementById("container");
        var image = document.createElement("img");
        image.setAttribute("src", name);
        image.style.display = "none";
        images.push(image);
        container.appendChild(image);
    }

    function updateContainer() {
        images[currentImage].style.display = "none";
        currentImage += 1;
        if (currentImage == images.length) {
            currentImage = 0;
        }
        images[currentImage].style.display = "";
    }

    function nextImage() {
        clearInterval(intervalID);
        updateContainer();
        start();
    }

    function previousImage() {
        clearInterval(intervalID);
        images[currentImage].style.display = "none";
        currentImage -= 1;
        if (currentImage == -1) {
            currentImage = images.length - 1;
        }
        images[currentImage].style.display = "";
        start();
    }

    function start() {
        images[currentImage].style.display = "";
        intervalID = setInterval(updateContainer, 3000);
    }

    return {
        addImage: addImage,
        start: start,
        nextImage: nextImage,
        previousImage: previousImage
    }
})();