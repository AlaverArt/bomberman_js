/** @typedef {import('./mapObj/Entity').default | import('./mapObj/Wall').default} MapObj */

function isIntersects(x1l, y1u, x1r, y1b, x2l, y2u, x2r, y2b) {
    return !(x2l >= x1r || x2r <= x1l || y2u >= y1b || y2b <= y1u);
}

export default class GameMap {
    /** @type {MapObj[]} */
    objects;

    constructor() {
        this.objects = []; //new MapObjectsList();
    }

    tick(time) {
        for (const obj of this.objects) {
            obj.tick(time);
        }

        // check wall collisions
        for (const obj of this.objects) {
            if (obj.type === 'entity') this.#removeCollisions(obj);
        }
    }

    get objectsToRender() {
        const res = [];

        res.push(...this.objects);

        return res;
    }

    /**
     * @param {MapObj} t
     */
    #removeCollisions(t) {
        const rectObj = t.mapObject.getRect();
        const rect = {
            x1l: rectObj.x,
            y1u: rectObj.y,
            x1r: rectObj.x + rectObj.w,
            y1b: rectObj.y + rectObj.h,
        };
        for (const obj of this.objects) {
            if (obj.type !== 'wall') continue;

            const objR = obj.mapObject.getRect();
            // console.log(obj, isIntersects(
            //     rect.x1l,
            //     rect.y1u,
            //     rect.x1r,
            //     rect.y1b,
            //     objR.x,
            //     objR.y,
            //     objR.x + objR.w,
            //     objR.y + objR.h
            // ));
            if (
                isIntersects(
                    rect.x1l,
                    rect.y1u,
                    rect.x1r,
                    rect.y1b,
                    objR.x,
                    objR.y,
                    objR.x + objR.w,
                    objR.y + objR.h
                )
            ) {
                console.log(t.mapObject.dx, t.mapObject.dy);
                t.mapObject.setPosition(
                    t.mapObject.dx ? (t.mapObject.dx > 0 ? objR.x - rectObj.w - 1 : objR.x + objR.w + 1) : rect.x1l,
                    t.mapObject.dy ? (t.mapObject.dy > 0 ? objR.y - rectObj.h - 1 : objR.y + objR.h + 1) : rect.y1u
                );
            }
        }
    }
}
