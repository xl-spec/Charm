class Hitbox {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    update(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    draw() {
        push()
        noFill()
        stroke(255, 0, 0)
        ellipse(this.x, this.y, this.size)
        pop()
    }
}
