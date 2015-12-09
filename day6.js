"use strict";

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let grid = [];
let brightnessGrid = [];
let lightOn = 0;
let brightness = 0;

let set = (setOn, x, y) => {
    if (grid[x] === undefined) {
        grid[x] = [];
        brightnessGrid[x] = [];
    }

    if (setOn) {
        if (grid[x][y] !== true) {
            lightOn++;
        }

        if (brightnessGrid[x][y] && brightnessGrid[x][y] > 0) {
            brightnessGrid[x][y]++;
        } else {
            brightnessGrid[x][y] = 1;
        }

        grid[x][y] = true;
        brightness++;
    } else {
        if (grid[x][y] === true) {
            lightOn--;
        }

        if (brightnessGrid[x][y] && brightnessGrid[x][y] > 0) {
            brightnessGrid[x][y]--;
            brightness--;
        }

        grid[x][y] = false;
    }
};

let toggle = (x, y) => {
    if (grid[x] === undefined) {
        grid[x] = [];
        brightnessGrid[x] = [];
    }

    if (grid[x][y] === undefined || grid[x][y] === false) {
        lightOn++;
        grid[x][y] = true;
    } else {
        grid[x][y] = false;
        lightOn--;
    }

    if (brightnessGrid[x][y] === undefined) {
        brightnessGrid[x][y] = 2;
    } else {
        brightnessGrid[x][y] += 2;
    }

    brightness += 2;
};

let update = (instruction, x1, y1, x2, y2) => {
    let tmp;
    let instructions = {
        "turn on": (x, y) => set(true, x, y),
        "turn off": (x, y) => set(false, x, y),
        "toggle": toggle
    };

    let f = instructions[instruction];

    if (x1 > x2) {
        tmp = x1;
        x1 = x2;
        x2 = tmp;
    }

    if (y1 > y2) {
        tmp = y1;
        y1 = y2;
        y2 = tmp;
    }

    if (typeof f !== "function") {
        console.log("Cannot execute " + instruction);
        return;
    }

    // Update grid
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            f(x, y);
        }
    }
};

rl.on('line', function(line) {
    // Split command
    let commands = line.split(/\s(?=[0-9])/, 3);
    let instruction = commands[0];
    let locations = commands[1].split(" through", 1);
    locations.push(commands[2]);

    // Gather locations
    locations = locations.map((l) => (l.split(",").map(Number)));
    let x1 = locations[0][0];
    let y1 = locations[0][1];
    let x2 = locations[1][0];
    let y2 = locations[1][1];

    // Execute
    update(instruction, x1, y1, x2, y2);
});

rl.on('close', function() {
    console.log(lightOn + " lights are now on if using an on/off switch");
    console.log(brightness + " is the total brightness the installation is giving");
});