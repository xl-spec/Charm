class Creature extends myObject {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
  }

  move(dx, dy, dz) {
    this.x += dx;
    this.y += dy;
    this.z += dz;
  }
}

class Tree extends Creature {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    // this.x = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    // this.y = 0;
    // this.z = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 32;
    this.name = "Dead Tree";
  }

  draw() {
    if (this.is_alive){
        super.draw();
        push();
        translate(this.x, this.y, this.z);
    
        // trunk
        fill(139, 69, 19); // Brown
        box(this.size / 4, this.size, this.size / 4);
    
        // branches
        fill(160, 82, 45); // Lighter brown
        translate(0, -this.size / 2, 0);
        rotateZ(PI / 4);
        box(this.size / 8, this.size / 2, this.size / 8);
        rotateZ(-PI / 2);
        box(this.size / 8, this.size / 2, this.size / 8);
    
        // will do more later
        // thinking of doing trunk, 4-8 branches
        pop();
    }
  }
}

class Snowman extends Creature {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    // this.x = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    // this.y = 0;
    // this.z = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 32;
    this.name = "Snowman";
    this.snowball = new Snowball("snowball", this);
    this.hasFired = false;
    this.fireDelay = 0; // Delay before firing (frames)
  }

  update(player) {
    // Fire at the player if the snowball isn't active, will change this later so that snowman has ai to run over to snowmound to get ammo
    if (!this.snowball.active) {
      this.shootAtPlayer(player);
    }

    this.snowball.update();
  }

  shootAtPlayer(player) {
    this.snowball.startAttack(createVector(player.x, player.y, player.z));
  }

  draw() {
    if (this.is_alive){
        super.draw();
    
        // Snowman body
        push();
        translate(this.x, 28, this.z);
        fill(255);
        sphere(this.size / 5, 64, 8);
        pop();
    
        push();
        translate(this.x, 16, this.z);
        fill(255);
        sphere(this.size / 3, 64, 8);
        pop();
    
        push();
        translate(this.x, 0, this.z);
        fill(255);
        sphere(this.size / 2, 64, 8);
        pop();
    
        push();
        translate(this.x, -16, this.z);
        fill(50);
        noStroke();
        cylinder(this.size, 16);
        pop();
    
        // Draw snowball if active
        this.snowball.draw();
    }
  }
}

class Yeti extends Creature {}

class Pixie extends Creature {}
