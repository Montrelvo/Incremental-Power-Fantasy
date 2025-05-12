export class Item {
    constructor(id, name, type, effects) {
        this.id = id;
        this.name = name;
        this.type = type; // e.g., 'weapon', 'armor', 'accessory'
        this.effects = effects; // object describing effects, e.g., { attribute: 'strength', value: 5 }
    }

    applyEffects(character) {
        // Apply item effects to the character
        console.log(`Applying effects of ${this.name}`);
        if (this.effects.attribute && this.effects.value) {
            if (character.attributes[this.effects.attribute] !== undefined) {
                character.attributes[this.effects.attribute] += this.effects.value;
                console.log(`Increased ${this.effects.attribute} by ${this.effects.value}`);
            }
        }
        // Add more complex effect handling here
    }

    removeEffects(character) {
        // Remove item effects from the character
        console.log(`Removing effects of ${this.name}`);
        if (this.effects.attribute && this.effects.value) {
            if (character.attributes[this.effects.attribute] !== undefined) {
                character.attributes[this.effects.attribute] -= this.effects.value;
                console.log(`Decreased ${this.effects.attribute} by ${this.effects.value}`);
            }
        }
        // Add more complex effect handling here
    }
}