export type AttackDirection = 'vertical' | 'horizontal';
export type Attack = { pos: number, direction: AttackDirection, thickness: number, time: number, duration: number };
export type Level = { attacks: Attack[], length: number, music: string, title: string };

export const getAttackBounds = (attack: Attack, canvas: HTMLCanvasElement): { x: number, y: number, w: number, h: number } => {
    if (attack.direction === 'horizontal') {
        return { x: 0, y: (attack.pos / 100) * canvas.height, w: canvas.width, h: attack.thickness };
    } else {
        return { x: (attack.pos / 100) * canvas.width, y: 0, w: attack.thickness, h: canvas.height };
    }
}