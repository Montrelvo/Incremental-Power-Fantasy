export class CharacterCreation {
    constructor(gameState) {
        this.gameState = gameState;
    }

    createCharacter(name, initialAttributes) {
        // Basic character creation logic
        const newCharacter = new Character(this.gameState);
        newCharacter.name = name;
        newCharacter.attributes = initialAttributes;
        this.gameState.character = newCharacter; // Set the created character in game state
        console.log(`Character "${name}" created!`);
        return newCharacter;
    }

    // Potentially add methods for selecting appearance, class, etc.
}

// Import Character class if it's in a different file (it is in this case)
import { Character } from './character';