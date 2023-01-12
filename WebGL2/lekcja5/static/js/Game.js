class Game {
    constructor() {
        this.wielkosc = 50
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(this.wielkosc * 4, 500, 500)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x666600);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.lookAt(this.wielkosc * 4, 0, this.wielkosc * 4);
        this.szachownica = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ];
        this.pionki = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ];

        this.scene.add(new THREE.AxesHelper(100))

        this.stworzSzachownice()
        this.dajPionki()

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

    stworzSzachownice = () => {
        const geometry = new THREE.BoxGeometry(this.wielkosc, 5, this.wielkosc);
        const jasne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/jasne.jpg') });
        const ciemne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/ciemne.jfif') });
        let cube

        for (let i = 0; i < this.szachownica.length; i++) {
            for (let j = 0; j < this.szachownica[i].length; j++) {
                if (this.szachownica[i][j] == 1) {
                    cube = new THREE.Mesh(geometry, jasne);
                    this.scene.add(cube);
                    cube.position.set(i * this.wielkosc, 2.5, j * this.wielkosc)
                } else {
                    cube = new THREE.Mesh(geometry, ciemne);
                    this.scene.add(cube);
                    cube.position.set(i * this.wielkosc, 2.5, j * this.wielkosc)
                }
            }
        }
    }

    dajPionki = () => {
        const geometry = new THREE.CylinderGeometry(this.wielkosc / 2, this.wielkosc / 2, 5, 20);
        const biale = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/bialy.jpg') });
        const czarne = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/czarny.jfif') });
        let cylinder

        for (let i = 0; i < this.pionki.length; i++) {
            for (let j = 0; j < this.pionki[i].length; j++) {
                if (this.pionki[i][j] == 2) {
                    cylinder = new THREE.Mesh(geometry, biale);
                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.wielkosc, 7.5, i * this.wielkosc)
                } else if (this.pionki[i][j] == 1) {
                    cylinder = new THREE.Mesh(geometry, czarne);
                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.wielkosc, 7.5, i * this.wielkosc)
                }
            }
        }
    }
}