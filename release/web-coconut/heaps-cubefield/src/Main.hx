package;

import h3d.Quat;

/**
 * ...
 * @author Kyrasuum
 */
class Main extends hxd.App {
    //current player object
    var ply: h3d.scene.Object;
    var plyRoll = 0.0;
    var plyYaw = 0.0;
    //floor object
    var floor: h3d.scene.Object;
    //blocks
    var blocks: Array<h3d.scene.Object> = [];
    //score
    var alive = false;
    var plyScore = 0.0;
    var highScore = 0.0;
    //shading gpu pass
    var shadow: h3d.pass.DefaultShadowMap;
    //2D ui
    var font: h2d.Font;
    var textScore: h2d.Text;
    var textHighScore: h2d.Text;
    var newGameText: h2d.Text;
    var newGameButton: h2d.Interactive;
    var newGameBg: h2d.Graphics;

    override function init() {    
        super.init();
        
        //add resize event callback
        hxd.Window.getInstance().addResizeEvent(h2dOnResize);

        //create player
        ply = hxd.Res.player.toHmd().makeObject();
        ply.toMesh().material.color.setColor(0xFAFAFA);
        ply.setRotation(-0.4, 0, 0);
        s3d.addChild(ply);

        //create floor
        var floorMdl = new h3d.prim.Cube(1000, 1000, 0.1, true);
        floorMdl.addNormals();
        floorMdl.translate(0, 0, -2);
        floor = new h3d.scene.Mesh(floorMdl, s3d);
        floor.toMesh().material.color.setColor(0x909090);
        
        //adds a directional light to the scene
        var light = new h3d.scene.fwd.DirLight(new h3d.Vector(0.5, 0.5, -0.5), s3d);
        light.enableSpecular = true;

        //set the ambient light to 30%
        s3d.lightSystem.ambientLight.set(0.3, 0.3, 0.3);

        //setup camera
        s3d.camera.pos.set(0., -80, 40);
        s3d.camera.target.set(0, 50, 0);

        //setup shading
        shadow = s3d.renderer.getPass(h3d.pass.DefaultShadowMap);
        shadow.size = 2048;
        shadow.power = 200;
        shadow.blur.radius= 0;
        shadow.bias *= 0.1;
        shadow.color.set(0.7, 0.7, 0.7);

        //init font
        font = hxd.res.DefaultFont.get();

        //create score text
        textScore = new h2d.Text(font, s2d);
        textHighScore = new h2d.Text(font, s2d);
        
        textHighScore.text = "High Score: " + Std.string(Math.floor(highScore));
        textScore.text = "Current Score: " + Std.string(Math.floor(plyScore));
        textHighScore.setPosition(5, 0);
        textScore.setPosition(5, font.lineHeight);

        newGame();
    }

    function newGame() {
        //create new game button / text
        newGameText = new h2d.Text(font);
        newGameText.text = "Start New Game";

        var width = 10 + newGameText.calcTextWidth(newGameText.text);
        var height = 5 + font.lineHeight;
        
        newGameBg = new h2d.Graphics(s2d);
        newGameBg.beginFill(0x404040);
        newGameBg.drawRect(0, 0, width, height);
        newGameBg.addChild(newGameText);
        
        newGameButton = new h2d.Interactive(width, height, newGameBg);

        var stage = hxd.Window.getInstance();
        newGameButton.setPosition(stage.width / 2 - width / 2, stage.height / 2);
        newGameBg.setPosition(stage.width / 2 - width / 2, stage.height / 2);
        newGameText.setPosition(5, 2.5);

        newGameButton.onClick = function(event: hxd.Event) {
            startGame();
        };
        newGameButton.onOver = function(event : hxd.Event) {
            newGameBg.alpha = 0.7;
        }
        newGameButton.onOut = function(event : hxd.Event) {
            newGameBg.alpha = 1;
        }
        s2d.addChild(newGameButton);
    }

    function startGame() {
        //handle starting of new game
        newGameButton.remove();
        newGameBg.remove();
        newGameText.remove();

        for (block in blocks) {
            block.remove();
        }
        blocks = [];
        plyScore = 0.0;

        if (ply != null){
            ply.setRotation(-0.4, 0, 0);
        }
        plyRoll = 0.0;
        plyYaw = 0.0;

        alive = true;
    }

    function updateCubes(dt: Float, vel: Int){
        var difficulty = 1 + Math.sqrt(Math.sqrt(plyScore));

        //move blocks towards player
        for (block in blocks) {
            var pos = block.getTransform().getPosition();
            pos.y -= (1 + difficulty) / dt / 100.0;
            pos.x += vel / dt / 100.0;
            block.setPosition(pos.x, pos.y, pos.z);
        }

        //prune blocks that go off edge
        var nextBlocks = [];
        for (block in blocks) {
            var pos = block.getAbsPos().getPosition();
            if (pos.y > -50) {
                nextBlocks.push(block);
            } else {
                block.toMesh().remove();
                block.remove();
                s3d.removeChild(block);
            }
        }

        //spawn new blocks
        if (Math.random() * 100 > 80){
            var blockMdl = new h3d.prim.Cube(5 + Math.random() * 10, 5 + Math.random() * 10, 5 + Math.random() * 10);
            blockMdl.addNormals();
            blockMdl.translate(0, 0, -2);

            var block = new h3d.scene.Mesh(blockMdl, s3d);
            block.toMesh().material.color.setColor(
                (Math.floor(Math.random() * 255) << 16)
                + (Math.floor(Math.random()) * 255 << 8)
                + Math.floor(Math.random() * 255));

            var spawnWidth = (1000 / difficulty);
            block.setPosition(Math.random() * spawnWidth - spawnWidth/2, 500, 0);

            nextBlocks.push(block);
        }

        //update global blocks
        blocks = nextBlocks;
    }

    function updatePlayer(dt: Float, vel: Int) {
        //update score
        plyScore += dt;
        textScore.text = "Current Score: " + Std.string(Math.floor(plyScore));

        //animate player object banking
        switch (vel) {
            case 0: {
                plyRoll += (0 - plyRoll) / 200.0 / dt;
                plyYaw += (0 - plyYaw) / 200.0 / dt;
            }
            case 1: {
                plyRoll += (-1 - plyRoll) / 200.0 / dt;
                plyYaw += (0.5 - plyYaw) / 200.0 / dt;
            }
            case -1: {
                plyRoll += (1 - plyRoll) / 200.0 / dt;
                plyYaw += (-0.5 - plyYaw) / 200.0 / dt;
            }
            default: {}
        }
        //apply bounds
        plyRoll = Math.max(-1, Math.min(1, plyRoll));
        //apply rotation
        if (ply != null){
            ply.setRotation(-0.4, plyRoll, plyYaw);
        }
    }

    override function update(dt: Float) {
        if (alive) {
            //get directional input
            var vel = 0;
            if (hxd.Key.isDown(hxd.Key.LEFT)) {
                vel -= 1;
            }
            if (hxd.Key.isDown(hxd.Key.RIGHT)) {
                vel += 1;
            }

            //update objects
            updatePlayer(dt, vel);
            updateCubes(dt, vel);

            //check if player lost
            for (block in blocks) {
                if (block.toMesh().getBounds().collide(ply.toMesh().getBounds())) {
                    //player lost
                    highScore = plyScore;
                    textHighScore.text = "High Score: " + Std.string(Math.floor(highScore));

                    alive = false;
                    newGame();
                }
            }
        }
    }

    function h2dOnResize() {
        var stage = hxd.Window.getInstance();
    }

    static function main() {
        //initialize embeded ressources
        hxd.Res.initEmbed();

        //start main init
        new Main();
    }
}
