var pics = [];
var webAddress = 'http://www.shristoff.com/WebGallery/images/pic';

for (var i = 1; i <= 7; i++) {
    pics[i - 1] = webAddress + i + '.JPG';
}

var picsIndex = 0;
var carouselPic = document.getElementById("carouselPic");

function onLeftClick() {
    if (picsIndex === pics.length - 1) {
        picsIndex = 0;
    }
    else {
        picsIndex++;
    }

    carouselPic.src = pics[picsIndex];
}

function onRightClick() {
    if (picsIndex === 0) {
        picsIndex = pics.length - 1;
    }
    else {
        picsIndex--;
    }

    carouselPic.src = pics[picsIndex];
}