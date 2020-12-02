const input = require("./input.json");

var count = 0;
input.passwords.forEach((v, i) => {
    var input = parseInput(v);
    var regex = new RegExp("[^" + input.character + "]+", "g");
    var newPassword = input.password.replace(regex, "");
    if (newPassword.length >= input.min && newPassword.length <= input.max) {
        count++;
    }
});
console.log("Count: " + count);

var temp = input.passwords.filter((v, i) => {
    var input = parseInput(v);
    var regex = new RegExp("[^" + input.character + "]+", "g");
    var newPassword = input.password.replace(regex, "");
    return (newPassword.length >= input.min && newPassword.length <= input.max) 
});

console.log("Count: " + temp.length);

function parseInput(input) {
    var temp = input.split(" ");
    var range = temp[0].split("-");
    const min = range[0];
    const max = range[1];

    const character = temp[1].replace(":", "");
    const password = temp[2];

    var result = {
        min: range[0],
        max: range[1],
        character: character,
        password: password
    }

    return result;
}