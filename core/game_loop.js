export class GameLoop {
    constructor(gameState) {
        this.gameState = gameState;
        this.isRunning = false;
        this.lastUpdateTime = performance.now();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    stop() {
        this.isRunning = false;
    }

    loop() {
        if (!this.isRunning) {
            return;
        }

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // delta time in seconds
        this.lastUpdateTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        // Update game state based on delta time
        this.gameState.update(deltaTime);

        // Update other game components
        if (this.gameState.character) {
            this.gameState.character.update(deltaTime);
        }
        if (this.gameState.resourceManager) {
            this.gameState.resourceManager.update(deltaTime);
        }

        // Add updates for other systems here
    }

    render() {
        // Render game state
        // This would typically involve updating the UI based on the game state
        // For now, we can just log some state for demonstration
        // console.log("Rendering game state:", this.gameState.resources);
    }
}