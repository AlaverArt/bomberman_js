import MapBuilder from './MapBuilder';
import { loadSprites } from './resources/utils';

export default class LevelBuilder {
    #sprites;
    #mapBuilder;

    constructor(sprites) {
        this.#sprites = sprites ?? null;
        if (this.#sprites) this.#mapBuilder = new MapBuilder(this.#sprites);
    }

    async init() {
        this.#sprites = await loadSprites();
        this.#mapBuilder = new MapBuilder(this.#sprites);
    }

    build(lvlNum = 1) {
        const map = this.#mapBuilder.build(lvlNum);

        return {
            ...map
        };
    }
}
