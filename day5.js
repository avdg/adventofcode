"use strict";

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let total = 0;
let good = 0;

rl.on('line', function(line) {
    const vowels = "aeiou";
    let blacklist = ["ab", "cd", "pq", "xy"];

    let vowelCount = 0;
    let doubleCount = 0;
    let blackListCount = 0;

    // Do sliding window
    for (let i = 0; i < line.length - 1; i++) {
        // Check for vowels
        if (vowels.indexOf(line[i]) >= 0) {
            vowelCount++;
        }

        // Check blacklist
        let substr = line.substr(i, 2);
        if (blacklist.indexOf(substr) >= 0) {
            blackListCount++;
        }

        // Check double count
        if (line[i] === line[i + 1]) {
            doubleCount++;
        }
    }

    // Check last character, so we checked all characters
    // Check for vowels
    if (vowels.indexOf(line[line.length - 1]) >= 0) {
        vowelCount++;
    }

    // Update counter
    total++;

    if (vowelCount >= 3 && doubleCount > 0 && blackListCount === 0) {
        good++;
    }
});

rl.on('close', function() {
    console.log("Found " + total + " number of strings where " + good + " are nice");
});