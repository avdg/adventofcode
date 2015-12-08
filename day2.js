"use strict";

// Note: v8 4.6 - node 5.1.1 requires following flag to allow this script to run
// --harmony-destructuring

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let wrappingPaperSize = 0;
let ribbonLength = 0;

rl.on('line', function(line) {
    let [l, w, h] = line.split("x").map(Number);

    if (h === undefined) {
        console.log("Bad input");
        return;
    }

    // Wrapping paper area size
    let lw = l*w;
    let wh = w*h;
    let hl = h*l;

    let extra = Math.min(lw, wh, hl);

    wrappingPaperSize += 2 * (lw + wh + hl) + extra;

    // Ribbon length
    let [l1, l2] = [l, w, h].sort((a,b) => a - b);
    let bow = l * w * h;

    ribbonLength += 2 * (l1 + l2) + bow;
});

rl.on('close', function() {
    console.log("There is " + wrappingPaperSize + " square feet of wrapping paper required");
    console.log("Additionally, there should be " + ribbonLength + " feet of ribbon available");
});