
let level; // Level object
let guiCanvas; // GUI canvas for 2D overlay
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let entities = []; // Array of sprites
let player1; // Controllable sprite

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight, WEBGL);

  // gui
  guiCanvas = createGraphics(windowWidth, windowHeight);

  // input handlers
  mouseHandler = new MouseHandler();
  keyHandler = new KeyHandler();
  collider = new Collider();

  // Initialize level
  level = new Level();

  player1 = new Player();

  for (let i = 0; i < 20; i++) {
    entities.push(
      new Lamp(),
      new Tree(),
      new Snowman(),
      new Snowmound()
    );
  }
}

function draw() {
  clear();
  background(50);

  // ambientLight(20);
  // directionalLight(255, 255, 255, 0, 64, 0);
  // pointLight(255, 255, 255, 0, 0, 300);

  push();

  translate(0, 0, mouseHandler.zoomLevel);
  mouseHandler.applyRotation();
  // orbitControl(3, 3, 3);

  level.draw();
  player1.draw();
  player1.axe.update();

  for (let entity of entities) {
    if (entity instanceof Lamp && entity.lit) {
      pointLight(255, 255, 150, entity.x, entity.y + entity.size * 4, entity.z);
    }
    entity.draw();
    entity.update?.(player1);
    collider.handleCollisions(player1, entity);
  }

  pop();

  handleMovement();
  handleAction();

  drawUI();
  image(guiCanvas, -width / 2, -height / 2); // Position GUI layer
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
    `${player1.name}: x: ${Math.floor(player1.x)}, z: ${Math.floor(player1.z)}`,
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
  player1.moveWithDirection(movement, speed);
}

function handleAction() {
  if (keyHandler.getAction()) {
    player1.axe.startAttack();
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
