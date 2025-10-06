class Artifact extends MyObject {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.is_alive = false
    }
}

class Lamp extends Artifact {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.size = 16
        this.lit = true
    }

    draw() {
        push()
        translate(this.x, this.y)
        fill(20, 100, 255)
        noStroke()
        // Lamp pole
        rect(-this.size / 4, -this.size * 4, this.size / 2, this.size * 8)
        pop()

        push()
        // Lamp light
        translate(this.x, this.y - this.size * 4)
        noStroke()
        fill(255, 255, 50)
        ellipse(0, 0, this.size)
        pop()
    }
}

class Snowmound extends Artifact {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.size = 48
        this.name = 'Snowmound'
    }

    draw() {
        push()
        translate(this.x, this.y)
        fill(255)
        noStroke()
        ellipse(0, 0, this.size, this.size / 2)
        pop()
    }
}
