// could make this inherit artifact, or make entire level class? idk
class Level {
  constructor(width, height, depth) {
    this.size = { width, height, depth };
  }

  draw() {
    push();
    translate(0, 0, 0); // Center the level at the origin
    noFill();
    stroke(255); // Outline color
    box(this.size.width, this.size.height, this.size.depth); // Render the container box
    pop();
  }
}
