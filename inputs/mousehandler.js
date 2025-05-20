class MouseHandler {
    constructor() {
        this.dragStart = null
        this.offset = createVector(0, 0)
    }

    mousePressed() {
        this.dragStart = createVector(mouseX, mouseY)
    }

    mouseDragged() {
        if (this.dragStart) {
            let current = createVector(mouseX, mouseY)
            let delta = p5.Vector.sub(current, this.dragStart)
            this.offset.add(delta)
            this.dragStart = current
        }
    }

    mouseReleased() {
        this.dragStart = null
    }

    mouseWheel(event) {
    }

    applyTranslation() {
        // Apply panning offset
        translate(this.offset.x, this.offset.y)
    }
}
