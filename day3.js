"use strict";

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
     // 0,0 assumed to be in the left top corner
    let gridClassic = [];
    let gridRobo = [];
    let x, y;

    let xRobo = [0, 0];
    let yRobo = [0, 0];
    let turn = 0;

    let houseCount = 0;
    let houseCountRobo = 0;

    x = y = 0;

    // Returns number of additional served houses
    let deliverPresent = (grid, x, y) => {
        if (grid[x] === undefined) {
            grid[x] = [];
        }

        if (typeof grid[x][y] !== "number") {
            grid[x][y] = 1;
            return 1;
        } else {
            grid[x][y]++;
        }
        return 0;
    };

    // Deliver at start location
    houseCount += deliverPresent(gridClassic, x, y);
    houseCountRobo += deliverPresent(gridRobo, xRobo[0], yRobo[0]);
    houseCountRobo += deliverPresent(gridRobo, xRobo[1], yRobo[1]);

    // Follow route
    for (let c of line) {
        switch(c) {
            case '>':
                x++;
                xRobo[turn]++;
                break;
            case '<':
                x--;
                xRobo[turn]--;
                break;
            case '^':
                y--;
                yRobo[turn]--;
                break;
            case 'v':
                y++;
                yRobo[turn]++;
                break;
            default:
                console.log("Unknown symbol " + c);
                return;
        }

        houseCount += deliverPresent(gridClassic, x, y);
        houseCountRobo += deliverPresent(gridRobo, xRobo[turn], yRobo[turn]);

        // xor-ing with same value over and over again flips value
        // between original value and assigned value
        turn ^= 1;
    }

    console.log(houseCount + " houses received presents if santa traveled alone");
    console.log(houseCountRobo + " houses received presents if robo and santa traveled together");
});