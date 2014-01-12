'use strict';

function generateTagCloud(tags, minFontSize, maxFontSize) {
    var numberArray = [], i, j;
    var maxNumber = 0, minNumber = Number.MAX_VALUE;

    // count tags and remove duplicates
    for (i = 0; i < tags.length; i++) {
        numberArray[i] = 1;
        tags[i].toLowerCase();
        for (j = i + 1; j < tags.length; j++) {
            if (tags[i] == tags[j].toLowerCase()) {
                numberArray[i]++;
                tags.splice(j, 1);
                j--;
            }
        }

        // finds the smallest and the biggest number of tags
        if (maxNumber < numberArray[i])
            maxNumber = numberArray[i];
        if (minNumber > numberArray[i])
            minNumber = numberArray[i];
    }
    
    i = 0;
    var newTag, fontSizeStep;
    var documentFragment = document.createDocumentFragment();

    fontSizeStep = parseInt((maxFontSize - minFontSize) / (maxNumber - minNumber));

    // create spans with every unique tag inside and the appropriate fontsize
    while (i < tags.length) {
        newTag = document.createElement('span');
        newTag.innerText = tags[i];
        newTag.style.fontSize = minFontSize + fontSizeStep * numberArray[i] + 'px';
        newTag.style.backgroundColor = generateRandomColor();
        newTag.style.color = generateRandomColor();
        newTag.style.borderRadius = 10 * numberArray[i] + 'px';
        newTag.style.padding = 3 * numberArray[i] + 'px';
        newTag.style.top = generateRandomNum(0, 200) + 'px';
        newTag.style.left = generateRandomNum(0, 50) + 'px';
        newTag.style.position = 'relative';
        documentFragment.appendChild(newTag);
        i++;
    }

    var contentDiv = document.getElementById('content');
    contentDiv.appendChild(documentFragment);
}

function generateRandomColor() {
    var red = generateRandomNum(0, 255);
    var green = generateRandomNum(0, 255);
    var blue = generateRandomNum(0, 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function generateRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function execute() {
    var input = document.getElementById('contentArea').value;
    var tags = input.split(', ');
    var minFontSizeInput = document.getElementById('minFontSize').value | 0;
    var maxFontSizeInput = document.getElementById('maxFontSize').value | 0;
    generateTagCloud(tags, minFontSizeInput, maxFontSizeInput);
}