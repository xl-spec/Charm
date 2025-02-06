class Essence {
    constructor(x, y, z, size, color, name) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
      this.color = color || [100, 200, 255, 150]; // Default color
      this.name = name || "Essence";
      this.face_direction = [0, 0]; // might need to make this radians/degrees
      this.is_alive = true;
      this.hitbox = new Hitbox(this.x, -65, this.z, this.size);
    }
  
    move(dx, dy, dz) {
      this.x += dx;
      this.z -= dz;
    }

    draw() {
      // use buildGeometry() maybe later
      this.hitbox.update(this.x, -65, this.z, this.size);
      this.hitbox.draw();
    }
  }