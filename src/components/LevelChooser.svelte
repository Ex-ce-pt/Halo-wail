<script lang="ts">

    import type { Level } from "../scripts/level"
    import LevelButton from "./LevelButton.svelte";

    export let backToMenu: () => void;
    export let chooseLevel: (i: number) => void;
    export let levels: Level[];

</script>

<main>
    
    <button class="menu-button" on:click={backToMenu}>Back To Menu</button>

    <div>

        {#each levels as level, index}

        <LevelButton name={level.title} index={index} select={chooseLevel} />

        {/each}

    </div>

</main>

<style>

    main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    div {
        width: inherit;
        margin: 10% 20% 10% 20%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    button {
        position: absolute;
        top: 10px;
        left: 40%;
    }

</style>