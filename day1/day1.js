const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});


var expenses = [];
readInterface.on('line', function(line) {
    expenses.push(parseInt(line));
});

readInterface.on('close', function() {

    expenses.sort((a, b) => b - a)
    
    for (var i = 0; i < expenses.length; i++) {
        
        var diff = 2020 - expenses[i];

        var product = findProduct(diff, i);

        if (product != -1) {
            product *= expenses[i];
            console.log("Value is " + product);
            break;
        }
    }
});

function findProduct(targetSum, index) {

    var product = -1;
    for (i = index+1; i<expenses.length-1; i++) {
        
        for (j=index+2; j<expenses.length; j++) {
            
            if (expenses[i] + expenses[j] == targetSum) {
                product = expenses[i] * expenses[j];
            }

        }        
    }

    return product;
}