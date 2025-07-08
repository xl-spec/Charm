new Q5("global");
function setup() {
    // createCanvas(windowWidth, windowHeight)
    
    // createCanvas(800, 600)
    // const dpr = window.devicePixelRatio || 1;
    createCanvas(windowWidth, windowHeight);
    // pixelDensity(dpr);

    mouseHandler = new MouseHandler()
    keyHandler = new KeyHandler()
    // collider = new Collider(); // if you have collision handling implemented

    level = new Level(LEVEL_WIDTH, LEVEL_HEIGHT)
    level.generate_layers();
    player1 = new Player(
        PLAYER_START_X,
        PLAYER_START_Y,
        PLAYER_START_SIZE,
        PLAYER_START_COLOR,
        'Player'
    )
    player1.x = width / 2
    player1.y = height / 2
    // Create some sample entities
    // for (let i = 0; i < 5; i++) {
    //   entities.push(new Lamp(random(0, LEVEL_WIDTH), random(0, LEVEL_HEIGHT), 16, [255, 255, 0], "Lamp"));
    // }
    // for (let i = 0; i < 10; i++) {
    //   entities.push(new Tree(random(0, LEVEL_WIDTH), random(0, LEVEL_HEIGHT), 32, [0, 255, 0], "Tree"));
    //   entities.push(new Snowman(random(0, LEVEL_WIDTH), random(0, LEVEL_HEIGHT), 32, [255, 255, 255], "Snowman"));
    //   entities.push(new Snowmound(random(0, LEVEL_WIDTH), random(0, LEVEL_HEIGHT), 48, [200, 200, 200], "Snowmound"));
    // }
}

function draw() {
    clear()
    background(50)

    push()

    mouseHandler.applyTranslation()
    translate(width / 2 - player1.x, height / 2 - player1.y)
    // console.log(player1.x, player1.y)
    level.adjust_layer(player1)
    level.draw();
    player1.draw()
    player1.axe.update()

    // Draw all other entities
    // for (let entity of entities) {
    //     entity.draw()
    //     if (entity.update) {
    //         entity.update(player1)
    //     }
    // }
    pop()

    handleMovement()
    handleAction()
}

function handleMovement() {
    const movement = keyHandler.getMovement()
    const speed = PLAYER_SPEED
    player1.moveWithDirection(movement, speed)
}

function handleAction() {
    if (keyHandler.getAction()) {
        player1.axe.startAttack()
    }
}

function keyPressed() {
    keyHandler.handleKeyPressed(key)
}

function keyReleased() {
    keyHandler.handleKeyReleased(key)
}

function mousePressed() {
    mouseHandler.mousePressed()
}

function mouseDragged() {
    mouseHandler.mouseDragged()
}

function mouseReleased() {
    mouseHandler.mouseReleased()
}

function mouseWheel(event) {
    mouseHandler.mouseWheel(event)
}
