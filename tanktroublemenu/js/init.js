
var config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 1280,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: {
				y: 0
			} // Top down game, so no gravity
		}
    },
    scene: [mainMenu, singlePlayer, doublePlayer]
};

var game = new Phaser.Game(config);

