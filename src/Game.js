import GameLoop from './GameLoop';
import GameState from './GameState';
import GameView from './GameView';

export default class Game {
    state;
    gameLoop;
    eventListeners;

    constructor() {
        this.state = new GameState();
        this.view = new GameView(document.querySelector('#view'));
        this.gameLoop = new GameLoop();
        this.#initEventListeners();
    }

    #initEventListeners() {
        document.addEventListener('click', (e) =>
            this.state.action({ type: 'click', event: e })
        );
        document.addEventListener('keydown', (e) =>
            this.state.action({ type: 'key', event: e })
        );
        document.addEventListener('keyup', (e) =>
            this.state.action({ type: 'keyup', event: e })
        );
        window.addEventListener('resize', () => this.view.resize.call(this.view));
    }

    start() {
        this.gameLoop.start(this.state, this.view);
    }
}
