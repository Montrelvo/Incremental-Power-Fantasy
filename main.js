import config from './phaser.config.js'; // Import the configuration
// import { GameScene } from './scenes/GameScene'; // The scene is now defined in the config

// Create a new Phaser game instance using the imported config
const game = new Phaser.Game(config);

console.log("Phaser game initialized.");