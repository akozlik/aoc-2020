const input = require("./input.json");

var count = 0;
input.passwords.forEach((v, i) => {
    var input = parseInputWithRegex(v);
    
    var regex = new RegExp("[^" + input.character + "]+", "g");
    var newPassword = input.password.replace(regex, "");
    if (newPassword.length >= input.min && newPassword.length <= input.max) {
        count++;
    }
});
console.log("Part 1 Looped: " + count);

var temp = input.passwords.filter((v, i) => {
    var input = parseInputWithRegex(v);
    var regex = new RegExp("[^" + input.character + "]+", "g");
    var newPassword = input.password.replace(regex, "");
    return (newPassword.length >= input.min && newPassword.length <= input.max) 
});

console.log("Part 1 Filtered: " + temp.length);

count = 0;
var part2 = input.passwords.filter((v, i) => {
    var input = parseInputWithRegex(v);
    var first = input.password[input.min-1];
    var last = input.password[input.max-1];
    return (first != last && (first === input.character || last === input.character))
});

console.log("Part 2: " + part2.length);

function parseInputWithRegex(input) {
    var parts = input.match(/(\d+)-(\d+) (\w): (\w+)/);

    var result = {
        min: parts[1],
        max: parts[2],
        character: parts[3],
        password: parts[4]
    }

    return result;
}

function parseInputWithSplit(input) {
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