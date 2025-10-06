class UI {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT, x = 0, y = 0) {
        this.size = { w, h }
        this.position = { x, y }
        this.color = [10, 200, 255, 150]
        this.thickness = 20
    }

    updateText() {}

    draw() {
        push()
        text('thickness: ' + this.thickness, 5, 15)
        // noStroke()
        fill(...this.color)

        beginShape()
        // OUTER (clockwise)
        vertex(this.position.x, this.position.y)
        vertex(this.position.x + this.size.w, this.position.y)
        vertex(this.position.x + this.size.w, this.position.y + this.size.h)
        vertex(this.position.x, this.position.y + this.size.h)

        beginContour()
        vertex(
            this.position.x + this.thickness,
            this.position.y + this.thickness
        ) // TL
        vertex(
            this.position.x + this.thickness,
            this.position.y + this.size.h - this.thickness
        ) // BL
        vertex(
            this.position.x + this.size.w - this.thickness,
            this.position.y + this.size.h - this.thickness
        ) // BR
        vertex(
            this.position.x + this.size.w - this.thickness,
            this.position.y + this.thickness
        ) // TR
        endContour()

        endShape(CLOSE)
        pop()
    }
}
