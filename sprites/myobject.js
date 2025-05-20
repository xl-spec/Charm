class MyObject {
    constructor(x, y, size, color, name) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color || [100, 200, 255, 150]
        this.name = name || 'myObject'
        this.is_alive = true
        this.hitbox = new Hitbox(this.x, this.y, this.size)
    }

    draw() {
        // Update and draw hitbox for debugging
        this.hitbox.update(this.x, this.y, this.size)
        this.hitbox.draw()
    }
}
