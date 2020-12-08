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
    part1();
    part2();
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
}

function part2() {
    var acc = 0;
    var idx = 0;

    var visited = [];

    // Loop through and get all the visited instructions
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
    
    // Build a list of only the nop and jmp commands
    var filtered = visited.filter((v) => {
        var instruction = instructions[v];
        return (instruction.opcode == "nop" || instruction.opcode == "jmp")
    });

    // Got all the locations of the opcodes
    // Need to loop through each one // swap it // see if we hit the last index
    // If we don't then we need to reset the instruction and move on to the next one
    var eof = false;
    while (!eof) {
        for (i=0; i<filtered.length; i++) {

            var filteredIndex = filtered[i];
            var instruction = instructions[filteredIndex];
            console.log(instruction);
            instruction.opcode = (instruction.opcode == "nop") ? "jmp" : "nop";
            instructions[filteredIndex] = instruction;

            acc = 0;
            idx = 0;
            visited = [];

            console.log("Trying: " + filteredIndex);
            console.log(instructions);

            var instruction = {}
            while (!visited.includes(idx) || idx == instructions.length) {
    
                
                instruction = instructions[idx];
                // console.log(instruction);
        
                visited.push(idx);
                switch (instruction.opcode) {
                    case "nop":
                        idx++;
                        break;
                    case "acc":
                        console.log("Acc: " + acc);
                        acc += parseInt(instruction.value);
                        idx++;
                        break;
                    case "jmp":
                        idx += instruction.value // Adjust for next iteration
                        break;
                }

                // console.log(idx + " " + instructions.length);
                if (idx == instructions.length) {
                    console.log("It's the real thing");
                    console.log(acc);
                    eof = true;
                }
            }

            if (eof) {
                console.log("hit EOF");
            } else {
                instruction = instructions[filteredIndex];
                instruction.opcode = (instruction.opcode == "nop") ? "jmp" : "nop";
                instructions[filteredIndex] = instruction;

                console.log("Reeset to: " + filteredIndex);
                console.log(instructions);
            }

        }
    };
    console.log(filtered.length);
}

function runProgram() {
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
}