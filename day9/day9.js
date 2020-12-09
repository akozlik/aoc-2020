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

    var invalid = part1();
    console.log("Part 1: " + invalid);
    // console.log("GOT: " + invalid);
    var sum = part2(invalid);
    console.log("Part 2: " + sum);
});

const SAMPLE_SIZE = 25;

function part1() {

    var target;
    for (var i=0; i<input.length-SAMPLE_SIZE; i++) {
        
        var sumgroup = input.slice(i, i+SAMPLE_SIZE);
        target = input[i+SAMPLE_SIZE];
        
        var valid = false;
        for (var j=0; j<sumgroup.length-1; j++) {
            var sum = sumgroup[j] + sumgroup[k]
            for (var k=j+1; k<sumgroup.length; k++) {
                var sum = sumgroup[j] + sumgroup[k]
                if (sum == target) {
                    valid = true;
                }
            }
        }

        if (!valid) {
            break;
        }
    }

    return target;
}

function part2(target) {

    inputloop:
    for (var i=0; i<input.length; i++) {
        
        var valid = false;
        var sum = input[i];
        var sumgroup = [sum];

        if (sum < target) {
            for (var j=i+1; j<input.length; j++) {
                sum += input[j];
                sumgroup.push(input[j]);

                if (sum == target) {
                    valid = true;
                    break inputloop;
                }
            }
        } else {
            continue;
        }
    }

    sumgroup.sort((a, b) => a - b);

    return sumgroup[0] + sumgroup[sumgroup.length-1];
}