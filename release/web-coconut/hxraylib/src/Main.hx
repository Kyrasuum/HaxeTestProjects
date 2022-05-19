package;

import Raylib.*;
import Raylib.Colors.*;

/**
 * ...
 * @author Kyrasuum
 */
class Main {
    static function main() {
        InitWindow(800, 450, "hxRaylib");

        // Define the camera to look into our 3d world
        var camera: Raylib.Camera = Raylib.Camera.create();
        camera.position = Raylib.Vector3.create( 0.0, 10.0, 10.0 );         // Camera position
        camera.target = Raylib.Vector3.create( 0.0, 0.0, 0.0 );             // Camera looking at point
        camera.up = Raylib.Vector3.create( 0.0, 1.0, 0.0 );                 // Camera up vector (rotation towards target)
        camera.fovy = 45.0;                                                 // Camera field-of-view Y
        camera.projection = Raylib.CameraProjection.CAMERA_PERSPECTIVE;     // Camera mode type

        // Define cube position and rotation
        var cubePosition = Raylib.Vector3.create( 0.0, 0.0, 0.0 );

        // Main game loop
        while (!WindowShouldClose()) {
            BeginDrawing();
                ClearBackground(RAYWHITE);

                BeginMode3D(camera);
                    DrawCube(cubePosition, 2.0, 2.0, 2.0, RED);
                    DrawCubeWires(cubePosition, 2.0, 2.0, 2.0, MAROON);

                    DrawGrid(10, 1.0);
                EndMode3D();
                
                DrawFPS(10, 10);
            EndDrawing();
        }

        CloseWindow();
    }
}