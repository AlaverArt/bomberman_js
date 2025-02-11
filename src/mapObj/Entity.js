import MapObject from './MapObject';
import { directionToDeltas } from './utils';

export default class Entity {
    /** @type {MapObject} */
    #mapObject;
    #animations;
    #health;
    #speed;
    #isImmortal;
    direction;

    constructor({ mapObject, health, speed, isImmortal, animations }) {
        this.#animations = animations;
        this.#mapObject = mapObject ?? new MapObject(0, 0, 0, 0);
        this.#health = health ?? 0;
        this.#speed = speed ?? 0;
        this.#isImmortal = isImmortal ?? false;
        this.#mapObject.setAnimation(animations.stay);
    }

    get mapObject() {
        return this.#mapObject;
    }

    walk(direction) {
        console.log('dd', direction);
        if (this.direction === direction) return;
        console.log('walk', direction);
        this.direction = direction;
        this.#mapObject.setMove(directionToDeltas(direction, this.#speed));
        this.#mapObject.setAnimation(this.#animations.walk[direction].clone());
        this.#mapObject.animation.start();
    }

    stay() {
        this.direction = null;
        this.mapObject.setMove({ dx: 0, dy: 0 });
        this.#mapObject.setAnimation(this.#animations.stay.clone());
        // this.#mapObject.animation.start();
        this.#mapObject.animation.setFrameIndex(1);
        this.#mapObject.animation.pause();
    }

    tick(time) {
        this.#mapObject.tick(time);
    }

    getDrawData() {
        return this.#mapObject.getDrawData();
    }
}
