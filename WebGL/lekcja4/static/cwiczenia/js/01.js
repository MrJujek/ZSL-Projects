window.addEventListener("load", function () {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    ///////////////// podloga
    const grid = new Grid()
    scene.add(grid.getGrid())
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

    const light = new THREE.SpotLight(0xffff00, 10);
    light.position.set(0, 500, 0);
    // light.target = cube;
    scene.add(light);

    const modelMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("mario/mario2.jpg"),
        morphTargets: true
    });
    let geometry = new THREE.Mesh()
    const loader = new THREE.JSONLoader();

    let mixer
    loader.load('mario/mario.js', function (geometry) {
        let meshModel = new THREE.Mesh(geometry, modelMaterial)
        meshModel.name = "mario";
        meshModel.rotation.y = 1; // ustaw obrót modelu
        meshModel.position.y = 1; // ustaw pozycje modelu
        meshModel.scale.set(1, 1, 1); // ustaw skalę modelu
        meshModel.position.set(0, 25, 0)

        scene.add(meshModel);

        console.log(geometry.animations)
        mixer = new THREE.AnimationMixer(meshModel)
        mixer.clipAction(geometry.animations[1].name).play()




        for (let i = 0; i < geometry.animations.length; i++) {
            let element = document.createElement("div")
            element.innerText = geometry.animations[i].name
            element.classList.add("animacje")
            element.setAttribute("id", "animacja" + i)
            if (i % 2 == 1) {
                element.style.top = (i - 1) * 15 + "px"
                element.style.right = "100px"
            } else {
                element.style.top = i * 15 + "px"
                element.style.right = "0px"
            }
            document.body.appendChild(element)


            document.getElementById("animacja" + i).onclick = () => {
                mixer.stopAllAction()

                mixer.clipAction(geometry.animations[i].name).play()
            }
        }
    });
    const clock = new THREE.Clock();
    let krecenie = document.getElementById("rotation").value
    function render() {
        let delta = clock.getDelta();
        //console.log(delta)
        camera.updateProjectionMatrix();

        light.intensity = document.getElementById("intensity").value;

        requestAnimationFrame(render);
        console.log("render leci")
        camera.position.set(Math.cos(krecenie) * 100, document.getElementById("y").value, Math.sin(krecenie) * 100) //X,Y,Z (Y - wysokosc)
        camera.lookAt(scene.position)
        krecenie = document.getElementById("rotation").value

        renderer.render(scene, camera);
        //console.log(mixer);

        if (mixer) {
            mixer.update(delta)
        }
    }

    render();
})