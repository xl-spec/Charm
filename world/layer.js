class Layer {
    constructor(w = LEVEL_WIDTH, h = LEVEL_HEIGHT, x = 0, y = 0) {
        this.layerN = 0 // Default layer number
        this.size = { w, h } // Width and height of the layer
        this.position = { x, y } // Position of the layer
        this.color = [10, 200, 255, 150] // Default color
        this.circle_initial = []
        this.circle_cur = []
        this.circle_color = [255, 255, 255] // Default circle color
    }
}
