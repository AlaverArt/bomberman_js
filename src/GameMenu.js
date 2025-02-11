export default class GameMenu {
    list;
    subs;

    constructor() {
        this.list = [
            {
                title: 'Старт',
                click: () => this.#emit({ action: 'level', event: { num: 1 } }),
            }
        ];
        this.subs = {};
    }

    click(item) {
        item.click();
    }

    #emit({ action, event }) {
        for (const cb of this.subs[action]) {
            cb({ event });
        }
    }

    on(action, cb) {
        if (!this.subs[action]) this.subs[action] = [];
        this.subs[action].push(cb);
    }

    get objectsToRender() {
        return this.list;
    }
}