class Collider {
  // collection of methods to check for collision, the function is called during the main draw loop
  // handleCollisions() is called and that checks all the other functions
  playerCollideSprite(player, sprite) {
    const d = dist(player.x, player.z, sprite.x, sprite.z);
    return d < player.size / 2 + sprite.size / 2;
  }

  axeCollideSprite(axe, sprite) {
    if (!axe.isAttacking || !sprite.is_alive) return false;
    const axeRadius = AXE_SIZE / 2;
    for (let key in axe.hitbox_map) {
      let hitbox = axe.hitbox_map[key];
      if (
        dist(hitbox.x, hitbox.z, sprite.x, sprite.z) <
        axeRadius + sprite.size / 2
      ) {
        return true;
      }
    }
    return false;
  }

  projectileCollidePlayer(projectile, player) {
    if (!projectile.active) return false;

    const projectileRadius = 4; // flat number

    const d = dist(
      projectile.position.x,
      projectile.position.z,
      player.x,
      player.z
    );
    const xzCollision = d < projectileRadius + player.size / 2;

    if (!xzCollision) {
      // maybe improves performance? idk lol
      return false;
    }

    const yCollision =
      projectile.position.y - projectileRadius < player.y + player.size ||
      projectile.position.y + projectileRadius > player.y;

    // xz & y check
    return xzCollision && yCollision;
  }

  handleCollisions(player, entity) {
    //   if (this.playerCollideSprite(player, entity)) {
    //     console.log(`Player collides with ${entity.name}!`);
    //   }

    if (this.axeCollideSprite(player.axe, entity)) {
      console.log(`Axe collides with ${entity.name}!`);
      entity.is_alive = false;
    }

    if (entity instanceof Snowman) {
      if (this.projectileCollidePlayer(entity.snowball, player)) {
        console.log(`Projectile hit the player!`);
        // entity.snowball.active = false;
      }
    }
  }
}
