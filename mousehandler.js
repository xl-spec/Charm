class MouseHandler {
    constructor(camera) {
      this.dragStart = null;
      this.angleX = 0; // Horizontal rotation angle
      this.angleY = -60.4; // Vertical rotation angle
      this.zoomLevel = 20; // Initial zoom level
      // this.camera = camera; maybe add later idk
    }
  
    mousePressed() {
      // Track the initial mouse position on press
      this.dragStart = { x: mouseX, y: mouseY };
    }
  
    mouseDragged() {
      if (this.dragStart) {
        // Calculate the difference between the current and initial mouse positions
        let deltaX = mouseX - this.dragStart.x;
        let deltaY = mouseY - this.dragStart.y;
  
        // Adjust angles based on mouse movement
        this.angleX -= deltaX * 0.01; // Horizontal rotation
        this.angleY -= deltaY * 0.01; // Vertical rotation

  
        // Update dragStart to the current position for smooth dragging
        this.dragStart = { x: mouseX, y: mouseY };
      }
    }
  
    mouseReleased() {
      // Stop dragging when the mouse is rewleased
      this.dragStart = null;
    }
  
    mouseWheel(event) {
      this.zoomLevel += event.delta * 2; 
    }

    applyRotation() {
      // Apply rotation to the scene
      rotateX(this.angleY);
      rotateY(this.angleX);
    }
  }
  