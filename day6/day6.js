const readline = require("readline");
const fs = require("fs");

var input = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

var input = [];

var questionData = "";
var group = [];

function removeDuplicates(string) {

    string = string.split('').sort().filter((v, i, self) => {            
        return self.indexOf(v) == i;
    });
    
    return string;
}

readInterface.on('line', function(line) {

    if (line === "") {
        input.push(group);
        group = [];
    } else {
        group.push(line);
    }
});

readInterface.on('close', function() {
    // Get that last passport
    input.push(group);

    part1();
    part2();
});


function part1() {
        
    var sum = 0;

    for (i=0; i<input.length; i++) {

        var string = input[i].join("");
        string = removeDuplicates(string);
        sum += string.length;
    }

    console.log("Part 1: " + sum);
}

function part2() {

    sum=0;
    for (i=0; i<input.length; i++) {
        
        var string = input[i].join("").split('').sort().join('');

        for (idx=0; idx<string.length; idx++) {
            var char = string[idx];
            var regex = new RegExp(char, "g");
            var count = (string.match(regex) || []).length;
        
            if (count == input[i].length) {
                sum++;
            }

            idx+= count-1;
        }
    }

    console.log("Part 2: " + sum);

}
