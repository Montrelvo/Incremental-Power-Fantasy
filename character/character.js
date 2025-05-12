import { Item } from './item';

export class Character {
    constructor(gameState) {
        this.gameState = gameState;
        this.level = 1;
        this.experience = 0;
        this.attributes = {}; // Example: { strength: 10, agility: 10 }
        this.equipment = {}; // Example: { weapon: null, armor: null }
        this.inventory = []; // Array to hold items
    }

    update(deltaTime) {
        // Update character state based on delta time
        // This could include passive skill effects, regeneration, etc.
    }

    addExperience(amount) {
        this.experience += amount;
        // Check for level up
        while (this.experience >= this.experienceToNextLevel()) {
            this.experience -= this.experienceToNextLevel();
            this.levelUp();
        }
    }

    experienceToNextLevel() {
        // Simple example: scales linearly
        return this.level * 100;
    }

    levelUp() {
        this.level++;
        // Increase attributes, unlock skills, etc.
        console.log(`Character leveled up to level ${this.level}!`);
    }

    addItemToInventory(item) {
        this.inventory.push(item);
        console.log(`Added ${item.name} to inventory.`);
    }

    removeItemFromInventory(item) {
        this.inventory = this.inventory.filter(i => i !== item);
        console.log(`Removed ${item.name} from inventory.`);
    }

    equipItem(item) {
        if (this.inventory.includes(item)) {
            // Unequip existing item of the same type if any
            if (this.equipment[item.type]) {
                this.unequipItem(item.type);
            }

            // Equip the new item and apply effects
            this.equipment[item.type] = item;
            item.applyEffects(this);
            console.log(`Equipped ${item.name}`);
        } else {
            console.warn(`Item ${item.name} not in inventory.`);
        }
    }

    unequipItem(itemType) {
        const item = this.equipment[itemType];
        if (item) {
            // Remove item effects and unequip
            item.removeEffects(this);
            this.equipment[itemType] = null;
            console.log(`Unequipped ${item.name}`);
        }
    }
}