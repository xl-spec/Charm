class PlayerTest extends Creature {
    constructor(x, y, z, size, color, name) {
      super(x = PLAYER_START_X, y = PLAYER_START_Y, z = PLAYER_START_Z, size = PLAYER_START_SIZE, color, name); // Call the base class constructor
      this.name = "Character";
      this.hitbox_visible = true;
      this.hit_action = false;
      this.axe = new Axe("Wood Axe", this);

      this.nSpheres = 200;
      this.spheres = [];
      this.generateSpheres();
    }

    randomPointInCylinder(radius, height) {
      let angle = random(TWO_PI);
      // sqrt(random()) ensures a uniform distribution over the circular base.
      let r = sqrt(random()) * radius;
      let x = r * cos(angle);
      let z = r * sin(angle);
      // let y = random(this.getConeY(x, z, this.size, this.size / 2));
      let y = random(-height/2, height/2);
      return createVector(x, y, z);
    }
  
    // Generates spheres within a cylinder.
    // Here, we use the player's size to define the cylinder dimensions:
    // half the size as the radius and the full size as the height.
    generateSpheres() {
      for (let i = 0; i < this.nSpheres; i++) {
        let pos = this.randomPointInCylinder(this.size / 2, this.size);
        this.spheres.push(pos);
      }
    }

    moveWithDirection(direction, speed) {
      //////////////////////////
      // lock movement if in action
      let dx = 0, dy = 0, dz = 0;
  
      if (direction.west) dx -= 1;
      if (direction.east) dx += 1;
      if (direction.north) dz += 1;
      if (direction.south) dz -= 1;
      if (direction.up) dy += 1;
      if (direction.down) dy -= 1;
  
      const isDiagonal = dx !== 0 && dz !== 0;
      const moveSpeed = isDiagonal ? speed / 1.414 : speed; // good enough
  
      this.move(dx * moveSpeed, dy * moveSpeed, dz * moveSpeed);
    }
    
    getConeY(x, z, coneHeight, coneRadius) {
        // Calculate horizontal distance from the center
        let d = Math.sqrt(x * x + z * z);
        
        // Check if the point is on the cone's surface
        if (d > coneRadius) {
          return null; // Point is outside the cone's base.
        }
        
        // Linear interpolation from apex to base:
        let y = coneHeight - (coneHeight / coneRadius) * d;
        return y;
      }

    draw(){
      super.draw();
  
      push();
        translate(this.x, this.y, this.z);
        // console.log(this.spheres.length);
        for (let i = 0; i < this.nSpheres; i++) {
          let pos = this.spheres[i];
          let coneY = this.getConeY(pos.x, pos.z, this.size, this.size / 2);
          if (coneY !== null && pos.y < coneY) {
            push();
              translate(pos.x, pos.y, pos.z);
              fill(255, 255, 0);
              sphere(1);
            pop();
          }
        }
        // fill(this.color);
        // stroke(255);
        // cylinder(this.size / 2, this.size);
      pop();
  
      this.axe.draw();
    }
  }
    