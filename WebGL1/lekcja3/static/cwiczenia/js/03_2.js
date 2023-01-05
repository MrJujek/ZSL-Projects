class Light {

    constructor(color) {
        this.color = color

        this.container = new THREE.Object3D();

        this.init(color)
    }

    init(color) {
        this.light = new THREE.SpotLight(color);
        this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy!!!

        this.container.add(this.light);

        let geometry = new THREE.SphereGeometry(3, 3, 3);
        let material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        this.sphere_light = new THREE.Mesh(geometry, material);

        // dodanie go do kontenera

        this.container.add(this.mesh);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc

    changeColor(color) {
        console.log("zmiana koloru na " + color)
    }

}