class Weapons {
  constructor(name, holder) {
    this.name = name;
    this.holder = holder;
    this.isRanged = false; // maybe need this for melee and ranged weapons later
    this.hitbox = new Hitbox(
      this.holder.x,
      -65,
      this.holder.z,
      this.holder.size
    );
  }
}

class Snowball extends Weapons {
  // 2nd weapon for snowman needed
  constructor(name, holder) {
    super(name, holder);
    this.isAttacking = false;
    this.position = createVector(holder.x, holder.y, holder.z);
    this.velocity = createVector(0, 0, 0);
    // Gravity (downward)
    this.acceleration = createVector(0, -0.02, 0);
    this.active = false;
  }

  startAttack(target) {
    if (!this.active) {
      this.isAttacking = true;
      this.active = true;

      // Calculate displacement
      let dx = target.x - this.position.x;
      let dz = target.z - this.position.z;
      let dy = target.y - this.position.y - 32; // minor displacement, will update later

      // Horizontal distance in the XZ plane
      let horizontalDist = Math.sqrt(dx * dx + dz * dz);

      // 1) Pick a constant horizontal speed
      let horizontalSpeed = 5;

      // 2) Flight time = horizontal distance / horizontal speed
      let t = horizontalDist / horizontalSpeed;

      // If the target is exactly at the same XZ spot, t can be 0
      // Handle that edge case:
      if (t <= 0) {
        this.active = false;
        return;
      }

      // 3) The needed horizontal velocity components
      let vx = dx / t; // so we traverse dx in time t
      let vz = dz / t;

      // 4) Solve vertical velocity so we land at dy after time t under gravity
      //    dy = vy*t + (1/2)*a*t^2  =>  vy = (dy - 0.5*a*t^2) / t
      let a = this.acceleration.y; // This is negative (e.g. -0.02)
      let vy = (dy - 0.5 * a * t * t) / t;

      // 5) Set our initial velocity
      this.velocity.set(vx, vy, vz);
    }
  }

  update() {
    if (!this.active) return;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (this.position.y < -64) {
      //
      this.isAttacking = false;
      this.position = createVector(this.holder.x, this.holder.y, this.holder.z);
      this.active = false;
    }
  }

  draw() {
    if (!this.active) return;

    this.hitbox.update(this.position.x, -65, this.position.z, 4);
    this.hitbox.draw();

    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255);
    noStroke();
    sphere(4, 8, 8);
    pop();
  }
}

class Axe extends Weapons {
  constructor(name, holder) {
    super(name, holder);
    this.isAttacking = false;
    this.angle = -0.2;
    this.swingSpeed = 0.1;
    this.maxAngle = QUARTER_PI * 3;
    this.idleAngle = -0.2;
    this.num_hitboxes = 16;
    this.hitbox_map = {};
    this.hitbox_visible = true;
    // this.settings = new Settings(); // this might not be ok but whatever for now
  }

  startAttack() {
    this.isAttacking = true;
  }

  endAttack() {
    this.isAttacking = false;
    this.angle = this.idleAngle;
    this.hitbox_map = {};
  }

  update() {
    if (!this.isAttacking) return;

    // Advance the angle
    this.angle += this.swingSpeed;
    if (this.angle > this.maxAngle) {
      this.endAttack();
    }
  }

  draw() {
    //
    push();
    // initial location (y - 16)
    translate(this.holder.x, this.holder.y - 16, this.holder.z);
    rotateX(this.angle);
    let yOffset = 31.4; // maybe make this setting later idk
    let xOffset = 8;
    translate(xOffset, yOffset, 0);
    fill(150);
    stroke(255);
    cylinder(2, 48); // an axe "handle"
    pop();

    // MATTHHSSS
    let radius = 4 / 2;

    let xBottom = this.holder.x + xOffset;
    let zBottom = this.holder.z + (yOffset - 24) * Math.sin(this.angle);

    let xTop = this.holder.x + xOffset;
    let zTop = this.holder.z + (yOffset + 24) * Math.sin(this.angle);

    let zLow = min(zBottom, zTop);
    let zHigh = max(zBottom, zTop);

    let xLow = zBottom < zTop ? xBottom : xTop;
    let xHigh = zBottom < zTop ? xTop : xBottom;
    let stepX = (xHigh - xLow) / (this.num_hitboxes - 1);
    let stepZ = (zHigh - zLow - 2 * radius) / (this.num_hitboxes - 1);

    // console.log("===== DEBUG =====");
    // console.log(`z=${zLow}, z=${zHigh}`);
    // console.log(`stepZ=${stepZ}, radius=${radius}`);

    // this code is just for hitbox of the axe weapon
    for (let i = 0; i < this.num_hitboxes; i++) {
      let zCircle = zLow + radius + i * stepZ;
      let xCircle = xLow + i * stepX;

      this.hitbox_map[i] = { x: xCircle, y: -65, z: zCircle }; // maybe i need y-axis calculated? idk
      if (this.isAttacking) {
        this.hitbox.update(xCircle, -65, zCircle, 4);
        this.hitbox.draw();
      }
    }
  }
}
