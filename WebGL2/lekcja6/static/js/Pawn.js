class Pawn extends THREE.Mesh {
    constructor(color, size) {
        super()
        this.geometry = new THREE.CylinderGeometry(size / 2, size / 2, 10, 20);
        this.material = color
    }
}