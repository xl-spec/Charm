class Hitbox {
  constructor(x, y, z, size, visible = true) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.visible = visible;
  }

  update(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }

  draw() {
    if (!this.visible) return;
    push();
    translate(this.x, this.y, this.z);
    rotateX(HALF_PI);
    noStroke();
    fill(255, 0, 0, 100);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
