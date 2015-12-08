"use strict";

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let total = 0;
let good = 0;
let evenBetter = 0;

rl.on('line', function(line) {
    const vowels = "aeiou";
    let blacklist = ["ab", "cd", "pq", "xy"];

    let vowelCount = 0;
    let doubleCount = 0;
    let blackListCount = 0;
    let surroundedCount = 0;
    let doubleRepetitionCount = 0;

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

        // Newer model accepts letters surrounded by the same character
        if (i > 0 && line[i - 1] === line[i + 1]) {
            surroundedCount++;
        }

        // Newer model accepts two letter repetitions without overlap
        let p = line.indexOf(substr);

        // Check overlap
        if (p === i - 1 || p === i || p === i + 1) {
            p = line.indexOf(substr, i + 2);
        }

        // Update double two pair match counter if necessary
        if (p >= 0) {
            doubleRepetitionCount++;
        }
    }

    // Check last character, so we checked all characters
    // Check for vowels
    if (vowels.indexOf(line[line.length - 1]) >= 0) {
        vowelCount++;
    }

    // Update counter
    total++;

    // First model
    if (vowelCount >= 3 && doubleCount > 0 && blackListCount === 0) {
        good++;
    }

    // Updated model
    if (doubleRepetitionCount > 0 && surroundedCount > 0) {
        evenBetter++;
    }
});

rl.on('close', function() {
    console.log("Found " + total + " number of strings where....");
    console.log("* " + good + " are nice given model 1");
    console.log("* " + evenBetter+ " are nice given model 2");
});