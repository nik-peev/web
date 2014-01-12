var specialConsole = (function () {

    function stringFormat(message, parameters) {
        var result = "";
        var length = arguments.length;

        if (message) {
            result = message.toString();

            if (parameters) {
                for (var i = 0; i < length - 1; i++) {
                    var pattern = '\\{' + i + '\\}';

                    result = result.replace(new RegExp(pattern, "g"), arguments[i + 1]);
                }
            }
        }

        return result.toString();
    }

    function writeLine(message, parameters) {
        var result = stringFormat(message, parameters);
        var content = document.getElementById('content');
        var p = document.createElement('p');
        var text = document.createTextNode(result);

        p.appendChild(text);
        content.appendChild(p);
    }

    function writeWarning(message, parameters) {
        writeLine.call(this, message, parameters);
    }

    function writeError(message, parameters) {
        writeLine.call(this, message, parameters);
    }

    return {
        writeLine: writeLine,
        writeWarning: writeWarning,
        writeError: writeError
    };
})();

specialConsole.writeLine("Message: Hello!");
specialConsole.writeLine("Message: {0}", "Here 'Hello!' is parameter!");
specialConsole.writeError("Error: {0}", "Something happened");
specialConsole.writeWarning("Warning: {0}", "A warning");
