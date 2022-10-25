export type RotatingDirection = 'cw' | 'ccw';

export interface Player {
    radius: number,
    angle: number,
    direction: RotatingDirection
}

export const defaultPlayer = (): Player => {
    return {
        radius: 300,
        angle: 0,
        direction: 'ccw'
    };
}