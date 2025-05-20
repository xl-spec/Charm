class Creature extends MyObject {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
    }

    move(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

class Tree extends Creature {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.size = 32
        this.name = 'Dead Tree'
    }

    draw() {
        if (this.is_alive) {
            push()
            translate(this.x, this.y)
            // Trunk
            fill(139, 69, 19)
            rect(-this.size / 8, -this.size, this.size / 4, this.size)
            // Leaves
            fill(34, 139, 34)
            ellipse(0, -this.size, this.size, this.size)
            pop()
        }
    }
}

class Snowman extends Creature {
    constructor(x, y, size, color, name) {
        super(x, y, size, color, name)
        this.size = 32
        this.name = 'Snowman'
        this.snowball = new Snowball('snowball', this)
    }

    update(player) {
        // Fire a snowball at the player if not already active
        if (!this.snowball.active) {
            this.shootAtPlayer(player)
        }
        this.snowball.update()
    }

    shootAtPlayer(player) {
        this.snowball.startAttack(createVector(player.x, player.y))
    }

    draw() {
        if (this.is_alive) {
            push()
            translate(this.x, this.y)
            fill(255)
            // Draw three stacked circles (from top to bottom)
            ellipse(0, -this.size, this.size * 0.5)
            ellipse(0, 0, this.size * 0.8)
            ellipse(0, this.size, this.size)
            pop()
            this.snowball.draw()
        }
    }
}
