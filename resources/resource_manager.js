import { Generator } from './generator';

export class ResourceManager {
    constructor(gameState) {
        this.gameState = gameState;
        this.generators = []; // Array to hold active generators
    }

    update(deltaTime) {
        // Update resources based on generators and offline earnings
        this.generators.forEach(generator => {
            const generatedAmount = generator.rate * deltaTime;
            this.gameState.addResource(generator.resourceType, generatedAmount);
        });

        // Handle offline earnings (simplified example)
        const now = Date.now();
        const offlineDuration = (now - this.gameState.lastOfflineTime) / 1000; // in seconds
        this.gameState.lastOfflineTime = now;

        if (offlineDuration > 0) {
            console.log(`Calculating offline earnings for ${offlineDuration.toFixed(2)} seconds.`);
            // A more sophisticated system would calculate earnings based on generators and rates
            // For simplicity, let's just add a small amount of a default resource
            const offlineResourceGain = offlineDuration * 0.1; // Example rate
            this.gameState.addResource('gold', offlineResourceGain);
        }
    }

    addGenerator(generator) {
        this.generators.push(generator);
    }

    removeGenerator(generator) {
        this.generators = this.generators.filter(g => g !== generator);
    }

    purchaseGenerator(generatorId) {
        // Find the generator definition (assuming a list of available generators exists)
        // For now, let's use a placeholder or a simple hardcoded example
        const availableGenerators = [
            new Generator('basic_miner', 'Basic Miner', 'gold', 0.5, { gold: 10 }),
            // Add more generator types here
        ];

        const generatorToPurchase = availableGenerators.find(gen => gen.id === generatorId);

        if (!generatorToPurchase) {
            console.warn(`Generator with ID "${generatorId}" not found.`);
            return false;
        }

        // Check if player has enough resources
        let canAfford = true;
        for (const resourceType in generatorToPurchase.cost) {
            if (this.gameState.getResource(resourceType) < generatorToPurchase.cost[resourceType]) {
                canAfford = false;
                break;
            }
        }

        if (canAfford) {
            // Deduct cost
            for (const resourceType in generatorToPurchase.cost) {
                this.gameState.removeResource(resourceType, generatorToPurchase.cost[resourceType]);
            }

            // Add the generator
            this.addGenerator(generatorToPurchase);
            console.log(`Purchased generator: ${generatorToPurchase.name}`);
            return true;
        } else {
            console.log(`Cannot afford generator: ${generatorToPurchase.name}`);
            return false;
        }
    }
}