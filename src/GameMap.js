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
            if (obj.type === 'entity') this.#removeCollisions(obj, time);
        }
    }

    get objectsToRender() {
        const res = [];

        res.push(...this.objects);

        return res;
    }

    /**
     * @param {import('./mapObj/Entity').default} target - целевой объект, которому хотим не дать наложиться на окружение
     * @param {number} time - дельта времени игрового цикла
     */
    #removeCollisions(target, time) {
        for (const obj of this.objects) {
            if (obj.type !== 'wall') continue;

            let targetRect = target.mapObject.getRect();
            let rect = {
                x1l: targetRect.x,
                y1u: targetRect.y,
                x1r: targetRect.x + targetRect.w,
                y1b: targetRect.y + targetRect.h,
            };

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
                // console.log(target.mapObject.dx, target.mapObject.dy);

                /** Блокируем перемещение в стену */
                target.mapObject.setPosition(
                    target.mapObject.dx
                        ? target.mapObject.dx > 0
                            ? objR.x - targetRect.w
                            : objR.x + objR.w
                        : rect.x1l,
                    target.mapObject.dy
                        ? target.mapObject.dy > 0
                            ? objR.y - targetRect.h
                            : objR.y + objR.h
                        : rect.y1u
                );

                // Обновляем координаты целевого объекта
                targetRect = target.mapObject.getRect();

                /** Дрейф к углу */
                const W = 0.33; // 30%
                const speed = target.speed;
                const targetMiddle = {
                    x: targetRect.x + targetRect.w / 2,
                    y: targetRect.y + targetRect.h / 2,
                };

                const dist = (speed * time) / 1000;

                /** Дрейф по X */
                let pushX = 0;
                if (
                    (target.mapObject.dy > 0 && targetRect.y <= objR.y) ||
                    (target.mapObject.dy < 0 && targetRect.y >= objR.y)
                ) {
                    if (
                        objR.x - targetRect.w / 2 <= targetMiddle.x &&
                        targetMiddle.x <= objR.x + objR.w * W
                    )
                        // 1/3
                        pushX = -dist;
                    else if (
                        objR.x + objR.w * (1 - W) <= targetMiddle.x &&
                        targetMiddle.x <= objR.x + objR.w + targetRect.w / 2
                    ) {
                        pushX = dist;
                    }
                }

                /** Дрейф по Y */
                let pushY = 0;

                if (
                    (target.mapObject.dx > 0 && targetRect.x <= objR.x) ||
                    (target.mapObject.dx < 0 && targetRect.x >= objR.x)
                ) {
                    if (
                        objR.y - targetRect.y / 2 <= targetMiddle.y &&
                        targetMiddle.y <= objR.y + objR.h * W
                    )
                        // 1/3
                        pushY = -dist;
                    else if (
                        objR.y + objR.h * (1 - W) <= targetMiddle.y &&
                        targetMiddle.y <= objR.y + objR.h + targetRect.h / 2
                    ) {
                        pushY = dist;
                    }
                }

                if (pushX || pushY) {
                    target.mapObject.setPosition(
                        targetRect.x + pushX,
                        targetRect.y + pushY
                    );
                }

                console.log(pushX, pushY);

                // if (pushX || pushY) return;
            }
        }
    }
}
