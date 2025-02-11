export default class GameLoop {
    state;
    view;
    lastTime;

    #loop() {
        const now = performance.now();
        this.state.tick(now - this.lastTime);
        this.lastTime = now;

        this.view.render(this.state);
        requestAnimationFrame((e) => this.#loop(e));
    }
    
    /** @type {GameState} */
    start(gameState, gameView) {
        this.state = gameState;
        this.view = gameView;
        this.lastTime = performance.now();
        this.#loop();
    }
}