//defining a stringbuilder class
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}
// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }   
}
// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}
// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}



//task 1
function StringReverse() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a JavaScript function reverses string and returns itExample: 'sample' -> 'elpmas'.");

    var text = prompt();
    var str = new StringBuilder();

    for (var i = text.length-1; i >= 0; i--) {
        str.append(text[i]);
    }
    jsConsole.writeLine(str.toString());
}

//task 2
function CheckForCorrectBrackets() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a JavaScript function to check if in a given expression the brackets are put correctly.Example of correct expression: ((a+b)/5-d).Example of incorrect expression: )(a+b)).");

    var brackets = prompt("Write the bracket expression");
    var flag = parseInt(0);

    for (var i = 0; i < brackets.length; i++)
    {
        if (brackets[i] == "(")
            flag++;
        if (brackets[i] == ")")
            flag--;
        if (flag < 0)
            break;
    }

    jsConsole.writeLine(flag == 0 ? "correct" : "incorrect");
}

//task 3 
function CounterForAppearence() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a JavaScript function that finds how many times a substring is contained in a given text (perform case insensitive search).");

    var text = "We are living in an yellow submarine. We don't have anything else. Inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.".toLowerCase();
    var count = 0;

    //var splitted = text.split(/[.,\/ -]/);
    var index = text.indexOf("in");

    while (index > -1) {
        count++;
        index = text.indexOf("in", index + 1);
    }

    jsConsole.writeLine(count);
}

//task 4
function toUpper(text, openTag, closeTag) {

    var indexStart = text.indexOf(openTag);
    while (indexStart > -1)
    {
        var tmp = text.substring(indexStart + 8, text.indexOf(closeTag, indexStart))
        var toUp = tmp.toUpperCase();
        text = text.replace(tmp, toUp);
        indexStart = text.indexOf(openTag, indexStart + 1);
    }

    jsConsole.writeLine(text);
    return text;
}
function toLower(text, openTag, closeTag)
{
    var indexStart = text.indexOf(openTag);
    while (indexStart > -1) {
        var tmp = text.substring(indexStart + 9, text.indexOf(closeTag, indexStart))
        var toLower = tmp.toLowerCase();
        text = text.replace(tmp, toLower);
        indexStart = text.indexOf(openTag, indexStart + 1);
    }

    jsConsole.writeLine(text);
    return text;
}
function toMix(text, openTag, closeTag)
{
    var sBuild = new StringBuilder();
    var indexStart = text.indexOf(openTag);

    while (indexStart > -1) {
        var tmp = text.substring(indexStart + 9, text.indexOf(closeTag, indexStart))
        {
            var mix = tmp.toLowerCase();
            for (var i = 0; i < mix.length; i++) {
                var rnd = Math.floor(Math.random() * 100);
                if (rnd > 50)
                {
                    sBuild.append(mix[i].toUpperCase());
                }
                else sBuild.append(mix[i].toLowerCase());

            }
            mix = sBuild.toString();
            sBuild.clear();
        }
        text = text.replace(tmp, mix);
        indexStart = text.indexOf(openTag, indexStart + 1);
    }

    jsConsole.writeLine(text);
    return text;
}
function TextCases() {
    jsConsole.writeLine();
    jsConsole.writeLine("You are given a text. Write a function that changes the text in all regions: &#60;upcase>text&#60;/upcase> to uppercase.&#60;lowcase>text&#60;/lowcase> to lowercase&#60;mixcase>text&#60;/mixcase> to mix casing(random)");

    var str = "We are <mixcase>living</mixcase> in a <upcase>yellow submarine</upcase>. We <mixcase>don't</mixcase> have <lowcase>Anything</lowcase> else."
    
    jsConsole.writeLine("The text after the upper case mode: ");
    str = toUpper(str, "<upcase>", "</upcase");
    jsConsole.writeLine("<br>The text after the lower and upper case mode: ");
    str = toLower(str, "<lowcase>", "</lowcase>");
    jsConsole.writeLine("<br>with mixed case added : ");
    str = toMix(str, "<mixcase>", "</mixcase>");
}
            
//task 5
function ReplacingNBSPWithTheHTMLrePresentation() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a function that replaces non breaking white-spaces in a text with \&\\nbsp\;");
    
    var text = "This text is styled with some of the text formatting properties."
    var changeItem = "&nbsp;";
    var str = new StringBuilder();

    for (var i = 0; i < text.length; i++) {
        if (text[i] == " ")
            str.append(changeItem);
        else
            str.append(text[i]);
    }

    jsConsole.writeLine(str);
}

//task 6
function RemoveTags() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a function that extracts the content of a html page given as text. The function should return anything that is in a tag, without the tags.");
    
    var text = "<html><head><title>Sample site</title></head><body><div>text<div>more text</div>and more...</div>in body</body></html>";
    var str = new StringBuilder();
    var flag = false;

    for (var i = 0; i < text.length; i++) {
        if (text[i] == "<")
            flag = true;
        if (text[i] == ">" && flag == true)
        {
            flag = false
            continue;
        }
        if (!flag)
        {
            str.append(text[i]);
        }
    }

    jsConsole.writeLine(str);
}

//task7
function DataUrl(protocol, server, resourse)
{
    return {
        Protocol : protocol,
        Server: server,
        Resourse: resourse,
        toString: function () {
            return "{protocol: " + "\"" + this.Protocol+ "\"," + "<br>" + " server:" + "\"" + this.Server+ "\"," + "<br>" + " resourse:" + "\"" + this.Resourse+ "\"}"
        }
    }
}
function ExtractURL()
{
    jsConsole.writeLine();
    jsConsole.writeLine("Write a script that parses an URL address");

    var url = prompt("input a valid URL");

    var Protocol = url.split(':');
    var index = Protocol[1].indexOf("//");
    var finalIndex = Protocol[1].indexOf("/", 3);

    var prot = Protocol[0];
    var server = Protocol[1].substring(2, finalIndex);
    var resourse = Protocol[1].substring(finalIndex, Protocol[1].length);

    var obj = new DataUrl(prot, server, resourse);
    jsConsole.writeLine(obj);
}

//task 8
function AnchorToUrl()
{
    jsConsole.writeLine();
    jsConsole.writeLine("Write a JavaScript function that replaces in a HTML document given as string.");

    var text = "<p>Please visit <a href='http://academy.telerik. com'>our site</a> to choose a training course. Also visit <a href='www.devbg.org'>our forum</a> to discuss the courses.</p>".

    i = text.indexOf("<a");
    while (i >= -1) {
        text.replace("<a href=", "[URL=");
        text.replace("</a>", "[/URL]");
        i = text.indexOf("<a",i+1);
    }

    jsConsole.writeLine(text);
}

//task 9
function ExtractingEmails()
{
    jsConsole.writeLine();
    jsConsole.writeLine("Write a function for extracting all email addresses from given text.");

    var text = "bvatsarov@gmail.com e tozi moq tvoq negoviqt asdas@adsadasdwaijskdj123123.sdadwawd ili !#@!#1321 1231 tisho@abv.bg ";
    var pattern = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;

    var stringB = new StringBuilder();
    var splitted = text.split(" ");

    for (var i = 0; i < splitted.length; i++) {
        //alert(splitted[i].match(pattern))
        if (splitted[i].match(pattern))
        {
            stringB.append(splitted[i]+ " ");
        }
    }

    jsConsole.writeLine(stringB);
}

//task 10
function Palindrom() {
    jsConsole.writeLine();
    jsConsole.writeLine("Write a program that extracts from a given text all palindromes, e.g. 'ABBA', 'lamal', 'exe'.");

    var text = "abvabasd abba oligofren lananal axe amadam lol wow bol mol mall";
    jsConsole.writeLine("<br>From text : <br>" + text + "<br>Palindromes are : ");
    var splitted = text.split(" ");

    var str = new StringBuilder();

    for (var i = 0; i < splitted.length; i++) {
        var item = splitted[i];
        for (var j = item.length-1; j >=0; j--) {
            str.append(item[j]);
        }
        if(item == str.toString())
            jsConsole.writeLine(item);

        str.clear();
    }
}

//task 11 unable to do it..just can't comprehand the logic behind
//task 12 is on another file in the directory
function Task12()
{
    jsConsole.writeLine("task 12 is on another file in the directory");
}