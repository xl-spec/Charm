class Level {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT) {
        this.size = { w, h };
        this.layers = [];
        this.previousPivot = null; // Track the player's previous position
    }

    generate_layers() {
        const spacing = 25; // Distance between rectangles on all sides
        for (let i = 0; i < 20; i++) {
            const x = i * spacing;
            const y = i * spacing;
            const width = this.size.w - 2 * x;
            const height = this.size.h - 2 * y;

            let layer = new Layer(width, height, x, y);
            layer.layerN = i + 1;
            layer.color = [10 + i * 20, 200 - i * 20, 255, 150];
            this.layers.push(layer);
        }
    }

    
    adjust_layer(playerObj) {
        if (!this.previousPivot) {
            this.previousPivot = [...playerObj.pivot_xyz];
            return;
        }

        const dx = playerObj.pivot_xyz[0] - this.previousPivot[0];
        const dy = playerObj.pivot_xyz[1] - this.previousPivot[1];

        if (dx !== 0 || dy !== 0) {
            this.layers.forEach((layer, i) => {
                const factor = (i + 1) / this.layers.length; // Scale factor based on layer number
                layer.position.x += dx * factor * 10; // Adjust x position by delta
                layer.position.y += dy * factor * 10; // Adjust y position by delta
            });

            this.previousPivot = [...playerObj.pivot_xyz];
        }
    }

    
    draw() {
        for (let layer of this.layers) {
            push();
            translate(0, 0);
            noFill();
            stroke(layer.color[0], layer.color[1], layer.color[2], layer.color[3]);
            rect(layer.position.x, layer.position.y, layer.size.w, layer.size.h);
            pop();
        }
    }
}
