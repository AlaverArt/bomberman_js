import GameMenu from './GameMenu';
import LevelBuilder from './LevelBuilder';

export default class GameState {
    /** @type {MapObject[]} */
    objects;
    currentView;
    players;
    menu;
    lvl;

    constructor() {
        this.objects = []; //new GameObjects();
        this.menu = new GameMenu();
        this.currentView = null;
        // this.menu.on('level', (event) => this.startLevel(event.num));
        this.startLevel(1);
    }

    addObject(obj) {
        this.objects.add(obj);
    }

    tick(time) {
        if (this.currentView) this.currentView.tick(time);
        // this.objects.tickEvery();
        // this.players.tick();
    }

    mainMenu() {
        this.currentView = this.menu;
    }

    #findObject(x, y) {
        [...this.currentView].find((/** @type {MapObject} */ obj) => {
            const rect = obj.getRect();
            return (
                rect.x <= x <= rect.x + rect.w && rect.y <= y <= rect.y + rect.h
            );
        });
    }

    action({ type, event }) {
        if (type === 'click')
            this.currentView.click(
                this.#findObject({ x: event.x, y: event.y })
            );
        else if (type === 'key') {
            this.currentView.key({ code: event.code });
        } else if (type === 'keyup') {
            this.currentView.keyup({ code: event.code });
        }
    }

    async startLevel(lvlNum) {
        const lb = new LevelBuilder();
        await lb.init();
        this.lvl = lb.build(lvlNum ?? 1);
        this.currentView = this.lvl;
    }

    get objectsToRender() {
        const res = [];

        if (this.currentView) res.push(...this.currentView.objectsToRender);
        // res.push(...this.objects.objectsToRender);
        // res.push(...this.players.objectsToRender);

        return res;
    }
}
