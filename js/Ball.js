AFRAME.registerComponent("ball", {
    init: function() {
        this.release();
    },
    release: function() {
        window.addEventListener("keydown", e => {
            if (e.key == "z") {
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.5
                });
                ball.setAttribute("material", "color", "black");
                var camera = document.querySelector("#camera");
                var direction = new THREE.Vector3();
                camera.object3D.getWorldDirection(direction);
                pos = camera.getAttribute("position");
                ball.setAttribute("position", {
                    x: 10,
                    y: 1.5,
                    z: pos.z
                });
                ball.setAttribute("velocity", direction.multiplyScalar(-10));
                ball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: 0
                });
                var scene = document.querySelector("#scene");
                scene.appendChild(ball);
            }
        });
    }
});