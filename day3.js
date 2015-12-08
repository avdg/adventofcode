"use strict";

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    let grid = []; // 0,0 assumed to be in the left top corner
    let x, y;

    let houseCount = 0;

    x = y = 0;

    let deliverPresent = (x, y) => {
        if (grid[x] === undefined) {
            grid[x] = [];
        }

        if (typeof grid[x][y] !== "number") {
            grid[x][y] = 1;
            houseCount++;
        } else {
            grid[x][y]++;
        }
    };

    // Deliver at start location
    deliverPresent(x, y);

    // Follow route
    for (let c of line) {
        switch(c) {
            case '>':
                x++;
                break;
            case '<':
                x--;
                break;
            case '^':
                y--;
                break;
            case 'v':
                y++;
                break;
            default:
                console.log("Unknown symbol " + c);
                return;
        }
        deliverPresent(x, y);
    }

    console.log(houseCount + " houses received presents");
});