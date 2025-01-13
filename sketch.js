let level; // Level object
let guiCanvas; // GUI canvas for 2D overlay
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let entities = []; // Array of sprites
let innerBox; // Controllable sprite


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // gui
  guiCanvas = createGraphics(windowWidth, windowHeight);

  // input handlers
  mouseHandler = new MouseHandler();
  keyHandler = new KeyHandler();

  // Initialize level
  level = new Level(1024, 128, 1024);

  // x, y, z, size, color, name (constructor)
  innerBox = new ControllableSprite(0, 32, 0, 32);

  for (let i = 0; i < 20; i++) {
    entities.push(new Tree(random(-400, 400), 32, random(-400, 400), 32, [139, 69, 19, 255], "Dead Tree"));
  }

  for (let i = 0; i < 10; i++) {
    entities.push(new Snowman(random(-400, 400), 32, random(-400, 400), 32, [139, 69, 19, 255], "Snowman"));
  }
}

function draw() {
  clear();
  background(50);

  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);
  // Add lights

  // Render 3D content
  push();
  translate(0, 0, mouseHandler.zoomLevel);
  mouseHandler.applyRotation();
  // orbitControl(3, 3, 3);

  level.draw();
  innerBox.draw();
  
  for (let entity of entities) {
    entity.draw();
    entity.checkCollision(innerBox);
  }

  pop();
  handleMovement();
  handleAction();

  // Update GUI layer
  drawUI();

  // Overlay GUI on top
  image(guiCanvas, -width/2, -height/2); // Position GUI layer
}

function drawUI() {
  let yOffset = 40;
  guiCanvas.clear();
  guiCanvas.fill(100, 170, 200);
  guiCanvas.textSize(16);

  // Display FPS
  guiCanvas.text(`FPS: ${Math.floor(frameRate())}`, 10, 20);

  // Display positions of entities
  guiCanvas.text(
    `${innerBox.name}: x: ${Math.floor(innerBox.x)}, z: ${Math.floor(innerBox.z)}}`,
    10,
    yOffset
  );
  yOffset += 20; // Move down for the next entity
  for (let entity of entities) {
    guiCanvas.text(
      `${entity.name}: x: ${Math.floor(entity.x)}, z: ${Math.floor(entity.z)}}`,
      10,
      yOffset
    );
    yOffset += 20;
  }
}


function handleMovement() {
  const movement = keyHandler.getMovement();
  const speed = 10;
  innerBox.moveWithDirection(movement, speed);
}

function handleAction(){
  if (keyHandler.getAction()){
    innerBox.axe.startAttack();
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


