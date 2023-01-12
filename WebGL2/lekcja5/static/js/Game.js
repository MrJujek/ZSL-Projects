class Game {
    constructor() {
        this.size = 50
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(this.size * 4, 500, 500)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x4a4a4a);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.lookAt(this.size * 4, 0, this.size * 4);
        this.board = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ];
        this.pawns = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ];

        //this.scene.add(new THREE.AxesHelper(100))

        this.createBoard()
        //this.givePawns()

        this.render()
    }

    render = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        //console.log("render leci")
    }

    createBoard = () => {
        const geometry = new THREE.BoxGeometry(this.size, 5, this.size);
        const jasne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/jasne.jpg') });
        const ciemne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/ciemne.jfif') });
        let cube

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 1) {
                    cube = new THREE.Mesh(geometry, jasne);
                    this.scene.add(cube);
                    cube.position.set(i * this.size, 2.5, j * this.size)
                } else {
                    cube = new THREE.Mesh(geometry, ciemne);
                    this.scene.add(cube);
                    cube.position.set(i * this.size, 2.5, j * this.size)
                }
            }
        }
    }

    givePawns = () => {
        const geometry = new THREE.CylinderGeometry(this.size / 2, this.size / 2, 5, 20);
        const white = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/bialy.jpg') });
        const black = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/czarny.jfif') });
        let cylinder

        for (let i = 0; i < this.pawns.length; i++) {
            for (let j = 0; j < this.pawns[i].length; j++) {
                if (this.pawns[i][j] == 2) {
                    cylinder = new THREE.Mesh(geometry, white);
                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.size, 7.5, i * this.size)
                } else if (this.pawns[i][j] == 1) {
                    cylinder = new THREE.Mesh(geometry, black);
                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.size, 7.5, i * this.size)
                }
            }
        }
    }
}