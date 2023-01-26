class Pawn extends THREE.Mesh {
    constructor(color, size) {
        super()
        const white = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/bialy.jpg') });
        const black = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/czarny.jpg') });

        this.geometry = new THREE.CylinderGeometry(size / 2, size / 2, 10, 20);
        this.player = color

        if (color == "white") {
            this.material = white
        } else {
            this.material = black
        }
    }
}