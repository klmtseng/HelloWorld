import Phaser from 'phaser'
import { generateLevel } from '../utils/levelGenerator.js'
import Player from '../actors/Player.js'
import Guard from '../actors/Guard.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  create() {
    this.level = generateLevel()
    const tileSize = this.level.tileSize
    this.physics.world.setBounds(0, 0, 640, 640)

    this.level.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        let color = 0x280137
        if (cell === 'room') color = 0xffff00
        else if (cell === 'corridor') color = 0x00ffc7
        this.add.rectangle(
          x * tileSize + tileSize / 2,
          y * tileSize + tileSize / 2,
          tileSize,
          tileSize,
          color
        )
      })
    })

    const startRoom = this.level.rooms[0]
    const endRoom = this.level.rooms[this.level.rooms.length - 1]
    const sx = startRoom.x * tileSize + (startRoom.w * tileSize) / 2
    const sy = startRoom.y * tileSize + (startRoom.h * tileSize) / 2
    const gx = endRoom.x * tileSize + (endRoom.w * tileSize) / 2
    const gy = endRoom.y * tileSize + (endRoom.h * tileSize) / 2

    this.player = new Player(this, sx, sy)
    this.guard = new Guard(this, gx, gy, sx, sy, this.player)
  }

  update() {
    this.player.update()
    this.guard.update()
  }
}
