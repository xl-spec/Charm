let level; // Level object
let guiCanvas; // GUI canvas for 2D overlay
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let entities = []; // Array of sprites
let innerBox; // Controllable sprite


function setup() {
  // Create the WebGL canvas (primary canvas)
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Create the GUI canvas for 2D overlay
  guiCanvas = createGraphics(windowWidth, windowHeight);

  // Initialize handlers
  mouseHandler = new MouseHandler();
  keyHandler = new KeyHandler();

  // Initialize level
  level = new Level(1024, 128, 1024);

  // Initialize controllable sprite (clairo)
  innerBox = new ControllableSprite(0, 32, 0, 32);

  // Initialize entities
  for (let i = 0; i < 10; i++) {
    // entities.push(new DeadTree(random(-400, 400), 32, random(-400, 400), 0, 0, 40, [139, 69, 19, 255], "Dead Tree"));
    entities.push(new DeadTree(random(-400, 400), 32, random(-400, 400), 0, 40, [139, 69, 19, 255], "Dead Tree"));
  }

  
}

function draw() {
  clear();
  background(50);

  // Add lights
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

  // Render 3D content
  push();
  translate(0, 0, mouseHandler.zoomLevel);
  mouseHandler.applyRotation();

  level.draw();
  innerBox.draw();
  
  for (let entity of entities) {
    entity.draw();
      // console.log("not clairo");
      entity.checkCollision(innerBox);
  }

  pop();
  handleMovement();
 
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
  const speed = 15;
  innerBox.moveWithDirection(movement, speed);
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


