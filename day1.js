"use strict";

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    let floor = 0;
    let basementPos;
    for(let i = 0; i < line.length; i++) {
        if (line[i] === "(") {
            floor++;
        } else if (line[i] === ")") {
            floor--;

            if (floor === -1 && basementPos === undefined) {
                basementPos = i + 1;
            }
        }
    }

    console.log("Santa is at " + floor);

    if (basementPos !== undefined) {
        console.log("Instruction " + basementPos + " took santa to basement");
    }
});