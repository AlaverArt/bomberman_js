import GameMap from './GameMap';
import Entity from './mapObj/Entity';
import MapObject from './MapObject';
import PlayerManager from './PlayerManager';
import { loadSprites } from './resources/utils';

export default class MapBuilder {
    sprites;

    constructor() {
        this.sprites = null;
        //this.#init();
    }

    async init() {
        this.sprites = await loadSprites();
    }

    build(lvlNum = 1) {
        if (lvlNum === 1) {
            const map = new GameMap();

            const player = new Entity({
                animations: this.sprites.player,
                mapObject: new MapObject(0, 0, 100, 100),
                health: 10,
                isImmortal: false,
                speed: 50,
            });

            map.objects.push(player);

            const playerManager = new PlayerManager(player);

            const player2 = new Entity({
                animations: this.sprites.player,
                mapObject: new MapObject(100, 100, 100, 100),
                health: 10,
                isImmortal: false,
                speed: 50,
            });

            map.objects.push(player2);

            const playerManager2 = new PlayerManager(player2);

            return {
                map,
                key: (e) => {
                    playerManager.on('key', e);
                    playerManager2.on('key', e);
                },
                keyup: () => {
                    playerManager.on('keyup');
                    playerManager2.on('keyup');
                },
                tick: (time) => map.tick(time),
                get objectsToRender() {
                    return [...map.objectsToRender];
                },
            };
        }
    }
}
