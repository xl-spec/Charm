class Axe {
    constructor(name, holder) {
      this.name = name;
      this.holder = holder;       // Reference to the sprite/entity wielding the axe
      this.isAttacking = false;
      this.angle = 0;            // Tracks the swing animation from 0..some max
      this.swingSpeed = 0.1;     // How fast the angle increments each frame
      this.maxAngle = HALF_PI;   // Stop swinging once angle > HALF_PI (90°), for example
  
      // For the line (or arc) of small circles:
      this.segmentCount = 5;     // Number of circles
      this.segmentSpacing = 10;  // Extra distance per circle
      this.circleRadius = 10;    // How big each hitbox circle is in collision terms
      this.swingRadius = 50;     // Main radius from holder’s center for the arc
      this.hitboxPositions = []; // Array of { x, z } for the circles
      this.hitbox_visible = true;
    }
  
    // Called when the player starts the attack
    startAttack() {
      this.isAttacking = true;
      this.angle = 0;
    }
  
    // Ends the attack, clearing out hitboxes
    endAttack() {
      this.isAttacking = false;
      this.hitboxPositions = [];
    }
  
    // Called each frame to animate and update the line of circles
    update() {
      if (!this.isAttacking) return;
  
      // Advance the angle of the swing
      this.angle += this.swingSpeed;
  
      // If we’ve passed our maximum angle, end the attack
      if (this.angle > this.maxAngle) {
        this.endAttack();
      } else {
        // Recompute the positions of each small circle
        this._generateHitboxPositions();
      }
    }
  
    // Recompute circle positions for the current angle
    _generateHitboxPositions() {
      this.hitboxPositions = [];
  
      // The holder's current position
      const holderX = this.holder.x;
      const holderZ = this.holder.z;
  
      // For a "line" or partial arc from near the holder out to the tip
      for (let i = 0; i < this.segmentCount; i++) {
        let t = i / (this.segmentCount - 1); // from 0..1
        let distOut = t * this.segmentSpacing * this.segmentCount;
  
        // Example arc formula: revolve around the player’s position
        let swingX = holderX + cos(this.angle) * (this.swingRadius + distOut);
        let swingZ = holderZ + sin(this.angle) * (this.swingRadius + distOut);
  
        // Collect each circle center
        this.hitboxPositions.push({ x: swingX, z: swingZ });
      }
    }
  
    // Draw the small circles in the 3D scene (for debugging or visualization)
    draw() {
      if (!this.isAttacking) return;
  
      push();
      fill(0, 255, 0, 100);
      noStroke();
      for (const pos of this.hitboxPositions) {
        push();
          translate(pos.x, -65, pos.z);   // -65 if your “floor” is at y=-65
          rotateX(-HALF_PI);
          ellipse(0, 0, this.circleRadius * 2, this.circleRadius * 2);
        pop();
      }
      pop();
    }
  
    // Provide an easy way for your sprite or main loop to get the hitbox circles
    getHitboxPositions() {
      return this.hitboxPositions;
    }
  
    getCircleRadius() {
      return this.circleRadius;
    }
  }
  