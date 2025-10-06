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

    getZoom() {
        let zoomDelta = 0
        if (this.keys['e'] || this.keys['+']) {
            zoomDelta += ZOOM_STEP
        }
        if (this.keys['q'] || this.keys['_']) {
            zoomDelta -= ZOOM_STEP
        }
        return zoomDelta
    }

    setZoom(zoomDelta) {
        ZOOMIES += zoomDelta
    }

    getAction() {
        return this.keys[' '] || false // space bar triggers action
    }
}
