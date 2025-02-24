class Artifact extends myObject {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    this.is_alive = false;
  }
}

class Snowmound extends Artifact {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    // this.x = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    // this.y = 0;
    // this.z = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 48;
    this.color = [139, 69, 19, 255];
    this.name = "Snowmound";
    let snow_clumps = 8; // adjustable amount, maybe in settings? maybe set a max then randomize
  }

  draw() {
    super.draw();
    push();
    translate(this.x, this.y - 16, this.z);
    fill(255);
    noStroke();
    ellipsoid(this.size / 2, this.size / 6);
    pop();
  }
}
class Lamp extends Artifact {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    // this.x = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    // this.y = 16;
    // this.z = random(-LEVEL_WIDTH / 12, LEVEL_WIDTH / 12);
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 8;
    this.color = [139, 69, 19, 255];
    this.name = "Lamp";
    this.lit = true;
  }

  draw() {
    super.draw();
    push();
    {
      translate(this.x, this.y, this.z);
      fill(20, 100, 255);
      box(this.size / 2, this.size * 8, this.size / 2);
    }
    pop();

    push();
    {
        translate(this.x, this.y + this.size * 4, this.z);
        noStroke();
        // emissiveMaterial(255, 255, 50);
        sphere(this.size);
    }
    pop();
    
  }
}

class Moon extends Artifact {}
class Star extends Artifact {}
