"use strict";

// Note: v8 4.6 - node 5.1.1 requires following flag to allow this script to run
// --harmony-destructuring

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let wrappingPaperSize = 0;

rl.on('line', function(line) {
    var [l, w, h] = line.split("x");

    if (h === undefined) {
        console.log("Bad input");
        return;
    }

    let lw = l*w;
    let wh = w*h;
    let hl = h*l;

    let extra = Math.min(lw, wh, hl);

    wrappingPaperSize += 2 * (lw + wh + hl) + extra;
});

rl.on('close', function() {
    console.log("There is " + wrappingPaperSize + " square feet of wrapping paper required");
});