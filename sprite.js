class Entity {
    constructor(x, y, z, size, color, name) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
      this.name = name || "Entity";
      this.hitbox_visible = true;

      this.axe = new Axe("Wood Axe", this);
    }
  
    move(dx, dy, dz) {
      this.x += dx;
      this.z -= dz;
    }
  
    draw() { // maybe rename idk
      // this is a circle that represents the hitbox of the entity
      if (this.hitbox_visible){
        push();
          translate(this.x, -65, this.z);
          rotateX(-HALF_PI);
          noStroke();
          fill(255, 0, 0, 100);
          ellipse(0, 0, this.size, this.size);
        pop();

      }

    }
  
    checkCollision(otherSprite) { // formula for circle collsion
      let distance_between = dist(this.x, this.z, otherSprite.x, otherSprite.z);
      if (distance_between < this.size / 2 + otherSprite.size / 2) {
        console.log(`Collision detected between ${this.name} and ${otherSprite.name}`);
      }
    }
  
    checkHitByAxe(axe) {
      // If the axe isn't swinging, do nothing
      if (!axe.isAttacking) return;
  
      const circlePositions = axe.getHitboxPositions();
      const circleRadius    = axe.getCircleRadius();
  
      for (let pos of circlePositions) {
        let d = dist(pos.x, pos.z, this.x, this.z);
        if (d < circleRadius + this.size / 2) {
          console.log(`Axe collided with ${this.name}!`);
          // Apply damage, spawn particle, etc.
          // Possibly break out after 1 hit, or keep going if multiple hits are possible
        }
      }
    }
  }
  
class ControllableSprite extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name); // Call the base class constructor
    this.name = "Clairo";
    this.hit_action = false;
  }

  moveWithDirection(direction, speed) {
    //////////////////////////
    // lock movement if in action,
    let dx = 0, dz = 0;

    // Adjust movement based on direction
    if (direction.left) dx -= 1;
    if (direction.right) dx += 1;
    if (direction.up) dz -= 1;
    if (direction.down) dz += 1;

    // Check for diagonal movement and scale speed
    const isDiagonal = dx !== 0 && dz !== 0;
    const moveSpeed = isDiagonal ? speed / 1.414 : speed; // good enough

    this.move(dx * moveSpeed, 0, dz * moveSpeed);
  }

  draw(){
    super.draw();

    push();
      translate(this.x, 0, this.z);
      fill(...this.color);
      stroke(255);
      cone(this.size / 2, this.size);
    pop();

    this.axe.draw();
  }
}
  
class Tree extends Entity { // maybe rename to Tree later
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
  }

  draw() {
    super.draw();
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

class Snowman extends Entity{
  // two attacks, one requires snow ammo and throws snowball at character, other is just a mini weak lunge
  constructor(x, y, z, size, color, name){
    super(x, y, z, size, color, name);
  }
s
  draw(){
    super.draw();
    push();
      translate(this.x, 26, this.z);
      fill(0, 0, 0);
      sphere(this.size / 4, 64, 8);
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
  }
}