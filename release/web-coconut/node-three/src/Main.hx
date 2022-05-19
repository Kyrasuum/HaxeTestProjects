package;

import js.Node.*;
import js.node.*;

/**
 * ...
 * @author Kyrasuum
 */
class Main {
    var init: Dynamic = js.Syntax.code("require('3d-core-raub')({title: 'Test'})");
    var glfw: Dynamic;
    var screen: Dynamic;
    var loop: Dynamic;

    var mesh: Dynamic;
    var light: Dynamic;

    var cube: Dynamic;

    public function new() {
        glfw = init.glfw;

        screen = js.Syntax.code("new {0}.Screen()", init);
        loop = init.loop;

        screen.camera.position.z = 6;

        var geometry = js.Syntax.code("new {0}.BoxGeometry( 1, 1, 1 )", screen.three);
        var material = js.Syntax.code("new {0}.MeshNormalMaterial()", screen.three);
        mesh = js.Syntax.code("new {0}.Mesh({1}, {2})", screen.three, geometry, material);
        mesh.name = "test";
        screen.scene.add(mesh);

        light = js.Syntax.code("new {0}.PointLight(0xFFFFFF, 1, 100000)", screen.three);
        screen.scene.add(light);
        light.position.x = 2;
        light.position.y = 10;
        light.position.z = 6;
    }

    public function exit() {
        Sys.exit(0);
    }

    public function start() {
        screen.on('mousemove', function(event: Dynamic) {
        });

        screen.on('keydown', function(event: Dynamic) {
            if (event.keyCode == glfw.KEY_F && event.ctrlKey && event.shiftKey) {
                screen.mode = 'windowed';
            } else if (event.keyCode == glfw.KEY_F && event.ctrlKey && event.altKey) {
                screen.mode = 'fullscreen';
            } else if (event.keyCode == glfw.KEY_F && event.ctrlKey) {
                screen.mode = 'borderless';
            } else {
                return;
            }
        });

        loop(function() {
            var date = js.Syntax.code("Date.now()");
            mesh.rotation.x = date * 0.0005;
            mesh.rotation.y = date * 0.001;
            mesh.rotation.z = date * 0.0007;
            screen.draw();
        });
    }

	public static function main() {
        var app = new Main();
        app.start();
    }
}
