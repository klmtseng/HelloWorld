import Phaser from 'phaser'

export default class Guard {
  constructor(scene, x, y, tx, ty, player) {
    this.scene = scene
    const size = scene.level.tileSize
    this.sprite = scene.add.rectangle(x, y, size, size, 0xff77ff)
    scene.physics.add.existing(this.sprite)
    this.sprite.body.setCollideWorldBounds(true)
    this.player = player
    this.patrolPoints = [{ x, y }, { x: tx, y: ty }]
    this.currentPoint = 1
    this.speed = 100
    this.chaseSpeed = 150
    this.state = 'patrol'
  }

  update() {
    const dist = Phaser.Math.Distance.Between(
      this.sprite.x,
      this.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    )
    if (dist < 150) {
      this.state = 'chase'
    } else if (dist > 200 && this.state === 'chase') {
      this.state = 'patrol'
    }

    if (this.state === 'chase') {
      this.moveTo({ x: this.player.sprite.x, y: this.player.sprite.y }, this.chaseSpeed)
    } else {
      const target = this.patrolPoints[this.currentPoint]
      if (this.moveTo(target, this.speed)) {
        this.currentPoint = (this.currentPoint + 1) % this.patrolPoints.length
      }
    }
  }

  moveTo(target, speed) {
    const body = this.sprite.body
    const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, target.x, target.y)
    body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, target.x, target.y) < 4) {
      body.setVelocity(0, 0)
      return true
    }
    return false
  }
}
