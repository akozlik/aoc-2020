const readline = require("readline");
const fs = require("fs");

var input = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});


var expenses = [];
readInterface.on('line', function(line) {
    var row = line.split('');
    input.push(row);
});

readInterface.on('close', function() {
    part1();
    part2();
});


function part1() {

    const count = findTrees(3, 1);
    
    console.log("Part 1: " + count);
}

function part2() {

    var slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    var product = 1;
    for (i=0; i<slopes.length; i++) {
        product *= findTrees(slopes[i][0], slopes[i][1]);
    }

    console.log("Part 2: " + product);
}

function findTrees(slopeX, slopeY) {

    cursorX = 0;
    cursorY = 0;
       
    var count = 0;
    while (cursorY < input.length-1) {
        cursorX += slopeX;
        cursorY += slopeY;
    
        if (cursorX >= input[cursorY].length) {
            cursorX = cursorX - input[cursorY].length;
        }
    
        var char = input[cursorY][cursorX];
    
        if (char === "#") count++;
    }
    return count;
}