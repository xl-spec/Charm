class KeyHandler {
    constructor() {
        this.keys = {}
    }

    handleKeyPressed(k) {
        this.keys[k] = true
    }

    handleKeyReleased(k) {
        this.keys[k] = false
    }

    getMovement() {
        return {
            north: this.keys['w'] || this.keys['W'],
            south: this.keys['s'] || this.keys['S'],
            east: this.keys['d'] || this.keys['D'],
            west: this.keys['a'] || this.keys['A'],
            up: false,
            down: false,
        }
    }

    getAction() {
        return this.keys[' '] || false // space bar triggers action
    }
}
