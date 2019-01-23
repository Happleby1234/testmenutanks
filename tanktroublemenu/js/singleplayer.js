


singlePlayer = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function singlePlayer() {
        Phaser.Scene.call(this, { key: 'singlePlayer' });
    },

    preload: function () {
        this.load.atlas('tank', 'assets/tanks/tanks.png', 'assets/tanks/tanks.json');
        this.load.image('earth', 'assets/tanks/scorched_earth.png');
        this.load.atlas('enemy', 'assets/tanks/enemy-tanks.png', 'assets/tanks/tanks.json');
        this.load.image('bullet', 'assets/tanks/bullet.png');
        this.load.audio('hurtSFX', '../assets/audio/sfx/Hurt.mp3');
        this.load.spritesheet('explosion', 'assets/tanks/explosion.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('landscape-tileset', 'assets/maps/landscape-tileset.png');
        this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');

        this.load.spritesheet('button', 'assets/tanks/button.png', { frameWidth: 120, frameHeight: 40 });
    },

    create: function () {

            
        this.physics.world.on('worldbounds', function (body) {
            killBullet(body.gameObject)
        }, this);

        this.isPlaying = true;
        this.SFX = {};
        this.enemyTanks = []
        this.maxEnemies = 6;


        this.map = this.make.tilemap({ key: 'level1' });
        var landscape = this.map.addTilesetImage('landscape', 'landscape-tileset');
        this.map.createStaticLayer('floor', landscape, 0, 0);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixles, this.map.heightInPixles);
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.destructLayer = this.map.createDynamicLayer('walls', landscape, 0, 0);
        this.destructLayer.setCollisionByProperty({ collides: true });

        console.log(player1Keys);
        this.player1 = new PlayerTank(this, game.config.width * 0.5, game.config.height * 0.5, 'tank', 'tank1', player1Keys);
        this.player1.enableCollision(this.destructLayer);
        player1 = this.player1;

        //this.input.on('pointerdown', tryShoot, this);

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 2
        });

        this.enemyBullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        this.explosions = this.physics.add.group({
            defaultKey: 'explosion',
            maxSize: this.maxEnemies
        })

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
            frameRate: 24
        })
        function addSound() {
            SFX.hurt = this.sound.add('hurtSFX', { loop: false, volume: 0.5 });
        }

        console.log('bullets.getchildren.length() = ' + this.bullets.getChildren.length);
        var outerFrame = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        var innerFrame = new Phaser.Geom.Rectangle(game.config.width * 0.25, game.config.height * 0.25, game.config.width * 0.5, game.config.height * 0.5);

        var enemyTank, loc;
        for (var i = 0; i < this.maxEnemies; i++) {
            loc = Phaser.Geom.Rectangle.RandomOutside(outerFrame, innerFrame)
            enemyTank = new EnemyTank(this, loc.x, loc.y, 'enemy', 'tank1', this.player1);
            enemyTank.enableCollision(this.destructLayer);
            enemyTank.setBullets(this.enemyBullets);
            this.enemyTanks.push(enemyTank);
            this.physics.add.collider(enemyTank.hull, this.player1.hull);
            if (i > 0) {
                for (var j = 0; j < this.enemyTanks.length - 1; j++) {
                    this.physics.add.collider(enemyTank.hull, this.enemyTanks[j].hull);
                }
            }
        }
    },

    update: function (time, delta) {
        if (this.isPlaying) {
            this.player1.update();
            for (var i = 0; i < this.enemyTanks.length; i++) {
                this.enemyTanks[i].update(time, delta);
            }
        }

        a();
    }
});

