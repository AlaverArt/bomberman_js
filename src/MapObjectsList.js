export default class MapObjectsList {
    list;

    constructor() {
        this.list = [];
    }

    /** @type {MapObject} */
    add(obj) {
        this.list.push(obj);
    }

    tickEvery() {
        this.list.forEach((obj) => obj.tick());
    }

    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }
}