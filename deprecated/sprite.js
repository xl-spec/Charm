// class Essence {
//     constructor(x, y, z, size, color, name) {
//       this.x = x;
//       this.y = y;
//       this.z = z;
//       this.size = size;
//       this.color = color || [100, 200, 255, 150]; // Default color
//       this.name = name || "Essence";
//       this.face_direction = [0, 0]; // might need to make this radians/degrees
//       this.is_alive = true;
//       this.hitbox = new Hitbox(this.x, -65, this.z, this.size);
//     }
  
//     move(dx, dy, dz) {
//       this.x += dx;
//       this.z -= dz;
//     }

//     draw() {
//       // use buildGeometry() maybe later
//       this.hitbox.update(this.x, -65, this.z, this.size);
//       this.hitbox.draw();
//     }
//   }

// class Artifact extends Essence {
//   constructor(x, y, z, size, color, name) {
//     super(x, y, z, size, color, name);
//   }
// }

// class Player extends Essence {
//   constructor(x, y, z, size, color, name) {
//     super(x, y, z, size, color, name); // Call the base class constructor
//     this.name = "Character";
//     this.hitbox_visible = true;
//     this.hit_action = false;
//     this.axe = new Axe("Wood Axe", this);
//   }

//   moveWithDirection(direction, speed) {
//     //////////////////////////
//     // lock movement if in action
//     let dx = 0, dz = 0;

//     if (direction.left) dx -= 1;
//     if (direction.right) dx += 1;
//     if (direction.up) dz -= 1;
//     if (direction.down) dz += 1;

//     const isDiagonal = dx !== 0 && dz !== 0;
//     const moveSpeed = isDiagonal ? speed / 1.414 : speed; // good enough

//     this.move(dx * moveSpeed, 0, dz * moveSpeed);
//   }

//   draw(){
//     super.draw();

//     push();
//       translate(this.x, 0, this.z);
//       fill(...this.color);
//       stroke(255);
//       cone(this.size / 2, this.size);
//     pop();

//     this.axe.draw();
//   }
// }
  
// class Tree extends Essence {
//   constructor(x, y, z, size, color, name) {
//     super(x, y, z, size, color, name);
//   }

//   draw() {
//     if (this.is_alive) {
//       super.draw();
//       push();
//         translate(this.x, 0, this.z);

//         // trunk
//         fill(139, 69, 19); // Brown
//         box(this.size / 4, this.size, this.size / 4);

//         // branches
//         fill(160, 82, 45); // Lighter brown
//         translate(0, -this.size / 2, 0);
//         rotateZ(PI / 4);
//         box(this.size / 8, this.size / 2, this.size / 8);
//         rotateZ(-PI / 2);
//         box(this.size / 8, this.size / 2, this.size / 8);

//         // will do more later
//         // thinking of doing trunk, 4-8 branches
//       pop();
//     }
//   }
// }

// class Snowman extends Essence {
//   constructor(x, y, z, size, color, name) {
//     super(x, y, z, size, color, name);
//     this.snowball = new Snowball("snowball", this);
//     this.hasFired = false;
//     this.fireDelay = 0; // Delay before firing (frames)
//   }

//   update(player) {
//     // Fire at the player if the snowball isn't active
//     if (!this.snowball.active) {
//       this.shootAtPlayer(player);
//     }

//     this.snowball.update();
//   }

//   shootAtPlayer(player) {
//     this.snowball.startAttack(createVector(player.x, player.y, player.z));
//   }
  

//   draw() {
//     if (this.is_alive) {
//       super.draw();

//       // Snowman body
//       push();
//         translate(this.x, 28, this.z);
//         fill(255);
//         sphere(this.size / 5, 64, 8);
//       pop();

//       push();
//         translate(this.x, 16, this.z);
//         fill(255);
//         sphere(this.size / 3, 64, 8);
//       pop();

//       push();
//         translate(this.x, 0, this.z);
//         fill(255);
//         sphere(this.size / 2, 64, 8);
//       pop();

//       push();
//         translate(this.x, -16, this.z);
//         fill(50);
//         noStroke();
//         cylinder(this.size, 16);
//       pop();

//       // Draw snowball if active
//       this.snowball.draw();
//     }
//   }
// }

// class Snowmound extends Essence{
//   constructor(x, y, z, size, color, name) {
//     super(x, y, z, size, color, name);
//     let snow_clumps = 8; // adjustable amount, maybe in settings? maybe set a max then randomize
//     this.is_alive = false;
//   }

//   draw(){
//     super.draw();
//     push();
//       translate(this.x, -16, this.z);
//       fill(255);
//       noStroke();
//       ellipsoid(this.size/2, this.size/6);
//     pop();
//   }

// }

// class Moon extends Essence{

// }

// class Star extends Essence{
  
// }

// class Lamp extends Essence{

  
// }

// class Yeti extends Essence{
  
// }

// class Pixie extends Essence{
  
// }