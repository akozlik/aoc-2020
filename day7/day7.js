const readline = require("readline");
const fs = require("fs");

var rules = [];
var count = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

readInterface.on('line', function(line) {

    line = line.replace(/( *bags*|\.)/g, "");
    var parts = line.split(" contain ");

    var matches = parts[1].match(/(\d+) ([\w ]+)/g);
    
    var rule = {
        "name": parts[0],
        "edges": [],
        "visited": false
    }

    if (matches) {
        for(i=0; i<matches.length;i++) {
            rule.edges.push(matches[i]);
        }
    }

    rules.push(rule);

});

readInterface.on('close', function() {
    // Get that last passport
    part1();
    console.log("Sum: " + count);
    part2();
});

var counts = [];
function part1() {
    findContainingBags("shiny gold");
}

function part2() {
    var numBags = findNumberOfBagsContainedBy("shiny gold"); 
    numBags--; 
    console.log("Total Number of Bags: " + numBags);
}
function findNumberOfBagsContainedBy(bagName) {
    
    let obj = rules.find(o => o.name === bagName);

    var subtotal = 1;
    if (obj.edges.length > 0) {
        
        for (var i=0; i<obj.edges.length; i++) {

            var edge = obj.edges[i];
            var parts = edge.match(/(\d+) (.*)/);
            var bagCount = parts[1];
            var bagColor = parts[2];

            subtotal += parseInt(bagCount) * findNumberOfBagsContainedBy(bagColor);

        }
    }

    return subtotal;
}

function findContainingBags(bagName) {
   
    for (var i=0; i<rules.length; i++) {
        var bag = rules[i];
        var edgeString = bag.edges.join(" ");

        var end = false;
        if (edgeString.includes(bagName)) {

            if (rules[i].visited == false) {
                rules[i].visited = true;
                count++;
            }

            findContainingBags(bag.name);            
        }
    }
}
