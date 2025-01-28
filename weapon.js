class Weapons{
  constructor(name, holder){
    this.name = name;
    this.holder = holder;
  }
}

class Snowball extends Weapons{
  constructor(name, holder){
    super(name, holder);
    this.isAttacking = false;
    this.angle = .2;
    this.swingSpeed = 1;
    this.hitbox_visible = true;
  }

  startAttack() {
    this.isAttacking = true;
  }

  endAttack() {
    this.isAttacking = false;
    this.angle = this.idleAngle;
  }
}

class Axe extends Weapons {
  constructor(name, holder) {
    super(name, holder);
    this.isAttacking = false;
    this.angle = -.2;
    this.swingSpeed = 0.1;
    this.maxAngle = QUARTER_PI*3;
    this.idleAngle = -.2;
    this.num_hitboxes = 16;
    this.hitbox_map = {};
    this.hitbox_visible = true;
    this.settings = new Settings(); // this might not be ok but whatever for now
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
    translate(this.holder.x, -16, this.holder.z);
      rotateX(this.angle);
      let yOffset = 31.4; // maybe make this setting later idk
      let xOffset = 8;
      translate(xOffset, yOffset, 0);
      fill(150);
      stroke(255);
      cylinder(2, 48); // an axe "handle"
    pop();

    // MATTHHSSS
    let radius = this.settings.AXE_SIZE / 2;

    let xBottom = this.holder.x + xOffset;
    let zBottom = this.holder.z + ((yOffset - 24) * Math.sin(this.angle));

    let xTop = this.holder.x + xOffset;
    let zTop = this.holder.z + ((yOffset + 24) * Math.sin(this.angle));

    let zLow = min(zBottom, zTop);
    let zHigh = max(zBottom, zTop);

    let xLow = (zBottom < zTop) ? xBottom : xTop; 
    let xHigh = (zBottom < zTop) ? xTop : xBottom;
    let stepX = (xHigh - xLow) / (this.num_hitboxes - 1);
    let stepZ = ((zHigh - zLow) - 2 * radius) / (this.num_hitboxes - 1);

    // console.log("===== DEBUG =====");
    // console.log(`z=${zLow}, z=${zHigh}`);
    // console.log(`stepZ=${stepZ}, radius=${radius}`);

    for (let i = 0; i < this.num_hitboxes; i++) {
      let zCircle = zLow + radius + i * stepZ;
      let xCircle = xLow + i * stepX;

      this.hitbox_map[i] = { x: xCircle, y: -65, z: zCircle }; // maybe i need y-axis calculated? idk
      // console.log(`Circle #${i}: (${xCircle}, ${zCircle})`);
      if ((this.hitbox_visible) && (this.isAttacking)) {
      // if (this.hitbox_visible) {
        push();
          translate(xCircle, -65, zCircle);
          rotateX(-HALF_PI);
          noStroke();
          fill(255, 0, 0, 100);
          ellipse(0, 0, this.settings.AXE_SIZE, this.settings.AXE_SIZE);
        pop();
      }
    }

  }
}
 