import Phaser from 'phaser';
import { GameState } from '../core/game_state';
import { Character } from '../character/character';
import { ResourceManager } from '../resources/resource_manager';
import { CharacterCreation } from '../character/character_creation';
import { Item } from '../character/item';
import { Generator } from '../resources/generator';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.gameState = null;
        this.character = null;
        this.resourceManager = null;
        this.characterCreation = null;
    }

    preload() {
        // Preload assets like images, sounds, etc.
        // Example: this.load.image('logo', 'assets/logo.png');
    }

    create() {
        // Initialize core game logic components
        this.gameState = new GameState();
        this.resourceManager = new ResourceManager(this.gameState);
        this.characterCreation = new CharacterCreation(this.gameState);

        // Create the character
        this.character = this.characterCreation.createCharacter("Hero", { strength: 10, agility: 10 });

        // Pass components to game state if needed for cross-component access
        this.gameState.resourceManager = this.resourceManager;
        // The character is already set in gameState by characterCreation.createCharacter

        // Create a sample item and add to inventory
        const basicSword = new Item('basic_sword', 'Basic Sword', 'weapon', { attribute: 'strength', value: 5 });
        this.character.addItemToInventory(basicSword);

        // Equip the sample item
        this.character.equipItem(basicSword);


        // Add UI elements
        this.goldDisplay = this.add.text(50, 50, 'Gold: 0', { fontSize: '24px', fill: '#fff' });

        const clickButton = this.add.text(50, 100, 'Click Me!', { fontSize: '32px', fill: '#0f0', backgroundColor: '#555' })
            .setInteractive()
            .on('pointerdown', () => {
                this.gameState.addResource('gold', 1); // Add 1 gold per click
                console.log('Clicked! Gold:', this.gameState.getResource('gold'));
                this.updateResourceDisplay(); // Update display after resource change
            });


        console.log("GameScene created.");
    }

    update(time, delta) {
        // Update game logic here
        // 'delta' is the time in milliseconds since the last frame
        const deltaTimeInSeconds = delta / 1000;
        this.gameState.update(deltaTimeInSeconds);
        this.character.update(deltaTimeInSeconds);
        this.resourceManager.update(deltaTimeInSeconds);

        // Update UI elements based on game state
        this.updateResourceDisplay();
    }

    updateResourceDisplay() {
        if (this.goldDisplay) {
            this.goldDisplay.setText(`Gold: ${this.gameState.getResource('gold').toFixed(2)}`);
        }
    }
}