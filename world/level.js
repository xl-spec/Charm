class Level {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT) {
        this.size = { w, h };
        this.layers = [];
        this.previousPivot = null; // Track the player's previous position
    }

    generate_layers() {
        const spacing = 5;
        for (let i = 0; i < 50; i++) {
            const x = i * spacing;
            const y = i * spacing;
            const width = this.size.w - 2 * x;
            const height = this.size.h - 2 * y;

            let layer = new Layer(width, height, x, y);

            // for the time being, creating a original position variable for adjust_layer

            layer.layerN = i + 1;
            layer.color = [10 + i * 20, 200 - i * 20, 255, 150];
            layer.originalPosition = { x, y }; 
            layer.circle_initial = [
                Math.floor(Math.random() * layer.size.w), 
                Math.floor(Math.random() * layer.size.h), 
                Math.floor(Math.random() * (layer.size.w / 4))
            ]
            layer.circle_color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
            // layer.circle_color = [0, 25, 255];
            layer.circle_cur = layer.circle_initial.slice(); // 
            this.layers.push(layer);
        }
    }

    adjust_layer(playerObj) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            const factor = (i + 1) / this.layers.length;

            // Calculate new position for the layer
            const dx = playerObj.pivot_xyz[0] * factor * PLAYER_SPEED;
            const dy = playerObj.pivot_xyz[1] * factor * PLAYER_SPEED;

            layer.position.x = layer.originalPosition.x + dx;
            layer.position.y = layer.originalPosition.y + dy;

            layer.circle_cur[0] = layer.circle_initial[0] + dx;
            layer.circle_cur[1] = layer.circle_initial[1] + dy;

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

            push();
                // noFill();
                noStroke(); 
                fill(layer.circle_color[0], layer.circle_color[1], layer.circle_color[2], 100);
                circle(layer.circle_cur[0], layer.circle_cur[1], layer.circle_cur[2]) 
            pop();
        }
    }
}
