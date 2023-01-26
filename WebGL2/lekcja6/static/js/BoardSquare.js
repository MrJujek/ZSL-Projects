class BoardSquare extends THREE.Mesh {
    constructor(color, size) {
        super()
        this.geometry = new THREE.BoxGeometry(size, 5, size);
        this.material = color
    }
}