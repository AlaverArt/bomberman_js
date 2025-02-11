export default class AnimationFrame {
    #sprite;
    #sx;
    #sy;
    #sw;
    #sh;
    #drawData;

    constructor(sprite, sx, sy, sw, sh) {
        this.#sprite = sprite;
        this.#sx = sx;
        this.#sy = sy;
        this.#sw = sw;
        this.#sh = sh;
        this.#drawData = [this.#sprite, this.#sx, this.#sy, this.#sw, this.#sh];
    }

    get drawData() {
        return this.#drawData;
    }
}