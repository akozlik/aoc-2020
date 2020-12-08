const readline = require("readline");
const fs = require("fs");

var instructions = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});


readInterface.on('line', function(line) {

    var temp = line.split(" ");
    var instruction = {
        opcode: temp[0],
        value: parseInt(temp[1])
    }

    instructions.push(instruction);

});

readInterface.on('close', function() {
    // Get that last passport
    console.log(instructions);
    part1();
    part2();
});


var visited = [];
function part1() {

    var acc = 0;
    var idx = 0;

    while (!visited.includes(idx)) {
    
        var instruction = instructions[idx];

        visited.push(idx);
        switch (instruction.opcode) {
            case "nop":
                idx++;
                break;
            case "acc":
                acc += parseInt(instruction.value);
                idx++;
                break;
            case "jmp":
                idx += instruction.value // Adjust for next iteration
                break;
        }
    }

    console.log("Part 1: " + acc);
}

function part2() {

}