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
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();

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

        this.render()
    }

    render = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight - 100);

        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        this.camera.lookAt(this.size * 4, 0, this.size * 4);
    }

    createBoard = () => {
        let cube

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 1) {
                    cube = new BoardSquare("light", this.size, i, j)
                    this.scene.add(cube);
                    cube.position.set(i * this.size + this.size / 2, 2.5, j * this.size + this.size / 2)
                } else {
                    cube = new BoardSquare("dark", this.size, i, j)
                    this.scene.add(cube);
                    cube.position.set(i * this.size + this.size / 2, 2.5, j * this.size + this.size / 2)
                }
            }
        }
    }

    givePawns = () => {
        let cylinder

        for (let i = 0; i < this.pawns.length; i++) {
            for (let j = 0; j < this.pawns[i].length; j++) {
                if (this.pawns[i][j] == 2) {
                    cylinder = new Pawn("white", this.size, i, j)

                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.size + this.size / 2, 10, i * this.size + this.size / 2)

                } else if (this.pawns[i][j] == 1) {
                    cylinder = new Pawn("black", this.size, i, j)

                    this.scene.add(cylinder);
                    cylinder.position.set(j * this.size + this.size / 2, 10, i * this.size + this.size / 2)
                }
            }
        }
    }

    checkForMovePawn = (player) => {
        let pawnChecked = false;
        let oldPawn
        window.addEventListener("mousedown", (e) => {
            this.mouseVector.x = (e.clientX / document.getElementById("root").offsetWidth) * 2 - 1;
            this.mouseVector.y = -((e.clientY - 100) / document.getElementById("root").offsetHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);

            const intersects = this.raycaster.intersectObjects(this.scene.children);
            //console.log(intersects);
            if (intersects.length > 0) {
                //console.log(intersects[0].object.what);
                if (intersects[0].object.what == "Pawn") {
                    if (player == 1) {
                        if (intersects[0].object.player == "white") {
                            if (pawnChecked) {
                                oldPawn.material.color.setHex(0xffffff);
                                intersects[0].object.material.color.setHex(0xff0000);
                                oldPawn = intersects[0].object;
                            } else {
                                intersects[0].object.material.color.setHex(0xff0000);
                                pawnChecked = true;
                                oldPawn = intersects[0].object;
                            }
                        }
                    } else {
                        if (intersects[0].object.player == "black") {
                            if (pawnChecked) {
                                oldPawn.material.color.setHex(0xffffff);
                                intersects[0].object.material.color.setHex(0xff0000);
                                oldPawn = intersects[0].object;
                            } else {
                                intersects[0].object.material.color.setHex(0xff0000);
                                pawnChecked = true;
                                oldPawn = intersects[0].object;
                            }
                        }
                    }
                } else {
                    if (intersects[0].object.squareColor == "dark") {
                        if (pawnChecked) {
                            oldPawn.position.set(intersects[0].object.position.x, 10, intersects[0].object.position.z)
                            oldPawn.material.color.setHex(0xffffff);
                            pawnChecked = false;
                            if (player == 1) {
                                this.pawns[intersects[0].object.boardX][intersects[0].object.boardY] = 0;
                                this.pawns[oldPawn.pawnY][oldPawn.pawnX] = 2;
                            }
                            else {
                                this.pawns[intersects[0].object.boardX][intersects[0].object.boardY] = 0;
                                this.pawns[oldPawn.pawnY][oldPawn.pawnX] = 1;
                            }
                        }

                        console.log(this.pawns);
                    }
                }
            }
        });
    }

    setPlayer = (player) => {
        if (player == 1) {
            this.camera.position.set(this.size * 4, 500, -100)
        } else {
            this.camera.position.set(this.size * 4, 500, 500)
        }
        this.checkForMovePawn(player);
    }
}