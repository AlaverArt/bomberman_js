import Entity from './mapObj/Entity';

export default class PlayerManager {
    /** @type {Entity} */
    player;

    constructor(player) {
        this.player = player;
        this.player.stay();
    }

    on(action, event) {
        if (action === 'key') {
            if (event.code === 'KeyW') {
                this.player.walk(1);
            } else if (event.code === 'KeyA') {
                this.player.walk(4);
            } else if (event.code === 'KeyS') {
                this.player.walk(3);
            } else if (event.code === 'KeyD') {
                this.player.walk(2);
            }
            console.log('key', event.code);
        } else if (action === 'keyup') {
            this.player.stay();
        }
    }
}
