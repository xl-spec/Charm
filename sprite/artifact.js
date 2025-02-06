class Artifact extends Essence {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    this.false = true;
  }
}

class Snowmound extends Artifact {
  constructor(x, y, z, size, color, name) {
    super(x, y, z, size, color, name);
    let snow_clumps = 8; // adjustable amount, maybe in settings? maybe set a max then randomize
    this.is_alive = false;
  }

  draw() {
    super.draw();
    push();
    translate(this.x, -16, this.z);
    fill(255);
    noStroke();
    ellipsoid(this.size / 2, this.size / 6);
    pop();
  }
}

class Moon extends Essence {
    
}

class Star extends Essence {}

class Lamp extends Essence {}
