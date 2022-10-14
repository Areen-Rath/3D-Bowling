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
                ball.addEventListener("collide", this.removeBall);
                scene.appendChild(ball);
            }
        });
    },
    removeBall: function(e) {
        var target = e.detail.target.el;
        var body = e.detail.body.el;
        if (body.id.includes("pin")) {
            body.setAttribute("material", {
                opacity: 0.6,
                transparent: true
            });
            var impulse = new CANNON.Vec3(-2, 2, 1);
            var worldPoint = new CANNON.Vec3().copy(body.getAttribute("position"));
            body.removeAttribute("static-body");
            body.setAttribute("dynamic-body", {});
            body.body.applyImpulse(impulse, worldPoint);
            target.removeEventListener("collide", this.release);
            var scene = document.querySelector("#scene");
            scene.removeChild(target);
        }
    }
});