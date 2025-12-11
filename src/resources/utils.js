import Animation from '@/animation/Animation';
import AnimationFrame from '@/animation/AnimationFrame';

export async function loadSprites() {
    const res = {};
    res.player = await loadPlayer();
    res.lvl1 = await loadLevel1();
    return res;
}

async function loadPlayer() {
    const img = await import('@/assets/resources/img/player.png');
    const playerSprites = new Image();
    playerSprites.src = img.default;

    const walkDuration = 400;
    return {
        stay: new Animation(
            [new AnimationFrame(playerSprites, 30, 0, 25, 25)],
            walkDuration
        ),
        walk: {
            1: new Animation(
                [
                    new AnimationFrame(playerSprites, 90, 0, 25, 25),
                    new AnimationFrame(playerSprites, 120, 0, 25, 25),
                    new AnimationFrame(playerSprites, 150, 0, 25, 25),
                    new AnimationFrame(playerSprites, 120, 0, 25, 25),
                ],
                walkDuration
            ),
            2: new Animation(
                [
                    new AnimationFrame(playerSprites, 90, 30, 25, 25),
                    new AnimationFrame(playerSprites, 120, 30, 25, 25),
                    new AnimationFrame(playerSprites, 150, 30, 25, 25),
                    new AnimationFrame(playerSprites, 120, 30, 25, 25),
                ],
                walkDuration
            ),
            3: new Animation(
                [
                    new AnimationFrame(playerSprites, 0, 0, 25, 25),
                    new AnimationFrame(playerSprites, 30, 0, 25, 25),
                    new AnimationFrame(playerSprites, 60, 0, 25, 25),
                    new AnimationFrame(playerSprites, 30, 0, 25, 25),
                ],
                walkDuration
            ),
            4: new Animation(
                [
                    new AnimationFrame(playerSprites, 0, 30, 25, 25),
                    new AnimationFrame(playerSprites, 30, 30, 25, 25),
                    new AnimationFrame(playerSprites, 60, 30, 25, 25),
                    new AnimationFrame(playerSprites, 30, 30, 25, 25),
                ],
                walkDuration
            ),
        },
    };
}

async function loadLevel1() {
    const img = await import(
        '@/assets/resources/img/bomber_stage_snow_wall.png'
    );
    const wallSprite = new Image();
    wallSprite.src = img.default;
    return {
        wall: {
            stay: new Animation(
                [new AnimationFrame(wallSprite, 0, 0, 16, 16)],
                1000
            ),
        },
    };
}
