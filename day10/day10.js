const readline = require("readline");
const fs = require("fs");

var input = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});


readInterface.on('line', function(line) {
    input.push(parseInt(line));
});

readInterface.on('close', function() {
    // Get that last passport
    
    var output = part1(input);
    console.log("Part 1: " + output);;
    output = part2(output);
    console.log("Part 2: " + output);
});

const SAMPLE_SIZE = 5;
function part1(input) {
    input.sort((a, b) => a - b);

    var currentJolt = 0;
    var countOne = 0;
    var countThree = 0;

    for (var i=0; i<input.length; i++) {

        var jolt = input[i];

        for (var j=0; j<3; j++) {
            var diff = input[i+j] - currentJolt;
            
            if (diff == 1 ) {
                countOne++;
                break;
            } else if (diff == 3) {
                // i += 2;
                countThree++;
                break;
            }
        }   
        
        currentJolt = jolt;
    }

    // Our final adapter
    countThree++;

    return countOne * countThree;

}

function part2(target) {

}