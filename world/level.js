class Level {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT) {
        this.size = { w, h }
        this.layers = []
        this.previousPivot = null // Track the player's previous position
    }

    generate_layers() {
        const spacing = 15 // Distance between rectangles on all sides
        let decrement = 1 // need to linearly scale this with width and height (do later)
        for (let i = 0; i < 20; i++) {
            let x = i * spacing
            let y = i * spacing
            let width = this.size.w - 2 * x + decrement
            let height = this.size.h - 2 * y + decrement

            let layer = new Layer(
                width,
                height,
                x - decrement / 2,
                y - decrement / 2
            )
            layer.layerN = i + 1
            layer.color = [10 + i * 15, 200 - i * 20, 255, 150]
            this.layers.push(layer)
            decrement *= 1.3
        }
        console.log('layer 0 w: ' + this.layers[0].size.w)
        console.log('layer 1 w: ' + this.layers[1].size.w)
        console.log('layer 2 w: ' + this.layers[2].size.w)

        console.log('layer 0 h: ' + this.layers[0].size.h)
        console.log('layer 1 h: ' + this.layers[1].size.h)
        console.log('layer 2 h: ' + this.layers[2].size.h)
        // console.log(layer.size.h)
    }

    adjust_layer(playerObj) {
        if (!this.previousPivot) {
            this.previousPivot = [...playerObj.pivot_xyz]
            return
        }

        const dx = playerObj.pivot_xyz[0] - this.previousPivot[0]
        const dy = playerObj.pivot_xyz[1] - this.previousPivot[1]

        if (dx !== 0 || dy !== 0) {
            this.layers.forEach((layer, i) => {
                const factor = (i + 1) / this.layers.length // Scale factor based on layer number
                layer.position.x += dx * factor * 10 // Adjust x position by delta
                layer.position.y += dy * factor * 10 // Adjust y position by delta
            })

            this.previousPivot = [...playerObj.pivot_xyz]
        }
    }

    draw(ZOOMIES) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i]
            const depth = (i + 1) / this.layers.length // 0..1
            // Extra per-layer scaling for fake Z (relative to overall ZOOM)
            const localZoom = 1 + (ZOOMIES - 1) * DEPTH_ZOOM * depth

            // Center of this layer (to scale about center)
            const cx = layer.position.x + layer.size.w / 2
            const cy = layer.position.y + layer.size.h / 2

            push()
            translate(cx, cy)
            scale(localZoom)
            rectMode(CENTER)
            noFill()
            stroke(
                layer.color[0],
                layer.color[1],
                layer.color[2],
                layer.color[3]
            )
            rect(0, 0, layer.size.w, layer.size.h)
            rectMode(CORNER)
            pop()
        }
    }
}
