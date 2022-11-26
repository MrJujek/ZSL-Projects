class Grid {

    constructor() {
        this.init()
    }

    init() {
        this.floor = new THREE.PlaneGeometry(256, 256);

        this.texture = new THREE.TextureLoader().load("mats/grass_top.jpg");
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(16, 16);

        this.material = new THREE.MeshPhongMaterial({
            specular: 0x00ffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: this.texture,
        })

        this.plane = new THREE.Mesh(this.floor, this.material);
        this.plane.rotateX(Math.PI / 2);

    }

    getGrid() {
        return this.plane;
    }
}


// const light = new Light("wybrany kolor światła")
// console.log(light)
// scene.add(light.getLight())

// light.changeColor (0xff0000)