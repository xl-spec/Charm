class Entity {
    constructor(x, y, z, size, color) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
  
      // Create a p5.play sprite for collision detection
      this.sprite = new Sprite(x, z, size, size); // Map 3D x, z to 2D x, y
      // this.sprite.visible = false; // Hide the 2D sprite (we'll render 3D manually)
      this.sprite.static = true;

    }
  
    move(dx, dy, dz) {
      this.sprite.position.x += dx;
      this.sprite.position.y += dz; // Z-axis in 3D maps to Y in p5.play
      this.x = this.sprite.position.x;
      this.z = this.sprite.position.y;
      // this.z = z;
    }
  
    draw() {
      // Draw the 3D representation of the sprite
      push();
      translate(this.sprite.position.x, 0, this.sprite.position.y);
      fill(...this.color);
      stroke(255);
      box(this.size);
      pop();
    }
  
    checkCollision(otherSprite) {
      // console.log(this.sprite.position.x);
      // console.log(this.sprite.position.y);

      // console.log(otherSprite.sprite.position.x);
      // console.log(otherSprite.sprite.position.y);

      // console.log("");
      // console.log(this.sprite.collides(otherSprite.sprite));
      if (this.sprite.collides(otherSprite.sprite)) {
        console.log(`Collision detected between ${this.name} and ${otherSprite.name}`);
      }
    }
    
    
  }
  
class ControllableSprite extends Entity {
  constructor(x, y, z, size, color) {
    super(x, y, z, size, color); // Call the base class constructor
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
    const moveSpeed = isDiagonal ? speed / Math.sqrt(2) : speed;

    // Apply movement
    this.move(dx * moveSpeed, 0, dz * moveSpeed);
  }
}
  
class DeadTree extends Entity {
  constructor(x, y, z) {
    super(x, y, z, 40, [139, 69, 19, 255]); // Brownish color for dead tree
    this.name = "Dead Tree";
  }

  draw() {
    push();
    // newz = this.sprite.position.y
    translate(this.sprite.position.x, 0, this.sprite.position.y);

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

