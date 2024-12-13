let level; // Level object
let cam; // Camera object
let uiLayer; // Graphics object for the UI
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let sprites = []; // Array of sprites
let innerBox; // Controllable sprite

function setup() {
  createCanvas(1200, 800, WEBGL);

  // Create a camera
  cam = createCamera();
  cam.setPosition(0, 0, 1024); // Initial camera position
  cam.lookAt(0, 0, 0);

  // Create the MouseHandler instance
  mouseHandler = new MouseHandler(cam);

  // Create the KeyHandler instance
  keyHandler = new KeyHandler();

  // Create the level as a Level instance
  level = new Level(1024, 128, 1024);

  // Create the inner box as a ControllableSprite instance
  innerBox = new ControllableSprite(0, 32, 0, 64);
  sprites.push(innerBox);

  // Add some dead trees
  for (let i = 0; i < 5; i++) {
    let tree = new DeadTree(random(-400, 400), 32, random(-400, 400));
    sprites.push(tree);
  }

  // Create a separate graphics layer for the UI
  uiLayer = createGraphics(width, height);
}

function draw() {
  background(50);

  // Update the camera's position and zoom level
  cam.setPosition(300, -300, mouseHandler.zoomLevel);
  cam.lookAt(100, 0, 0);

  // Add lights for better visualization
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

  // Apply rotation from the MouseHandler
  mouseHandler.applyRotation();

  // Handle movement for the controllable sprite
  handleMovement();

  // Draw the level (container box)
  level.draw();

  // Check for collisions for innerBox
  innerBox.checkCollisionWithSprites(sprites);

  // Draw all sprites
  for (let sprite of sprites) {
    sprite.draw();
  }

  // Render the 2D UI on top of the 3D scene
  drawUI();

  // Display the UI layer
  image(uiLayer, -width / 2, -height / 2);
}



function handleMovement() {
  const movement = keyHandler.getMovement();
  const speed = 15; // Base movement speed
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

function drawUI() {
  // Clear the UI layer
  uiLayer.clear();

  // Set styles for the UI
  uiLayer.fill(255);
  uiLayer.noStroke();
  uiLayer.textSize(16);

  // Display FPS in the top-left corner
  let fps = Math.round(frameRate());
  uiLayer.text(`FPS: ${fps}`, 10, 20);
}
