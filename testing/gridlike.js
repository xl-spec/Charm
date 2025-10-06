// Pseudo 3D Grid Example in p5.js
// This sketch draws a perspective grid that appears to recede into the distance.
// We simulate depth by computing a screen y position from a world distance d using:
//      y = horizon + (camHeight * f) / d
// and the x position of a world point (x, d) is given by:
//      xScreen = width/2 + (x * f) / d
// By animating an offset in d, the grid seems to move (as in a forward‐moving scene).

let f = 250 // focal length: higher value exaggerates perspective
let camHeight = 150 // camera height above the ground
let horizon // y position of the horizon (calculated in setup)
let gridSpacing = 50 // spacing between grid lines in world units
let numRows = 30 // number of horizontal (depth) divisions
let numCols = 100 // number of vertical divisions (to each side of center)
let speed = 0 // forward movement speed

function setup() {
    createCanvas(600, 600)
    horizon = height / 2 // place the horizon at the middle of the canvas
}

function draw() {
    background(0)
    stroke(255)
    noFill()

    // dOffset creates the illusion of moving forward.
    // It cycles between 0 and gridSpacing.
    let dOffset = -(frameCount * speed) % gridSpacing

    // --- Draw horizontal grid lines (lines of constant depth) ---
    for (let n = 1; n <= numRows; n++) {
        // Effective distance d: note that dOffset makes the lines "move"
        let d = n * gridSpacing + dOffset
        // Protect against d being too small:
        if (d < 1) d = 1
        // Compute the y position on screen using the projection formula:
        let y = horizon + (camHeight * f) / d

        // For a given row, compute the x positions corresponding to the leftmost and
        // rightmost world x coordinates (here, we use -numCols*gridSpacing to +numCols*gridSpacing)
        let xLeft = width / 2 + (-numCols * gridSpacing * f) / d
        let xRight = width / 2 + (numCols * gridSpacing * f) / d

        line(xLeft, y, xRight, y)
    }

    // --- Draw vertical grid lines (constant world x positions) ---
    // We draw each vertical line as a polyline that connects its projection at various depths.
    for (let m = -numCols; m <= numCols; m++) {
        beginShape()
        for (let n = 1; n <= numRows; n++) {
            let d = n * gridSpacing + dOffset
            if (d < 1) d = 1
            // The x position is based on the world x (m * gridSpacing) scaled by the perspective factor.
            let x = width / 2 + (m * gridSpacing * f) / d
            let y = horizon + (camHeight * f) / d
            vertex(x, y)
        }
        endShape()
    }
}
