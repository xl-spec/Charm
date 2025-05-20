let level; // Level object
let guiCanvas; // GUI canvas for 2D overlay
let mouseHandler; // MouseHandler object
let keyHandler; // KeyHandler object
let entities = []; // Array of sprites
let player1; // Controllable sprite

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight, WEBGL);
  // camera(0, -200, 250);

  // gui
  guiCanvas = createGraphics(windowWidth, windowHeight);

  // input handlers
  mouseHandler = new MouseHandler();
  keyHandler = new KeyHandler();
  collider = new Collider();

  // Initialize level
  level = new Level();

  player1 = new PlayerTest();

  for (let i = 0; i < 5; i++) {
    entities.push(new Lamp(
      random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2),
      0,
      random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2),
      128
    ));
  }
  for (let i = 0; i < 100; i++) {
    entities.push(
      // new Lamp(),
      new Tree(
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2),
        0,
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2)
      ),
      new Snowman(
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2),
        0,
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2)
      ),
      new Snowmound(
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2),
        0,
        random(-LEVEL_WIDTH/2, LEVEL_WIDTH/2)
      )
    );
  }
}

function draw() {
  clear();
  background(50);
  // orbitControl();
  ambientLight(1);
  // directionalLight(255, 255, 255, 0, 64, 0);
  // pointLight(255, 255, 255, 0, 0, 300);

  pointLight(255, 255, 255, player1.x, player1.y + 32, player1.z);
  push();
  
  mouseHandler.applyRotation(player1);
  // orbitControl(3, 3, 3);

  level.draw();
  player1.draw();
  player1.axe.update();

  // cylinder(10, 100);
  // console.log(player1.x, player1.y, player1.z);

  

  // directionalLight(255, 255, 150, player1.x, player1.y, player1.z);
  for (let entity of entities) {
    if (entity instanceof Lamp && entity.lit) {
      // console.log(entity.x, entity.y, entity.z);
      // pointLight(0, 255, 255, entity.x, entity.y + 64, eantity.z);

    }
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

function drawUI() {
  let yOffset = 35;
  guiCanvas.clear();
  guiCanvas.fill(100, 170, 200);
  guiCanvas.textSize(12);

  // Display FPS
  guiCanvas.text(`FPS: ${Math.floor(frameRate())}`, 10, 20);

  // Display positions of entities
  guiCanvas.text(
    `${player1.name}: x: ${Math.floor(player1.x)}, y: ${Math.floor(player1.y)}, z: ${Math.floor(player1.z)}`,
    10,
    yOffset
  );
  // yOffset += 15; // Move down for the next entity
  // for (let entity of entities) {
  //   guiCanvas.text(
  //     `${entity.name}: x: ${Math.floor(entity.x)}, z: ${Math.floor(entity.z)}`,
  //     10,
  //     yOffset
  //   );
  //   yOffset += 15;
  // }
}

function handleMovement() {
  const movement = keyHandler.getMovement();
  const speed = 50;
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