class KeyHandler {
    constructor() {
      this.movement = { left: false, right: false, up: false, down: false };
      this.action = false;
    }
  
    handleKeyPressed(key) {
      if (key === 'a') this.movement.left = true;
      if (key === 'd') this.movement.right = true;
      if (key === 'w') this.movement.up = true;
      if (key === 's') this.movement.down = true;
      if (key === 'e') this.action = true;
    }
  
    handleKeyReleased(key) {
      if (key === 'a') this.movement.left = false;
      if (key === 'd') this.movement.right = false;
      if (key === 'w') this.movement.up = false;
      if (key === 's') this.movement.down = false;
      if (key === 'e') this.action = false;
    }
  
    getMovement() {
      return this.movement;
    }

    getAction() {
      return this.action;
    }
  }
  