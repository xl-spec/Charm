var PLAYER_START_X = 100
var PLAYER_START_Y = 100
var PLAYER_START_SIZE = 64
var PLAYER_START_COLOR = [0, 0, 255]

var LEVEL_WIDTH = 800
var LEVEL_HEIGHT = 600

let level // Level object
let guiCanvas // 2D overlay graphics
let mouseHandler // Handles panning/dragging
let keyHandler // Handles keyboard input
let entities = [] // Array of other sprites/entities
let player1 // The controllable player
