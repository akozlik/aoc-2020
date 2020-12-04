const readline = require("readline");
const fs = require("fs");

var input = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    console: false
});

var bitmap = {
    "byr": 0b10000000, // (Birth Year)
    "iyr": 0b01000000, // (Issue Year)
    "eyr": 0b00100000, // (Expiration Year)
    "hgt": 0b00010000, // (Height)
    "hcl": 0b00001000, // (Hair Color)
    "ecl": 0b00000100, // (Eye Color)
    "pid": 0b00000010, // (Passport ID)
    "cid": 0b00000001 // (Country ID)
}

var input = [];
var passportData = [];
var validPassports = [];

const regexPattern = /([\w#]+):([\w#]+)/
readInterface.on('line', function(line) {

    if (line === "") {
        input.push(passportData);
        passportData = [];
    } else {
        
        var regex = new RegExp(regexPattern, "g");
        var parts = line.match(regex);

        passportData = passportData.concat(parts);
    }
});

readInterface.on('close', function() {
    // Get that last passport
    input.push(passportData);

    part1();
    part2();
});


function part1() {

    for (i=0; i<input.length; i++) {
        var passport = 0b00000000;

        input[i].forEach((v, i) => {
            component = v.match(regexPattern);

            // Bitwise operation will flag the corresponding bit if it's valid
            passport |= bitmap[component[1]];
        });

        // These map to 0b11111111 and 0b11111110 from our bitwise operations
        if (passport == 255 || passport == 254) {
            validPassports.push(input[i]);
        }        
    }

    console.log(validPassports.length + " valid passports in part 1");
}

function part2() {

    var count = 0;

    for (i=0; i<validPassports.length; i++) {

        var passport = validPassports[i];

        var passportValid = true;

        for (j = 0; j<passport.length; j++) {
            
            var parts = passport[j].match(regexPattern);
            var fieldName = parts[1];
            var fieldValue = parts[2];
            var valid = fieldIsValid(fieldName, fieldValue)
            
            if (!valid) {
                passportValid = false;
                break;
            } 
        }

        if (passportValid) count++;
    }

    console.log(count + " valid passports in part 2");
}

function fieldIsValid(field, value) {
    // console.log(field);
    if (field == "byr") { // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        // console.log(value.length);
        return (value >= 1920 && value <= 2002)
    }    
    else if (field === "iyr") {// (Issue Year) - four digits; at least 2010 and at most 2020.
        return (value >= 2010 && value <= 2020)
    }
    else if (field === "eyr") {// (Expiration Year) - four digits; at least 2020 and at most 2030.
        return (value >= 2020 && value <= 2030)
    }
    else if (field === "hgt") {// (Height) - a number followed by either cm or in:
        var matches = value.match(/(\d+)(cm|in)/);
        if (matches == null) return false;

        if (matches[2] === "cm") {// cm, the number must be at least 150 and at most 193.
            // console.log(matches[2]);
            return (matches[1] >= 150 && matches[1] <= 193);
        } if (matches[2] === "in") {// in, the number must be at least 59 and at most 76.
            // console.log(matches[2]);
            return (matches[1] >= 59 && matches[1] <= 76);
        }

        return false;
    }
    else if (field === "hcl") {// (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        var color = /^#[0-9a-f]{6}$/
        return (value.match(color) != null) ? true : false;
    }
    else if (field === "ecl") {// (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        var valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        return valid.includes(value);
    }
    else if (field === "pid") {// (Passport ID) - a nine-digit number, including leading zeroes.
        return (value.match(/^[\d]{9}$/) != null) ? true : false;
    } else if (field === "cid") {
        return true;
    }
}