/** @typedef {import('./AnimationFrame').default} AnimationFrame */

export default class Animation {
    /** @type {AnimationFrame[]} Массив, содержащий кадры */
    #frames;
    /** @type {Number} Длительность в ms */
    #duration;
    /** @type {Boolean} Находится ли анимация на паузе */
    #isPause;
    /** @type {Number} Текущий прогресс анимации от 0 до 1 */
    #progress;
    isRepeat;

    constructor(frames, duration) {
        this.#frames = frames ?? [];
        this.#duration = duration || 1;
        this.#progress = 0;
        this.#isPause = true;
        this.isRepeat = true;
    }

    /**
     * @param {AnimationFrame} frame
     */
    addFrame(frame) {
        this.#frames.push(frame);
    }

    get #currentFrame() {
        return this.#frames[
            Math.trunc(this.#frames.length * this.#progress) %
                this.#frames.length
        ];
    }

    get currentFrameToDrawData() {
        return this.#currentFrame.drawData;
    }

    reset() {
        this.#progress = 0;
    }

    start() {
        this.#progress = 0;
        this.#isPause = false;
    }

    setFrameIndex(i) {
        this.#progress = i / this.#frames.length;
    }

    tick(time) {
        if (this.#isPause) return;
        this.#progress += time / this.#duration;
        if (this.#progress > 1) {
            if (this.isRepeat)
                this.#progress = this.#progress - 1;
            else {
                this.#progress = 1;
            }
        }
    }

    play() {
        this.#isPause = false;
    }

    pause() {
        this.#isPause = true;
    }

    clone() {
        return new Animation(this.#frames, this.#duration);
    }
}
