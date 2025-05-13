import { GameScene } from './scenes/GameScene';

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    canvas: {
        willReadFrequently: true // Add this line to address the Canvas2D warning
    }
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);

console.log("Phaser game initialized.");