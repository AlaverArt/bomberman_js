import GameMap from "./GameMap";
import GameMenu from "./GameMenu";
import MapBuilder from "./MapBuilder";
import MapObject from "./MapObject";

export default class GameState {
    map;
    /** @type {MapObject[]} */
    objects;
    currentView;
    players;
    menu;
    lvl;
    
    constructor() {
        this.map = new GameMap();
        this.objects = [];//new GameObjects();
        this.menu = new GameMenu();
        this.currentView = null;
        // this.menu.on('level', (event) => this.startLevel(event.num));
        this.startLevel(1);
    }

    addObject(obj) {
        this.objects.add(obj);
    }

    tick(time) {
        if (this.currentView)
            this.currentView.tick(time);
        // this.objects.tickEvery();
        // this.players.tick();
    }

    mainMenu() {
        this.currentView = this.menu;
    }

    #findObject(x, y) {
        [...this.currentView].find((/** @type {MapObject} */obj) => {
            const rect = obj.getRect();
            return rect.x <= x <= rect.x + rect.w && rect.y <= y <= rect.y + rect.h;
        });
    }

    action({
        type,
        event
    }) {
        if (type === 'click')
            this.currentView.click(this.#findObject({ x: event.x, y: event.y }));
        else if (type === 'key') {
            this.currentView.key({ code: event.code });
        } else if (type === 'keyup') {
            this.currentView.keyup(event);
        }
    }

    async startLevel(lvlNum) {
        const mb = new MapBuilder();
        await mb.init();
        this.lvl = mb.build(lvlNum ?? 1);
        this.map = this.lvl.map;
        this.currentView = this.lvl;
    }

    get objectsToRender() {
        const res = [];

        if (this.currentView)
            res.push(...this.currentView.objectsToRender);
        // res.push(...this.objects.objectsToRender);
        // res.push(...this.players.objectsToRender);

        return res;
    }
}