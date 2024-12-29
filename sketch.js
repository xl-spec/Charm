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
  for (let i = 0; i < 5; i++) {
    entities.push(new DeadTree(random(-400, 400), 32, random(-400, 400), 0));
  }

  entities[0].x = innerBox.x;
  entities[0].z = innerBox.z;
  entities[1].x = innerBox.x;
  entities[1].z = innerBox.z;
  entities[2].x = innerBox.x;
  entities[2].z = innerBox.z;
  
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
      // sprite.checkCollision(innerBox);
    if (entity.sprite.overlap(innerBox.sprite)) {
      console.log(`Collision detected between ${entity.name} and ${innerBox.name}`);
    }
    
    // else{
    //     console.log("is clairo");
    //   }
  }

  pop();
  handleMovement();

  // Update GUI layer
  drawUI();

  // Overlay GUI on top
  image(guiCanvas, -width/2, -height/2); // Position GUI layer
}

function drawUI() {
  guiCanvas.clear();
  guiCanvas.fill(100, 170, 200);
  guiCanvas.textSize(16);

  // Display FPS
  guiCanvas.text(`FPS: ${Math.floor(frameRate())}`, 10, 20);

  // Display positions of entities
  let yOffset = 40; // Start position for entity info
  const p5playX = innerBox.sprite.position.x;
  const p5playY = innerBox.sprite.position.y;
  const originalX = innerBox.x;
  const originalZ = innerBox.z;
  guiCanvas.text(
    `${innerBox.name}: p5playX: ${Math.floor(p5playX)}, p5playY: ${Math.floor(p5playY)}, Original X: ${Math.floor(originalX)}, Original Z: ${Math.floor(originalZ)}`,
    10,
    yOffset
  );
  yOffset += 20; 
  for (let entity of entities) {
    const p5playX = entity.sprite.position.x;
    const p5playY = entity.sprite.position.y;
    const originalX = entity.x;
    const originalZ = entity.z;
    guiCanvas.text(
      `${entity.name}: p5playX: ${Math.floor(p5playX)}, p5playY: ${Math.floor(p5playY)}, Original X: ${Math.floor(originalX)}, Original Z: ${Math.floor(originalZ)}`,
      10,
      yOffset
    );
    yOffset += 20; // Move down for the next entity
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
