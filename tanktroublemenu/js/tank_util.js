// JavaScript source code



function killBullet(bullet) {
    this.physics.world.removeCollider(bullet.targetCollider);
    bullet.disableBody(true, true);
    bullet.setActive(false);
    bullet.setVisible(false);
}



function activateExplosion(explosion) {
    explosion.setDepth(5);
    explosion.setActive(true);
    explosion.setVisible(true);
}


function animComplete(animation, frame, gameObject) {
    gameObject.disableBody(true, true);
}

function damageWall(bullet, tile) {
    //var destructLayer = this.map.getLayer("walls").tilemapLayer;
    killBullet(bullet);


    var index = tile.index + 1;
    var tileProperties = this.destructLayer.tileset[0].tileProperties[index - 1];


    var checkCollision = false;

    if (tileProperties) {
        if (tileProperties.collides) {
            checkCollision = true;

        }
    }
    const newTile = this.destructLayer.putTileAt(index, tile.x, tile.y);
    if (checkCollision) {
        newTile.setCollision(true);
    }

}


function bulletHitPlayer(hull, bullet) {

    killBullet(bullet);
    player = hull === player1.hull ? player1 : player2;
    player.damage();
    if (player.isDestroyed()) {
        var explosion = this.explosions.get(hull.x, hull.y);
        if (explosion) {
            activateExplosion(explosion);
            explosion.play('explode');
        }
        this.physics.pause();
    }
}

/*
function fireBullet(bullet, rotation, target, destructLayer) {
    bullet.setDepth(3);
    bullet.body.collideWorldBounds = true;
    bullet.body.onWorldBounds = true;
    //console.log('fire bullet');
    bullet.enableBody(false);
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.rotation = rotation;
    //breaking walls

    //destructLayer = level1.map.getLayer("walls").tilemapLayer;
    this.physics.add.collider(bullet, destructLayer, damageWall, null, this);

    this.physics.velocityFromRotation(bullet.rotation, 500, bullet.body.velocity);
    bullet.targetCollider = this.physics.add.overlap(target.hull, bullet, bulletHitPlayer, null, this);
}*/



function fireBullet(bullet, rotation, target, destructLayer, enemyTanks) {
    bullet.setDepth(3);
    bullet.body.collideWorldBounds = true;
    bullet.body.onWorldBounds = true;
    //console.log('fire bullet');
    bullet.enableBody(false);
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.rotation = rotation;
    //breaking walls

    //destructLayer = level1.map.getLayer("walls").tilemapLayer;
    this.physics.add.collider(bullet, destructLayer, damageWall, null, this);

    this.physics.velocityFromRotation(bullet.rotation, 500, bullet.body.velocity);
    if (target === enemyTanks) {
        for (var i = 0; i < enemyTanks.length; i++) {
            this.physics.add.overlap(enemyTanks[i].hull, bullet, bulletHitEnemy, null, this);
        }
    } else {
        bullet.targetCollider = this.physics.add.overlap(target.hull, bullet, bulletHitPlayer, null, this);
    }

}




function tryShoot(player, destructLayer, enemyTanks, bullets) {
    //  console.log('tryShoot this = '+this);
    var bullet = bullets.get(player.turret.x, player.turret.y);
    if (bullet) {
        var otherPlayer = player2;
        if (otherPlayer == player) {
            otherPlayer = player1
        }

        fireBullet.call(this, bullet, player.turret.rotation, otherPlayer, destructLayer, enemyTanks);
    }
}

function bulletHitEnemy(hull, bullet, enemyTanks, explosions) {
    var enemy;
    var index;
    for (var i = 0; i < enemyTanks.length; i++) {
        if (enemyTanks[i].hull === hull) {
            enemy = enemyTanks[i];
            index = i;
            break;
        }
    }
    killBullet(bullet);
    enemy.damage();
    var explosion = explosions.get(hull.x, hull.y);
    if (explosion) {
        activateExplosion(explosion);
        explosion.on('animationcomplete', animComplete, this)
        explosion.play('explode');
    }
    if (enemy.isDestroyed()) {
        //remove from list
        enemyTanks.splice(index, 1);
    }
}