class MouseHandler {
  constructor(camera) {
    this.dragStart = null;
    // this.target = null; // Reference to the target to follow
    
    this.angleX = 20;
    this.angleY = -60;
    this.zoomLevel = -300;
    // this.angleX = 9;
    // this.angleY = -60;
    // this.zoomLevel = 400;
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
    this.dragStart = null;
  }

  mouseWheel(event) {
    this.zoomLevel -= event.delta * 0.5;
  }

  applyRotation(target) {
    this.target = target;
    if (this.target) {

      translate(0, 0, -this.zoomLevel);

      rotateX(this.angleY);
      rotateY(this.angleX);

      translate(-this.target.x, -this.target.y, -this.target.z);
    }
  }

  applyZoom(xZoom, yZoom, zZoom) {
    this.xZoom = xZoom;
    this.yZoom = yZoom;
    this.zZoom = zZoom;
  }
}
