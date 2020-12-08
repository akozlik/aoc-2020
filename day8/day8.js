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
    var visited = part1();
    part2(visited);
});


function part1() {

    var acc = 0;
    var idx = 0;    

    var visited = [];
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

    return visited;
}

function part2(visited) {

    // Build a list of only the nop and jmp commands
    var filtered = visited.filter((v) => {
        var instruction = instructions[v];
        return (instruction.opcode == "nop" || instruction.opcode == "jmp")
    });

    // Got all the locations of the opcodes
    // Need to loop through each one // swap it // see if we hit the last index
    // If we don't then we need to reset the instruction and move on to the next one
    for (i=0; i<filtered.length; i++) {

        // Swap the instructions
        var filteredIndex = filtered[i];
        var instruction = instructions[filteredIndex];
        instruction.opcode = (instruction.opcode == "nop") ? "jmp" : "nop";
        instructions[filteredIndex] = instruction;

        var acc = 0;
        var idx = 0;
        visited = [];

        // Loop through the program
        while ((!visited.includes(idx)) && !(idx == instructions.length)) {

            instruction = instructions[idx];    
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

        if (idx == instructions.length) {
            i = filtered.length; // Let's get out of the loop
        } else {
            instruction = instructions[filteredIndex];
            instruction.opcode = (instruction.opcode == "nop") ? "jmp" : "nop";
            instructions[filteredIndex] = instruction;
        }
    };

    console.log("Part 2: " + acc);
}