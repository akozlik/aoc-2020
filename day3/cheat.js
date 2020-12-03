const fs = require('fs'); 

fs.readFile("./input.txt", (err,data) => { 
    if(err){ 
      console.log(err)    
    } else { 
    const input = data.toString().trim().split("\n");
      
    function checkSlope(xx, yy) {
        let x = 0;
        let y = 0;

        let treeCount = 0;

        while (y < input.length) {    
            if (input[y][x] === '#') {
                treeCount++;
            }

            x = (x + xx) % input[0].length;
            y += yy;
        }
        return treeCount;
    }
// part 1
    console.log(checkSlope(3, 1));
// part 2
    console.log(checkSlope(1, 1) *
    checkSlope(3, 1) *
    checkSlope(5, 1) *
    checkSlope(7, 1) *
    checkSlope(1, 2));
} 
}) 
