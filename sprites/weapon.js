class Weapons {
    constructor(name, holder) {
        this.name = name
        this.holder = holder
        this.hitbox = new Hitbox(this.holder.x, this.holder.y, this.holder.size)
    }
}

class Axe extends Weapons {
    constructor(name, holder) {
        super(name, holder)
        this.isAttacking = false
        this.angle = -0.2
        this.swingSpeed = 0.1
        this.maxAngle = PI / 2
        this.idleAngle = -0.2
    }

    startAttack() {
        this.isAttacking = true
    }

    endAttack() {
        this.isAttacking = false
        this.angle = this.idleAngle
    }

    update() {
        if (!this.isAttacking) return
        this.angle += this.swingSpeed
        if (this.angle > this.maxAngle) {
            this.endAttack()
        }
    }

    draw() {
        push()
        // Draw the axe relative to the holder
        translate(this.holder.x, this.holder.y)
        rotate(this.angle)
        fill(150)
        noStroke()
        // A simple rectangle represents the axe blade
        rect(0, -5, 40, 10)
        pop()
    }
}

class Snowball extends Weapons {
    constructor(name, holder) {
        super(name, holder)
        this.isAttacking = false
        this.position = createVector(holder.x, holder.y)
        this.velocity = createVector(0, 0)
        // Gravity pulls down (in 2D, positive y is down)
        this.acceleration = createVector(0, 0.02)
        this.active = false
    }

    startAttack(target) {
        if (!this.active) {
            this.isAttacking = true
            this.active = true
            let dx = target.x - this.position.x
            let dy = target.y - this.position.y
            let distance = sqrt(dx * dx + dy * dy)
            let horizontalSpeed = 5
            let t = distance / horizontalSpeed
            if (t <= 0) {
                this.active = false
                return
            }
            let vx = dx / t
            let vy = dy / t - 0.5 * this.acceleration.y * t
            this.velocity.set(vx, vy)
        }
    }

    update() {
        if (!this.active) return
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        // If out of canvas bounds, reset
        if (this.position.y > height || this.position.y < 0) {
            this.isAttacking = false
            this.position.set(this.holder.x, this.holder.y)
            this.active = false
        }
    }

    draw() {
        if (!this.active) return
        push()
        translate(this.position.x, this.position.y)
        fill(255)
        noStroke()
        ellipse(0, 0, 8)
        pop()
    }
}
