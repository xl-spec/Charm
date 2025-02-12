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

  for (let i = 0; i < 2; i++) {
    entities.push(new Lamp());
  }
  for (let i = 0; i < 20; i++) {
    entities.push(
      // new Lamp(),
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

  // translate(0, 0, mouseHandler.zoomLevel);
  mouseHandler.applyRotation();
  // orbitControl(3, 3, 3);

  level.draw();
  player1.draw();
  player1.axe.update();

  // pointLight(255, 255, 150, player1.x, player1.y, player1.z);
  directionalLight(255, 255, 150, player1.x, player1.y, player1.z);
  for (let entity of entities) {
    // if (entity instanceof Lamp && entity.lit) {
    //   pointLight(255, 255, 150, entity.x, entity.y + entity.size * 4, entity.z);
    // }
    entity.draw();
    entity.update?.(player1);
    collider.handleCollisions(player1, entity);
  }

  pop();

  handleMovement();
  handleAction();

  // drawUI();
  image(guiCanvas, -width / 2, -height / 2); // Position GUI layer
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
