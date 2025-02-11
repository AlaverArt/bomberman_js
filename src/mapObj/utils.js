export function directionToDeltas(direction, speed = 1) {
    switch (direction) {
        case 1: return { dx: 0, dy: -1 * speed };
        case 2: return { dx: 1 * speed, dy: 0 };
        case 3: return { dx: 0, dy: 1 * speed };
        case 4: return { dx: -1 * speed, dy: 0 };
    }
}
