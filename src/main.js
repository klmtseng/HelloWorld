import Phaser from 'phaser'
import GameScene from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  backgroundColor: '#0b0015',
  pixelArt: true,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [GameScene]
}

export default new Phaser.Game(config)
