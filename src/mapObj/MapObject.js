/** @typedef {import('@/animation/Animation').default} Animation */

export default class MapObject {
    #x;
    #y;
    #w;
    #h;
    #dx;
    #dy;
    /** @type {Animation} */
    #animation;
    type;

    constructor(x, y, w, h) {
        this.#x = x ?? 0;
        this.#y = y ?? 0;
        this.#w = w ?? 0;
        this.#h = h ?? 0;
        this.type = 'obj';
    }

    setAnimation(animation) {
        this.#animation = animation;
    }

    get animation() {
        return this.#animation;
    }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }

    setSize(w, h) {
        this.#w = w;
        this.#h = h;
    }

    getRect() {
        return { x: this.#x, y: this.#y, w: this.#w, h: this.#h };
    }

    setMove({ dx, dy }) {
        this.#dx = dx ?? 0;
        this.#dy = dy ?? 0;
    }

    get dx() {
        return this.#dx;
    }
    get dy() {
        return this.#dy;
    }

    tick(time) {
        this.#x += (this.#dx * time) / 1000;
        this.#y += (this.#dy * time) / 1000;
        this.#animation.tick(time);
    }

    getDrawData() {
        return [
            ...this.#animation.currentFrameToDrawData,
            this.#x,
            this.#y,
            this.#w,
            this.#h,
        ];
    }
}
