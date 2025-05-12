export class Upgrade {
    constructor(id, name, description, cost, effects) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cost = cost; // cost to acquire the upgrade
        this.effects = effects; // object describing the effects, e.g., { resourceType: 'gold', multiplier: 2 }
        this.isApplied = false;
    }

    apply(gameState) {
        if (!this.isApplied) {
            // Apply the effects of the upgrade to the game state
            console.log(`Applying upgrade: ${this.name}`);
            if (this.effects.resourceType && this.effects.multiplier) {
                // Example effect: multiply resource generation rate
                // This would require accessing and modifying generator rates,
                // which might be better handled by the ResourceManager or a dedicated UpgradeManager.
                // For simplicity now, let's just log the intended effect.
                console.log(`Effect: Multiply ${this.effects.resourceType} generation by ${this.effects.multiplier}`);
                // A real implementation would modify the relevant generator/resource manager properties
            }
            this.isApplied = true;
        }
    }
}