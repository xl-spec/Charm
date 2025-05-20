class Player extends Creature {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.name = 'Character'
        this.axe = new Axe('Wood Axe', this)
        this.centered_xyz = [0, 0, 0]
        this.pivot_xyz = [0, 0, 0]
    }

    getcentered_xyz() {
        this.centered_xyz = [this.x + this.size / 2, this.y + this.size / 2, 0]
        return this.centered_xyz
    }

    moveWithDirection(direction, speed) {
        let dx = 0,
            dy = 0
        if (direction.west) {
            dx -= 1
            this.pivot_xyz[0] -= 1
        }
        if (direction.east) {
            dx += 1
            this.pivot_xyz[0] += 1
        }
        if (direction.north) {
            dy -= 1
            this.pivot_xyz[1] -= 1
        }
        if (direction.south) {
            dy += 1
            this.pivot_xyz[1] += 1
        }
        const isDiagonal = dx !== 0 && dy !== 0
        const moveSpeed = isDiagonal ? speed / 1.414 : speed
        this.move(dx * moveSpeed, dy * moveSpeed)
    }

    draw() {
        // Optional: call the base hitbox drawing for debugging
        super.draw()
        push()
        translate(this.x, this.y)
        fill(this.color)
        stroke(255)
        ellipse(0, 0, this.size, this.size)
        pop()
        this.axe.draw()
    }
}
