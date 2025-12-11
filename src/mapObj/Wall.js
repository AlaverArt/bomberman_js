import MapObject from './MapObject';

export default class Wall {
    /** @type {MapObject} */
    #mapObject;
    #animations;
    #health;
    #speed;
    #isImmortal;
    direction;
    type;

    constructor({ mapObject, health, speed, isImmortal, animations }) {
        this.#animations = animations;
        this.#mapObject = mapObject ?? new MapObject(0, 0, 0, 0);
        this.#health = health ?? 1;
        this.#speed = speed ?? 0;
        this.#isImmortal = isImmortal ?? true;
        this.type = 'wall';
        this.stay();
    }

    /** @returns {MapObject} */
    get mapObject() {
        return this.#mapObject;
    }

    get speed() {
        return this.#speed;
    }

    stay() {
        this.mapObject.setMove({ dx: 0, dy: 0 });
        this.#mapObject.setAnimation(this.#animations.stay);
        this.#mapObject.animation.play();
        //this.#mapObject.setAnimation(this.#animations.stay.clone());
        // this.#mapObject.animation.start();
        //this.#mapObject.animation.setFrameIndex(1);
        // this.#mapObject.animation.pause();
    }

    tick(time) {
        this.#mapObject.tick(time);
    }

    getDrawData() {
        return this.#mapObject.getDrawData();
    }
}
