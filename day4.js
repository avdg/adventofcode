"use strict";

let crypto = require('crypto');
let readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    for (let i = 0; i < 1e9; i++) {
        let md5 = crypto.createHash('md5').update(line + i);
        let attempt = md5.digest('hex');

        if (/^0{5,}/.test(attempt)) {
            console.log(line + ": found a 5 zeroes solution with number " + i + " - " +
                line + i + " has a hash of " + attempt
            );
        }

        if (/^0{6,}/.test(attempt)) {
            console.log(line + ": found a 6 zeroes solution with number " + i + " - " +
                line + i + " has a hash of " + attempt
            );
            console.log("Limit reached, solved what we need");
            return;
        }
    }

    console.log("Limit reached, could not find a solution for " + line);
});