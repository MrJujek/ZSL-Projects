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

    let materials = [];
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood_top.png') })); //top
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood_top.png') })); //bottom
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //przod
    materials.push(new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/wood.jpg') })); //bok

    let geometry = new THREE.BoxGeometry(16, 16, 16);
    const cube = new THREE.Mesh(geometry, materials);


    scene.add(cube);
    cube.position.set(0, 16, 0)

    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)

    const light = new THREE.SpotLight(0xffff00, 10);
    light.position.set(100, 100, 100);
    light.target = cube;
    scene.add(light);

    geometry = new THREE.SphereGeometry(3, 3, 3);
    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    let sphere_light = new THREE.Mesh(geometry, material);
    scene.add(sphere_light);

    geometry = new THREE.SphereGeometry(3, 3, 3);
    material = new THREE.MeshBasicMaterial({ color: 0xff0f0f, wireframe: true });
    let sphere_target = new THREE.Mesh(geometry, material);
    scene.add(sphere_target);




    function render() {
        camera.updateProjectionMatrix();

        light.intensity = document.getElementById("intensity").value;



        sphere_target.position.set(Math.sin(document.getElementById("rotation").value) * 100, 10, Math.cos(document.getElementById("rotation").value) * 100);

        requestAnimationFrame(render);
        console.log("render leci")

        if (document.getElementById('target').checked == true) {
            light.position.set(sphere_target.position.x, sphere_target.position.y, sphere_target.position.z);

            sphere_light.position.set(light.position.x, light.position.y, light.position.z)
        } else {
            light.position.set(0, document.getElementById("y").value, 0);

            sphere_light.position.set(light.position.x, light.position.y, light.position.z)
        }


        renderer.render(scene, camera);
    }

    render();
})