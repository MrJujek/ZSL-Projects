window.addEventListener("load", function () {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    ///////////////// podloga
    const floor = new THREE.PlaneGeometry(256, 256);

    const texture = new THREE.TextureLoader().load("mats/grass_top.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);

    let material = new THREE.MeshPhongMaterial({
        specular: 0x00ffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: texture,
    })

    const plane = new THREE.Mesh(floor, material);
    plane.rotateX(Math.PI / 2);
    scene.add(plane);
    ///////////////

    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0x444);

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.lookAt(scene.position);

    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 8, 1);

    scene.add(light);

    let materials = [];
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood_top.png') })); //top
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood_top.png') })); //bottom
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //przod
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok

    const geometry = new THREE.BoxGeometry(16, 16, 16);
    const cube = new THREE.Mesh(geometry, materials);


    scene.add(cube);
    cube.position.set(0, 16, 0)

    document.getElementById("direction").onclick = () => {
        light.position.set(Math.random(), Math.random(), Math.random());
    }

    function render() {
        camera.updateProjectionMatrix();

        light.intensity = document.getElementById("intensity").value;

        requestAnimationFrame(render);
        console.log("render leci")


        renderer.render(scene, camera);
    }

    render();
})