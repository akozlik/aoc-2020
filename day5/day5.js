const readline = require("readline");
const fs = require("fs");


const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

readInterface.on('line', function(line) {

    input.push(line);
});

readInterface.on('close', function() {

    part1();
    part2();
});

var input = [];


var seats = [];
function loadPlane() {
    const NUM_ROWS = 128; //128;
    const NUM_COLS = 8;
    
    var rows = [];
    var plane = [];
    for (i=0; i<NUM_ROWS; i++) {
    
        var row = [];
    
        for (j=0; j<NUM_COLS; j++) {
            var seat = {row: i, col: j};
            row.push(seat);
        }
        plane.push(row);
    }

    return plane;
}

function part1() {
    
    var max = 0;
    input.forEach((v) => {

        partition = loadPlane()

        for (i=0; i<v.length; i++) {

            if (v[i] == "F" || v[i] == "B") {

                var mid = partition.length/2;

                if (v[i] === "F") {
                    partition.splice(mid, partition.length/2);
                } else if (v[i] === "B") {
                    partition.splice(0, partition.length/2);                        
                    ;
                }
            }

            if (v[i] == "L" || v[i] == "R") {

                var mid = partition[0].length/2;
                if (v[i] === "L") {                    
                    partition[0].splice(mid, partition[0].length/2);
                } else if (v[i] === "R") {
                    partition[0].splice(0, partition[0].length/2);                        
                }
            }
        }

        var seat = partition[0][0];
        var seatId = (seat.row) * 8 + seat.col;

        if (seatId > max) max = seatId;

        seats.push(seatId);
    });

    console.log("Max Seat: " + max);

}

function part2() {
    seats.sort((a, b) => a - b); // For ascending sort
    for (i=8; i<seats.length; i++) {
        var expecting = seats[i-1]+1;
        if (seats[i] != expecting) {
            console.log("Missing: " + expecting);
        }
        
    }
}
