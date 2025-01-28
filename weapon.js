class Axe {
    constructor(name, holder) {
      this.name = name;
      this.holder = holder;
      this.isAttacking = false;
      this.angle = -.2;
      this.swingSpeed = 0.2;
      this.maxAngle = QUARTER_PI*3;
      this.hitbox_visible = true;
      this.idleAngle = -QUARTER_PI;
      // this.idleAngle = ;
      this.num_hitboxes = 16;
      this.hitbox_map = {};
      this.settings = new Settings(); // this might not be ok but whatever for now
    }
  
    startAttack() {
      this.isAttacking = true;
    }
  
    endAttack() {
      this.isAttacking = false;
      this.angle = this.idleAngle;
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
      translate(this.holder.x, -16, this.holder.z);
        rotateX(this.angle);
        let yOffset = 31.4;
        translate(8, 32, 0);
        // translate(0, yOffset, 0);
        fill(150);
        stroke(255);
        cylinder(2, 48); // an axe "handle"
      pop();

      // MATTHHSSS
      let radius = this.settings.AXE_SIZE / 2;

      let xBottom = this.holder.x;
      let zBottom = this.holder.z + ((yOffset - 24) * Math.sin(this.angle));

      let xTop = this.holder.x;
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

        this.hitbox_map[i] = { x: xCircle, y: -65, z: zCircle };
        // console.log(`Circle #${i}: (${xCircle}, ${zCircle})`);

        if (this.hitbox_visible) {
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
 