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

        const onlyMoveKeys = [...keys.keys()].filter((x) => x === 'KeyW' || x === 'KeyA' || x === 'KeyS' || x === 'KeyD');
        
        const lastMoveKey = onlyMoveKeys.pop() ?? null;

        /** Вариант с движениями в 4 направлениях */
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

        /** Вариант с движениями в 8 направлениях */
        // const prevLastMoveKey = onlyMoveKeys.pop() ?? null;
        // switch (lastMoveKey) {
        //     case 'KeyW':
        //         if (prevLastMoveKey === 'KeyA')
        //             this.player.walk(8);
        //         else if (prevLastMoveKey === 'KeyD')
        //             this.player.walk(2);
        //         else
        //             this.player.walk(1);
        //         break;
        //     case 'KeyA':
        //         if (prevLastMoveKey === 'KeyW')
        //             this.player.walk(8);
        //         else if (prevLastMoveKey === 'KeyS')
        //             this.player.walk(6);
        //         else
        //             this.player.walk(7);
        //         break;
        //     case 'KeyS':
        //         if (prevLastMoveKey === 'KeyA')
        //             this.player.walk(6);
        //         else if (prevLastMoveKey === 'KeyD')
        //             this.player.walk(4);
        //         else
        //             this.player.walk(5);
        //         break;
        //     case 'KeyD':
        //         if (prevLastMoveKey === 'KeyW')
        //             this.player.walk(2);
        //         else if (prevLastMoveKey === 'KeyS')
        //             this.player.walk(4);
        //         else
        //             this.player.walk(3);
        //         break;
        //     case null:
        //         this.player.stay();
        // }
    }
}
