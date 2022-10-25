import { Attack, getAttackBounds } from "./level";
import type { Player } from "./player"
import { ROPE_THICKNESS, PLAYER_SIZE, STUMP_SIZE } from "./util";

export interface RenderArgs {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    player: Player,
    running: boolean,
    time: number,
    title: string,
    length: number,
    attacks: Attack[],
    playerPos: { x: number, y: number },
    center: number
}

let pumpkinSprite: HTMLImageElement;
let stumpSprite: HTMLImageElement;

const initRenderer = async () => {
    pumpkinSprite = new Image();
    pumpkinSprite.src = "./sprites/pumpkin.png";
    stumpSprite = new Image();
    stumpSprite.src = "./sprites/stump.png";

    await Promise.allSettled([
        new Promise<void>((resolve) => {
            pumpkinSprite.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
            stumpSprite.onload = () => resolve();
        })
    ]);
}

const clear = (args: RenderArgs): void => {
    args.ctx.fillStyle = "black";
    args.ctx.fillRect(0, 0, args.canvas.width, args.canvas.height);
}

const renderAttacks = (args: RenderArgs): void => {
    args.attacks.forEach((e: Attack) => {
        if (e.time <= args.time && e.time + e.duration >= args.time) { // attack happening

            args.ctx.fillStyle = "white";
            const bounds = getAttackBounds(e, args.canvas);
            args.ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

        } else if (e.time - 1 <= args.time && e.time >= args.time) { // attack after 1 second

            args.ctx.strokeStyle = "rgba(230, 230, 230, 0.7)";
            const bounds = getAttackBounds(e, args.canvas);
            args.ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

        }
    });
}

const renderProgressBar = (args: RenderArgs): void => {
    const x = args.canvas.width * 0.2,
            y = 10,
            w = args.canvas.width * 0.6,
            h = 10;
    
    args.ctx.strokeStyle = "white";
    args.ctx.fillStyle = "white";
    args.ctx.strokeRect(x, y, w, h);
    args.ctx.fillRect(x, y, w * args.time / args.length, h);
}

export const renderGame = (args: RenderArgs): void => {
    
    clear(args);

    const center = args.canvas.width / 2;

    // Render rope
    args.ctx.strokeStyle = "brown";
    args.ctx.lineWidth = ROPE_THICKNESS;
    args.ctx.beginPath();
    args.ctx.moveTo(center, center);
    args.ctx.lineTo(args.playerPos.x, args.playerPos.y);
    args.ctx.stroke();

    // Render stump
    const spos = center - STUMP_SIZE / 2;
    args.ctx.drawImage(stumpSprite, spos, spos, STUMP_SIZE, STUMP_SIZE);

    // Render player
    const px = args.playerPos.x - PLAYER_SIZE / 2,
            py = args.playerPos.y - PLAYER_SIZE / 2;
    args.ctx.drawImage(pumpkinSprite, px, py, PLAYER_SIZE, PLAYER_SIZE);


    renderProgressBar(args);
    if (args.running) {
        renderAttacks(args);
        return;
    }

    // Render pause message
    args.ctx.fillStyle = "white";
    args.ctx.strokeStyle = "white";
    args.ctx.font = "48px Arial";
    args.ctx.fillText("Press Enter to start/pause/resume", 100, center);

}

initRenderer();