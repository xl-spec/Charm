// could make this inherit artifact, or make entire level class? idk
class Level {
  constructor(x = LEVEL_WIDTH, y = LEVEL_HEIGHT, z = LEVEL_DEPTH) {
    this.size = { x, y, z };
  }

  draw() {
    push();
    translate(0, 0, 0); // Center the level at the origin
    noFill();
    stroke(255); // Outline color
    box(this.size.x, this.size.y, this.size.z);
    pop();
  }
}
