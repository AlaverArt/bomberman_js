let keys = new Map();

export default class PlayerManager {
    /** @type {Entity} */
    player;

    constructor(player) {
        this.player = player;
        this.player.stay();
    }

    on(action, event) {
        if (action === 'key') {
            keys.set(event.code);
        }
        if (action === 'keyup') {
            keys.delete(event.code);
        }
        
        const lastMoveKey = [...keys.keys()].filter((x) => x === 'KeyW' || x === 'KeyA' || x === 'KeyS' || x === 'KeyD').pop() ?? null;
        switch (lastMoveKey) {
            case 'KeyW':
                this.player.walk(1);break;
            case 'KeyA':
                this.player.walk(4);break;
            case 'KeyS':
                this.player.walk(3);break;
            case 'KeyD':
                this.player.walk(2);break;
            case null:
                this.player.stay();
        }
        // console.log('key', event.code);
    }
}
