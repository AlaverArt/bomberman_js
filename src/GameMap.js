export default class GameMap {
    objects;

    constructor() {
        this.objects = [];//new MapObjectsList();
    }

    tick(time) {
        for (const obj of this.objects) {
            obj.tick(time);
        }
    }

    get objectsToRender() {
        const res = [];

        res.push(...this.objects);

        return res;
    }
}