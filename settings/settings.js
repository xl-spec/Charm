var PLAYER_START_X = 100
var PLAYER_START_Y = 100
var PLAYER_START_SIZE = 64
var PLAYER_START_COLOR = [0, 0, 255]

var LEVEL_WIDTH = 1280
var LEVEL_HEIGHT = 800

// z adjust
var ZOOMIES = 1.0
// var MIN_ZOOM = 0.5
// var MAX_ZOOM = 3.0
var ZOOM_STEP = 0.01
// How much depth exaggerates zoom (0 = uniform scaling, 1 = full effect)
var DEPTH_ZOOM = 0.5

let level // Level object
let guiCanvas // 2D overlay graphics
let mouseHandler // Handles panning/dragging
let keyHandler // Handles keyboard input
let entities = [] // Array of other sprites/entities
let player1 // The controllable player
