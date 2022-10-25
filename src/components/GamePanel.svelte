<script lang="ts">
    
    import { onMount } from "svelte";
    import { defaultPlayer, Player } from "../scripts/player";
    import { RenderArgs, renderGame } from "../scripts/renderer";
    import { getAttackBounds, Level } from "../scripts/level"
    import { PLAYER_SIZE, DEG_TO_RAD } from "../scripts/util";


    export let exitToMenu: () => void;
    export let canvasWidth: number;
    export let canvasHeight: number;
    export let game;
    export let levels: Level[];

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let player: Player = defaultPlayer();
    let prevTime: number;
    let exitting = false;
    let audio: HTMLAudioElement;

    const CHANGE_KEY = "Space";
    const PAUSE_KEY = "Enter";
    const EXIT_KEY = "KeyQ";
    const FAIRNESS_LEVEL = 20;

    const addListeners = (): void => {
        document.addEventListener("keypress", handleKey);
        document.addEventListener("click", changeDirection);
    }

    const removeListeners = (): void => {
        document.removeEventListener("keypress", handleKey);
        document.removeEventListener("click", changeDirection);
    }

    const exit = (): void => {
        exitting = true;
        audio.pause();
        removeListeners();
        exitToMenu();
    }

    const initLevel = (): void => {
        game.time = 0;
        game.running = false;
        audio = new Audio(`./muz/${levels[game.currentLevelIndex].music}`);
    }

    const update = (): void => {
        if (exitting) return;
        requestAnimationFrame(update);
        
        if (game.running) {

            let speed = 100; // TODO: move into Player?

            // Progress time
            const newTime = new Date().getTime();
            const deltaTime = (newTime - prevTime) / 1000;
            game.time += deltaTime;
            prevTime = newTime;

            // Move the player
            const dir = (player.direction === 'ccw') ? 1 : -1;
            player.angle += dir * speed * deltaTime;

            // Check collision
            const { playerPos } = assembleRenderArgs();
            levels[game.currentLevelIndex].attacks.forEach((attack) => {
                if (game.time >= attack.time && game.time <= attack.time + attack.duration) {
                    const bounds = getAttackBounds(attack, canvas);
                    if (bounds.x + FAIRNESS_LEVEL <= playerPos.x + PLAYER_SIZE &&
                        bounds.x + bounds.w - FAIRNESS_LEVEL >= playerPos.x &&
                        bounds.y + FAIRNESS_LEVEL <= playerPos.y + PLAYER_SIZE &&
                        bounds.y + bounds.h - FAIRNESS_LEVEL >= playerPos.y) {

                        // lost
                        exit();
                    }
                }
            });

            // Check the time
            if (game.time >= levels[game.currentLevelIndex].length) {
                exit();
            }

        }
        

        render();
    }

    const handleKey = (e: KeyboardEvent): void => {
        if (e.code === CHANGE_KEY && game.running) {
            changeDirection();
        } else if (e.code === PAUSE_KEY) {
            if (game.running) audio.pause(); else audio.play();
            game.running = !game.running;
            prevTime = new Date().getTime();
        } else if (e.code === EXIT_KEY) {
            exit();
        }
    }

    const changeDirection = (): void => {
        player.direction = (player.direction === 'cw') ? 'ccw' : 'cw';
    }

    const assembleRenderArgs = (): RenderArgs => {
        const center = canvas.width / 2;
        const playerAngleRad = player.angle * DEG_TO_RAD;
        return {
            canvas,
            ctx,
            player,
            running: game.running,
            time: game.time,
            title: levels[game.currentLevelIndex].title,
            length: levels[game.currentLevelIndex].length,
            attacks: (levels != null) ? levels[game.currentLevelIndex].attacks : null,
            playerPos: {
                x: center + player.radius * Math.cos(playerAngleRad),
                y: center + player.radius * Math.sin(playerAngleRad)
            },
            center
        };
    };

    const render = (): void => renderGame(assembleRenderArgs());

    onMount(async () => {
        ctx = canvas.getContext('2d');

        initLevel();

        ctx.imageSmoothingEnabled = false;
        addListeners();
        requestAnimationFrame(update);
    });

</script>

<main>
    
    <canvas
        width={canvasWidth}
        height={canvasHeight}
        bind:this={canvas}
        >Your browser does not support canvas!</canvas>

</main>

<style>

</style>