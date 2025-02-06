class Player extends Creature {
    constructor(x, y, z, size, color, name) {
      super(x = PLAYER_START_X, y = PLAYER_START_Y, z = PLAYER_START_Z, size = PLAYER_START_SIZE, color, name); // Call the base class constructor
      this.name = "Character";
      this.hitbox_visible = true;
      this.hit_action = false;
      this.axe = new Axe("Wood Axe", this);
    }
  
    moveWithDirection(direction, speed) {
      //////////////////////////
      // lock movement if in action
      let dx = 0, dz = 0;
  
      if (direction.left) dx -= 1;
      if (direction.right) dx += 1;
      if (direction.up) dz -= 1;
      if (direction.down) dz += 1;
  
      const isDiagonal = dx !== 0 && dz !== 0;
      const moveSpeed = isDiagonal ? speed / 1.414 : speed; // good enough
  
      this.move(dx * moveSpeed, 0, dz * moveSpeed);
    }
  
    draw(){
      super.draw();
  
      push();
        translate(this.x, this.y, this.z);
        fill(...this.color);
        stroke(255);
        cone(this.size / 2, this.size);
      pop();
  
      this.axe.draw();
    }
  }
    