let level; // Level object
let guiCanvas; // GUI canvas for 2D overlay
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let entities = []; // Array of sprites
let player; // Controllable sprite

// O_O
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // gui
  guiCanvas = createGraphics(windowWidth, windowHeight);

  // input handlers
  mouseHandler = new MouseHandler();
  keyHandler = new KeyHandler();
  settings = new Settings();

  // Initialize level
  level = new Level(settings.LEVEL_WIDTH, settings.LEVEL_HEIGHT, settings.LEVEL_DEPTH);
  player = new ControllableSprite(settings.PLAYER_START_X, settings.PLAYER_START_Y, settings.PLAYER_START_Z, settings.PLAYER_START_SIZE);

  for (let i = 0; i < 20; i++) {
    entities.push(new Tree(random(-400, 400), 32, random(-400, 400), 32, [139, 69, 19, 255], "Dead Tree"));
  }

  for (let i = 0; i < 10; i++) {
    entities.push(new Snowman(random(-400, 400), 32, random(-400, 400), 32, [139, 69, 19, 255], "Snowman"));
  }

  for (let i = 0; i < 10; i++) {
    entities.push(new Snowmound(random(-400, 400), 32, random(-400, 400), 48, [139, 69, 19, 255], "Snowmound"));
  }
}

function draw() {
  clear();
  background(50);

  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

  push();

  translate(0, 0, mouseHandler.zoomLevel);
  mouseHandler.applyRotation();
  // orbitControl(3, 3, 3);

  level.draw();
  player.draw();
  player.axe.update();
  
  for (let entity of entities) {
    entity.draw();
    entity.checkCollisionAxe(player.axe);
  }

  pop();

  handleMovement();
  handleAction();

  drawUI();
  image(guiCanvas, -width/2, -height/2); // Position GUI layer
}

function drawUI() {
  let yOffset = 35;
  guiCanvas.clear();
  guiCanvas.fill(100, 170, 200);
  guiCanvas.textSize(12);

  // Display FPS
  guiCanvas.text(`FPS: ${Math.floor(frameRate())}`, 10, 20);

  // Display positions of entities
  guiCanvas.text(
    `${player.name}: x: ${Math.floor(player.x)}, z: ${Math.floor(player.z)}`,
    10,
    yOffset
  );
  yOffset += 15; // Move down for the next entity
  for (let entity of entities) {
    guiCanvas.text(
      `${entity.name}: x: ${Math.floor(entity.x)}, z: ${Math.floor(entity.z)}`,
      10,
      yOffset
    );
    yOffset += 15;
  }
}


function handleMovement() {
  const movement = keyHandler.getMovement();
  const speed = 10;
  player.moveWithDirection(movement, speed);
}

function handleAction(){
  if (keyHandler.getAction()){
    player.axe.startAttack();
  }
}

function keyPressed() {
  keyHandler.handleKeyPressed(key);
}

function keyReleased() {
  keyHandler.handleKeyReleased(key);
}

function mousePressed() {
  mouseHandler.mousePressed();
}

function mouseDragged() {
  mouseHandler.mouseDragged();
}

function mouseReleased() {
  mouseHandler.mouseReleased();
}

function mouseWheel(event) {
  mouseHandler.mouseWheel(event);
}


