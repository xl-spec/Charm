class Axe {
    constructor(name, holder) {
      this.name = name;
      this.holder = holder;       // Reference to the sprite/entity wielding the axe
      this.isAttacking = false;
      this.angle = -0.2;            // Tracks the swing animation from 0..some max
      this.swingSpeed = 0.1;     // How fast the angle increments each frame
      this.maxAngle = 3 * QUARTER_PI;   // Stop swinging once angle > HALF_PI (90°)
  
      // For the line (or arc) of small circles (collision hits):
      this.segmentCount = 5;     
      this.segmentSpacing = 10;  
      this.circleRadius = 10;    
      this.swingRadius = 50;     
      this.hitboxPositions = []; 
      this.hitbox_visible = true; // For debugging
  
      // If you want the idle axe to have a default angle
      this.idleAngle = -0.2;
    }
  
    // Called when the player starts the attack
    startAttack() {
      this.isAttacking = true;
      this.angle = 0;  // reset swing angle
    }
  
    // Ends the attack, clearing out hitboxes
    endAttack() {
      this.isAttacking = false;
    //   this.hitboxPositions = [];
      this.angle = this.idleAngle;
    }
  
    // Animate each frame
    update() {
      if (!this.isAttacking) return;
  
      // Advance the angle of the swing
      this.angle += this.swingSpeed;
  
      // If we’ve passed maxAngle, end the attack
      if (this.angle > this.maxAngle) {
        this.endAttack();
      } else {
        // Recompute the positions of each small circle for collisions
        this._generateHitboxPositions();
      }
    }
  
    // Generate small collision circles in an arc
    _generateHitboxPositions() {
        this.hitboxPositions = [];
      
        // We'll sample `this.segmentCount` points along the cylinder’s vertical axis.
        // Cylinder height = 48 => half-height = 24
        // localY goes from -24 (bottom) to +24 (top).
        for (let i = 0; i < this.segmentCount; i++) {
          // fraction from 0..1
          let t = i / (this.segmentCount - 1);
          let localY = -24 + (48 * t); // goes from -24..+24
          let localX = 0;
          let localZ = 0;
      
          // But remember, in draw(), we do a translate(8, 32, 0) AFTER rotation.
          // Let's incorporate that carefully.
      
          // 1) Rotate around X by this.angle
          //    rotateX changes (y,z), but leaves x alone
          //    Formula:
          //      rotatedY = localY * cos(angle) - localZ * sin(angle)
          //      rotatedZ = localY * sin(angle) + localZ * cos(angle)
          let cosA = cos(this.angle);
          let sinA = sin(this.angle);
      
          let rotatedX = localX; // no change
          let rotatedY = localY * cosA - localZ * sinA;
          let rotatedZ = localY * sinA + localZ * cosA;
      
          // 2) Then translate(8, 32, 0)
          let afterLocalTranslateX = rotatedX + 8;
          let afterLocalTranslateY = rotatedY + 32;
          let afterLocalTranslateZ = rotatedZ + 0;
      
          // 3) Then translate(this.holder.x, -16, this.holder.z)
          //    This puts the final position in world space
          let worldX = afterLocalTranslateX + this.holder.x;
          let worldY = afterLocalTranslateY - 16;
          let worldZ = afterLocalTranslateZ + this.holder.z;
      
          // Now we have the final world coords of that segment
          // We only need x,z for circle collision, but let's store y if needed
          this.hitboxPositions.push({
            x: worldX,
            y: worldY,
            z: worldZ
          });
        }
      }
      
  
    draw() {
      push();
        translate(this.holder.x, -16, this.holder.z);
        rotateX(this.angle); // angle gets updating, is how the animation works
        translate(8, 32, 0); 
  
        fill(150);
        stroke(255);
        cylinder(2, 48);
        
      pop();

      if (this.hitbox_visible) {
        push();
          // no overall translate/rotate needed, because each point is already in world coords
          noStroke();
          fill(0, 255, 0, 100);
    
          for (let pos of this.hitboxPositions) {
            push();
              translate(pos.x, pos.y, pos.z);
              // If your floor is at y= -65, or you want them flat, do rotateX(-HALF_PI)
              rotateX(-HALF_PI);
              ellipse(0, 0, this.circleRadius * 2, this.circleRadius * 2);
            pop();
          }
        pop();
      }
    }
  
    getHitboxPositions() {
      return this.hitboxPositions;
    }
  
    getCircleRadius() {
      return this.circleRadius;
    }
  }
  