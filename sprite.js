class Entity {
    constructor(x, y, z, size, color, name) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
      this.name = name || "Entity";
      this.hitbox_visible = true;
      this.face_direction = [0, 0]; // might need to make this radians/degrees
      this.is_alive = true;
    }
  
    move(dx, dy, dz) {
      this.x += dx;
      this.z -= dz;
    }
  

    draw() { // maybe rename/rewrite this, this is just a hitbox applied to all sprites
      // use buildGeometry() maybe later
      // this is a circle that represents the hitbox of the entity
      if (this.hitbox_visible){
        push();
          translate(this.x, -65, this.z);
          rotateX(HALF_PI);
          noStroke();
          fill(255, 0, 0, 100);
          ellipse(0, 0, this.size, this.size);
        pop();

      }

    }
    // might need to... make this an entire class to handle all the different types of collisions
    checkCollision(otherSprite) { // formula for circle collsion
      let distance_between = dist(this.x, this.z, otherSprite.x, otherSprite.z);
      if (distance_between < this.size / 2 + otherSprite.size / 2) {
        console.log(`Collision detected between ${this.name} and ${otherSprite.name}`);
      }
    }

    checkCollisionAxe(axe) {
      if (!axe.isAttacking) return;

      for (let i = 0; i < axe.num_hitboxes; i++) {
        let d = dist(axe.hitbox_map[i]['x'], axe.hitbox_map[i]['z'], this.x, this.z);
        if ((d  < this.size / 2 + 2) && (this.is_alive)) { // change with setting variables later
          console.log(`Axe collided with ${this.name}!`);
          this.is_alive = false;
        }
      }
    }
  }
  
class ControllableSprite extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name); // Call the base class constructor
    this.name = "Character";
    this.hitbox_visible = true;
    this.hit_action = false;
    this.axe = new Axe("Wood Axe", this);
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
  
class Tree extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
  }

  draw() {
    if (this.is_alive) {
      super.draw();
      push();
        translate(this.x, 0, this.z);

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


// two attacks, one requires snow ammo and throws snowball at character, other is just a mini weak lunge
// will fix all y axis... later in life

class Snowman extends Entity {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    this.snowball = new Snowball("snowball", this);
    this.hasFired = false;
    this.fireDelay = 0; // Delay before firing (frames)
  }

  update(player) {
    this.shootAtPlayer(player);
    if (!this.snowball.active) {
      // console.log(this.fireDelay)
      this.fireDelay--;
      // if (this.fireDelay <= 0) {
        // let target = this.getTarget(player);
        // if (player) {
          // this.fireDelay = 100
      }
    
    this.snowball.update();
  }

  shootAtPlayer(player) {
    let direction = createVector(player.x - this.x, player.y - this.y, player.z - this.z);
    direction.normalize(); // Convert to unit vector

    // Give the snowball an initial velocity towards the player
    this.snowball.startAttack(direction.mult(3)); // Adjust speed as needed
  }

  draw() {
    if (this.is_alive) {
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

  

class Snowmound extends Entity{
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    let snow_clumps = 8; // adjustable amount, maybe in settings? maybe set a max then randomize
    this.is_alive = false;
  }

  draw(){
    super.draw();
    push();
      translate(this.x, -16, this.z);
      fill(255);
      noStroke();
      ellipsoid(this.size/2, this.size/6);
    pop();
  }


}