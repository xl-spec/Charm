class Entity {
    constructor(x, y, z, size, color, name) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
      this.name = name || "Entity";
    }
  
    move(dx, dy, dz) {
      this.x += dx;
      this.z -= dz;
    }
  
    draw() {
      // Draw the 3D representation of the sprite
      push();
      translate(this.x, 0, this.z);
      fill(...this.color);
      stroke(255);
      box(this.size);
      pop();
    }
  
    checkCollision(otherSprite) {
      let distance_between = dist(this.x, this.z, otherSprite.x, otherSprite.z);
      // if (this.sprite.collides(otherSprite.sprite)) {
      if (distance_between < this.size / 2 + otherSprite.size / 2) {
        console.log(`Collision detected between ${this.name} and ${otherSprite.name}`);
      }
    }
  
    
  }
  
class ControllableSprite extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name); // Call the base class constructor
    this.name = "Clairo";
  }

  moveWithDirection(direction, speed) {
    let dx = 0, dz = 0;

    // Adjust movement based on direction
    if (direction.left) dx -= 1;
    if (direction.right) dx += 1;
    if (direction.up) dz -= 1;
    if (direction.down) dz += 1;

    // Check for diagonal movement and scale speed
    const isDiagonal = dx !== 0 && dz !== 0;
    /////////////////////////////////////////////////////////
    // might need to change this to flat number for faster speed

    const moveSpeed = isDiagonal ? speed / Math.sqrt(2) : speed;

    // Apply movement
    this.move(dx * moveSpeed, 0, dz * moveSpeed);
  }
}
  
class DeadTree extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, 40, [139, 69, 19, 255], "Dead Tree"); // Brownish color for dead tree
    // super(x, y, z, size, color, name); // Brownish color for dead tree
    this.name = "Dead Tree";
  }

  draw() {
    push();
    translate(this.x, 0, this.z);

    // Draw trunk
    fill(139, 69, 19); // Brown
    box(this.size / 4, this.size, this.size / 4);

    // Draw branches
    fill(160, 82, 45); // Lighter brown
    translate(0, -this.size / 2, 0);
    rotateZ(PI / 4);
    box(this.size / 8, this.size / 2, this.size / 8);
    rotateZ(-PI / 2);
    box(this.size / 8, this.size / 2, this.size / 8);

    pop();
  }
}

