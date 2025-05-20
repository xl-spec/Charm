class Layer {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT, x = 0, y = 0) {
        this.layerN = 0; // Default layer number
        this.size = { w, h }; // Width and height of the layer
        this.position = { x, y }; // Position of the layer
        this.color = [10, 200, 255, 150]; // Default color
    }

    // draw() {   
    //     push()
    //     translate(width / 2 - this.size.w / 2, height / 2 - this.size.h / 2)
    //     fill(this.color);
    //     stroke(255)
    //     rect(0, 0, this.size.w, this.size.h)
    //     pop()
    // }
}
