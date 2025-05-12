import { GameLoop } from './core/game_loop';
import { GameState } from './core/game_state';
import { Character } from './character/character';
import { ResourceManager } from './resources/resource_manager';
import { CharacterCreation } from './character/character_creation';
import { Item } from './character/item'; // Import Item class

// Initialize game state
const gameState = new GameState();

// Initialize core components
const resourceManager = new ResourceManager(gameState);
const characterCreation = new CharacterCreation(gameState);

// Create the character
const playerCharacter = characterCreation.createCharacter("Hero", { strength: 10, agility: 10 });

// Pass components to game state if needed for cross-component access
gameState.resourceManager = resourceManager;
// The character is already set in gameState by characterCreation.createCharacter

// Create a sample item and add to inventory
const basicSword = new Item('basic_sword', 'Basic Sword', 'weapon', { attribute: 'strength', value: 5 });
playerCharacter.addItemToInventory(basicSword);

// Equip the sample item
playerCharacter.equipItem(basicSword);


// Initialize game loop
const gameLoop = new GameLoop(gameState);

// Start the game loop
gameLoop.start();

console.log("Game initialized and loop started.");

// Simple click interaction example (for demonstration)
document.addEventListener('click', () => {
    gameState.addResource('gold', 1); // Add 1 gold per click
    console.log('Clicked! Gold:', gameState.getResource('gold'));
});