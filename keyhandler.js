class KeyHandler {
  constructor() {
    this.movement = { west: false, east: false, north: false, south: false, up: false, down: false };
    this.action = false;
  }

  handleKeyPressed(key) {
    if (key === "a") this.movement.west = true;
    if (key === "d") this.movement.east = true;
    if (key === "w") this.movement.north = true;
    if (key === "s") this.movement.south = true;
    if (key === " ") this.movement.up = true;
    if (key === "Shift") this.movement.down = true;
    if (key === "e") this.action = true;
  }

  handleKeyReleased(key) {
    if (key === "a") this.movement.west = false;
    if (key === "d") this.movement.east = false;
    if (key === "w") this.movement.north = false;
    if (key === "s") this.movement.south = false;
    if (key === " ") this.movement.up = false;
    if (key === "Shift") this.movement.down = false;
    if (key === "e") this.action = false;
  }

  getMovement() {
    return this.movement;
  }

  getAction() {
    return this.action;
  }
}
