var player1Keys = { left: Phaser.Input.Keyboard.KeyCodes.LEFT, right: Phaser.Input.Keyboard.KeyCodes.RIGHT, down: Phaser.Input.Keyboard.KeyCodes.DOWN, up: Phaser.Input.Keyboard.KeyCodes.UP, l: Phaser.Input.Keyboard.KeyCodes.L };
var player2Keys = { w: Phaser.Input.Keyboard.KeyCodes.W, a: Phaser.Input.Keyboard.KeyCodes.A, s: Phaser.Input.Keyboard.KeyCodes.S, d: Phaser.Input.Keyboard.KeyCodes.D, space: Phaser.Input.Keyboard.KeyCodes.SPACE };


var player1, player2;
var mainMenu, singlePlayer, doublePlayer;

mainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainMenu() {
        Phaser.Scene.call(this, { key: 'mainMenu' });
    },

    preload: function () {
        this.load.image('background', 'assets/maps/tank.jpg');
        this.load.spritesheet('button', 'assets/tanks/button.png', { frameWidth: 120, frameHeight: 40 });
        this.load.spritesheet('button2', 'assets/tanks/button2.png', { frameWidth: 120, frameHeight: 40 });
    },

    create: function () {
        var background = this.add.image(game.config.width / 2, game.config.width / 2, 'background')
        var startButton = this.add.text(game.config.width / 1.6, game.config.height / 2, 'Double Player', { fontFamily: 'Arial', fontSize: '32px', backgroundColor: '#444', fill: '#FFF' });
        var startButton2 = this.add.text(game.config.width / 3, game.config.height / 2, 'Single Player', { fontFamily: 'Arial', fontSize: '32px', backgroundColor: '#444', fill: '#FFF' });
        startButton.setDepth(2);
        startButton.x -= startButton.width / 2;
        startButton.y -= startButton.height / 2;
        startButton.setInteractive();
        startButton.on('pointerdown', function () {
            console.log('From Main Menu to double Player');
            console.log(singlePlayer);
            this.scene.start('doublePlayer');
        }, this);

        startButton2.setDepth(2);
        startButton2.x -= startButton.width / 2;
        startButton2.y -= startButton.height / 2;
        startButton2.setInteractive();
        startButton2.on('pointerdown', function () {
            console.log('From Main Menu to Single Player');
            console.log(singlePlayer);
            this.scene.start('singlePlayer');
        }, this);
    }

});// JavaScript source code
