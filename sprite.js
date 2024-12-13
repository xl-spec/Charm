class Sprite {
    constructor(x, y, z, size, color) {
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
  
      // Create a p5.play sprite for collision detection
      this.sprite = createSprite(x, z, size, size); // Map 3D x, z to 2D x, y
      this.sprite.visible = false; // Hide the 2D sprite (we'll render 3D manually)
    }
  
    move(dx, dy, dz) {
      this.sprite.position.x += dx;
      this.sprite.position.y += dz; // Z-axis in 3D maps to Y in p5.play
    }
  
    draw() {
      // Sync the p5.play sprite position with the 3D object
      this.sprite.position.x = this.sprite.position.x; // Keep x in sync
      this.sprite.position.z = this.sprite.position.z; // Keep z (mapped to y) in sync
  
      // Draw the 3D representation of the sprite
      push();
      translate(this.sprite.position.x, 0, this.sprite.position.y);
      fill(...this.color);
      stroke(255);
      box(this.size);
      pop();
    }
  
    checkCollision(otherSprite) {
      if (this.sprite.overlap(otherSprite.sprite)) {
        console.log('Collision detected!');
        this.color = [255, 0, 0, 150]; // Change color to red
      } else {
        this.color = [100, 200, 255, 150]; // Revert to default color
      }
    }
  }
  
class ControllableSprite extends Sprite {
  constructor(x, y, z, size, color) {
    super(x, y, z, size, color); // Call the base class constructor
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

  checkCollisionWithSprites(sprites) {
    let collisionDetected = false;

    for (let sprite of sprites) {
      if (sprite !== this && this.sprite.overlap(sprite.sprite)) {
        collisionDetected = true;
        console.log(`Collision detected with ${sprite.constructor.name}`);
        break; // Stop checking further once a collision is detected
      }
    }

    // Change color based on collision state
    if (collisionDetected) {
      this.color = [255, 0, 0, 150]; // Change to red
    } else {
      this.color = [100, 200, 255, 150]; // Default color
    }
  }
}

  
class DeadTree extends Sprite {
  constructor(x, y, z) {
    super(x, y, z, 40, [139, 69, 19, 255]); // Brownish color for dead tree
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

