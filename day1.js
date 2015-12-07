"use strict";

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    let floor = 0;
    for(let i = 0; i < line.length; i++) {
        if (line[i] === "(") {
            floor++;
        } else if (line[i] === ")") {
            floor--;
        }
    }

    console.log(floor);
});