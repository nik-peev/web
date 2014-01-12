var a = parseFloat(prompt("First number:"));
var b = parseFloat(prompt("Second number:"));
var c = parseFloat(prompt("Third number:"));
if ((a > b) && (b > c)){
            console.log("The descending order of the enterd numbers is as follows: " + a + " " + b + " " + c);
        }
        else if ((a > b) && (c > b)){
            console.log("The descending order of the enterd numbers is as follows: " + a + " " + c + " " + b);
        }
        else if ((b > a) && (a > c)){
            console.log("The descending order of the enterd numbers is as follows: " + b + " " + a + " " + c);
        }
        else if ((c > a) && (a > b)){
            console.log("The descending order of the enterd numbers is as follows: " + c + " " + a + " " + b); 
        }
        else if ((c > a) && (b > a)){
            console.log("The descending order of the enterd numbers is as follows: " + c + " " + b + " " + a);
        }
        else if ((b > c) && (c > a)) {
            console.log("The descending order of the enterd numbers is as follows: " + b + " " + c + " " + a);
        }
        else{
            console.log("Two or all of the entered numbers have equal values"); 
        }