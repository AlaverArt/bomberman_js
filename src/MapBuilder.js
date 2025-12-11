import GameMap from './GameMap';
import Entity from './mapObj/Entity';
import MapObject from './mapObj/MapObject';
import Wall from './mapObj/Wall';
import PlayerManager from './PlayerManager';
import { loadSprites } from './resources/utils';

export default class MapBuilder {
    #sprites;

    constructor(sprites) {
        this.#sprites = sprites ?? null;
        //this.#init();
    }

    async init() {
        this.#sprites = await loadSprites();
    }

    build(lvlNum = 1) {
        if (lvlNum === 1) {
            const map = new GameMap();

            const wallSize = 60;
            for (let i = 1; i <= 4; i++) {
                for (let j = 1; j <= 4; j++) {
                    const wallMp = new MapObject((wallSize + wallSize) * i , (wallSize + wallSize) * j, wallSize, wallSize);
                    const wall = new Wall({
                        mapObject: wallMp,
                        animations: this.#sprites.lvl1.wall,
                    });
        
                    map.objects.push(wall);
                }
            }

            const player = new Entity({
                animations: this.#sprites.player,
                mapObject: new MapObject(0, 0, 60, 60),
                health: 10,
                isImmortal: false,
                speed: 200,
            });

            map.objects.push(player);

            const playerManager = new PlayerManager(player);

            // const player2 = new Entity({
            //     animations: this.sprites.player,
            //     mapObject: new MapObject(100, 100, 100, 100),
            //     health: 10,
            //     isImmortal: false,
            //     speed: 200,
            // });

            // map.objects.push(player2);

            // const playerManager2 = new PlayerManager(player2);

            console.log(map);
            return {
                map,
                key: (e) => {
                    playerManager.on('key', e);
                    //playerManager2.on('key', e);
                },
                keyup: (e) => {
                    playerManager.on('keyup', e);
                    //playerManager2.on('keyup', e);
                },
                tick: (time) => map.tick(time),
                get objectsToRender() {
                    return [...map.objectsToRender];
                },
            };
        }
    }
}
