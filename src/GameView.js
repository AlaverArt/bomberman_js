export default class GameView {
    /** @type {HTMLCanvasElement} */
    #canvasEl;
    /** @type {CanvasRenderingContext2D} */
    #canvas;

    /** @param {HTMLCanvasElement} canvasEl */
    constructor(canvasEl) {
        this.#canvasEl = canvasEl;
        this.#canvas = canvasEl.getContext('2d');
        this.resize();
    }

    /** @param {GameState} state */
    render(state) {
        this.clearView();
        for (const item of state.objectsToRender) {
            this.#canvas.drawImage(...item.getDrawData());
        }
    }

    resize() {
        this.#canvasEl.width = window.innerWidth * window.devicePixelRatio;
        this.#canvasEl.height = window.innerHeight * window.devicePixelRatio;
    }

    clearView() {
        this.#canvas.imageSmoothingEnabled = false;
        this.#canvas.clearRect(0, 0, this.#canvasEl.width, this.#canvasEl.height);
    }
}