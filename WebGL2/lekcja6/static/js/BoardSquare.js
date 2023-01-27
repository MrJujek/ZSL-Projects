class BoardSquare extends THREE.Mesh {
    constructor(color, size, i, j) {
        super()
        const jasne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/light.jpg') });
        const ciemne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/dark.jfif') });

        this.geometry = new THREE.BoxGeometry(size, 5, size);
        this.squareColor = color
        this.what = "BoardSquare"
        this.boardX = j
        this.boardY = i

        if (color == "light") {
            this.material = jasne
        } else {
            this.material = ciemne
        }
    }
}