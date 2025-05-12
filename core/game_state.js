export class GameState {
    constructor() {
        // Initialize game state variables
        this.resources = { gold: 0 }; // Example: { gold: 0, wood: 0 }
        this.character = null; // Will be set after character is initialized
        this.resourceManager = null; // Will be set after resource manager is initialized
        this.lastOfflineTime = Date.now(); // For offline earnings
        this.lastDailyRewardTime = 0; // Timestamp of the last claimed daily reward
        this.upgrades = []; // Array to hold purchased upgrades
        this.availableUpgrades = [
            // Define a simple upgrade structure directly here for now
            {
                id: 'gold_multiplier_1',
                name: 'Gold Multiplier I',
                description: 'Doubles gold generation rate.',
                cost: { gold: 50 },
                effects: { resourceType: 'gold', multiplier: 2 },
                isApplied: false,
                apply: function(gameState) {
                    if (!this.isApplied) {
                        console.log(`Applying upgrade: ${this.name}`);
                        // This would require accessing and modifying generator rates,
                        // which might be better handled by the ResourceManager or a dedicated UpgradeManager.
                        console.log(`Effect: Multiply ${this.effects.resourceType} generation by ${this.effects.multiplier}`);
                        // A real implementation would modify the relevant generator/resource manager properties
                        this.isApplied = true;
                    }
                }
            },
            // Add more upgrade types here
        ];
        this.milestones = [
            {
                id: 'first_gold_milestone',
                name: 'First Gold',
                description: 'Reach 100 gold.',
                condition: (gameState) => gameState.getResource('gold') >= 100,
                reward: { resourceType: 'gold', amount: 50 },
                isClaimed: false,
            },
            // Add more milestones here
        ];
        this.achievements = [
            {
                id: 'first_click_achievement',
                name: 'First Click',
                description: 'Perform your first click.',
                condition: (gameState) => gameState.getResource('gold') > 0, // Simple condition based on gold from clicking
                isUnlocked: false,
            },
            // Add more achievements here
        ];
    }

    update(deltaTime) {
        // Update game state based on delta time
        // This method can be used for logic that affects the overall state
        this.checkMilestones(); // Check for completed milestones during updates
        this.checkAchievements(); // Check for completed achievements during updates
    }

    addResource(resourceType, amount) {
        if (this.resources[resourceType] === undefined) {
            this.resources[resourceType] = 0;
        }
        this.resources[resourceType] += amount;
    }

    removeResource(resourceType, amount) {
        if (this.resources[resourceType] === undefined) {
            this.resources[resourceType] = 0;
        }
        this.resources[resourceType] -= amount;
        if (this.resources[resourceType] < 0) {
            this.resources[resourceType] = 0; // Prevent negative resources
        }
    }

    getResource(resourceType) {
        return this.resources[resourceType] || 0;
    }

    purchaseUpgrade(upgradeId) {
        const upgradeToPurchase = this.availableUpgrades.find(upgrade => upgrade.id === upgradeId);

        if (!upgradeToPurchase) {
            console.warn(`Upgrade with ID "${upgradeId}" not found.`);
            return false;
        }

        if (upgradeToPurchase.isApplied) {
            console.log(`Upgrade "${upgradeToPurchase.name}" already applied.`);
            return false;
        }

        // Check if player has enough resources
        let canAfford = true;
        for (const resourceType in upgradeToPurchase.cost) {
            if (this.getResource(resourceType) < upgradeToPurchase.cost[resourceType]) {
                canAfford = false;
                break;
            }
        }

        if (canAfford) {
            // Deduct cost
            for (const resourceType in upgradeToPurchase.cost) {
                this.removeResource(resourceType, upgradeToPurchase.cost[resourceType]);
            }

            // Apply the upgrade effect
            upgradeToPurchase.apply(this); // Pass gameState to the apply method

            // Move the purchased upgrade to the list of applied upgrades
            this.upgrades.push(upgradeToPurchase);
            this.availableUpgrades = this.availableUpgrades.filter(upgrade => upgrade.id !== upgradeId);

            console.log(`Purchased and applied upgrade: ${upgradeToPurchase.name}`);
            return true;
        } else {
            console.log(`Cannot afford upgrade: ${upgradeToPurchase.name}`);
            return false;
        }
    }

    checkMilestones() {
        this.milestones.forEach(milestone => {
            if (!milestone.isClaimed && milestone.condition(this)) {
                console.log(`Milestone reached: ${milestone.name}`);
                // Award reward
                this.addResource(milestone.reward.resourceType, milestone.reward.amount);
                milestone.isClaimed = true; // Mark as claimed
                console.log(`Claimed reward: ${milestone.reward.amount} ${milestone.reward.resourceType}`);
            }
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.isUnlocked && achievement.condition(this)) {
                console.log(`Achievement unlocked: ${achievement.name}`);
                // Potentially award rewards for achievements here
                // For now, just mark as unlocked
                achievement.isUnlocked = true;
            }
        });
    }

    claimDailyReward() {
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (now - this.lastDailyRewardTime >= twentyFourHours) {
            // Award daily reward (example: 100 gold)
            const rewardAmount = 100;
            this.addResource('gold', rewardAmount);
            this.lastDailyRewardTime = now;
            console.log(`Claimed daily reward: ${rewardAmount} gold.`);
            return true;
        } else {
            const remainingTime = twentyFourHours - (now - this.lastDailyRewardTime);
            const remainingHours = Math.ceil(remainingTime / (60 * 60 * 1000));
            console.log(`Daily reward not yet available. Try again in approximately ${remainingHours} hours.`);
            return false;
        }
    }
}