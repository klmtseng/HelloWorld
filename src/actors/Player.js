import Phaser from 'phaser'

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene
    const size = scene.level.tileSize
    this.sprite = scene.add.rectangle(x, y, size, size, 0xffffff)
    scene.physics.add.existing(this.sprite)
    this.sprite.body.setCollideWorldBounds(true)
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.speed = 200
  }

  update() {
    const body = this.sprite.body
    body.setVelocity(0)
    if (this.cursors.left.isDown) body.setVelocityX(-this.speed)
    else if (this.cursors.right.isDown) body.setVelocityX(this.speed)
    if (this.cursors.up.isDown) body.setVelocityY(-this.speed)
    else if (this.cursors.down.isDown) body.setVelocityY(this.speed)
    if (body.velocity.length() > 0) {
      body.velocity.normalize().scale(this.speed)
    }
  }
}
