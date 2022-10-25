<script lang="ts">

    export let backToMenu: () => void;

</script>

<main>

    <button class="menu-button" on:click={backToMenu}>Back To Menu</button>

    <div>
        <section>
            <h3>Description</h3>
            <p><b>Halo-wail</b> is a rhythm game by me, <b>Exedice</b>. You're playing as a pumpkin who is stuck to the stump in the middle of the gamefield with a rope.</p>
        </section>
        <section>
            <h3>Gameplay</h3>
            <p>
                You can only go around the stump to avoid the white beam attacks.
                Press <i>[Space]</i> or <i>[Right-Click]</i> to change the direction you're going in.
                Press <i>[Enter]</i> to start/pause/resume the game.
                Press <i>[Q]</i> to exit the level.
                Have fun!
            </p>
        </section>
        <section>
            <h3>Technical side</h3>
            <ul>
                <li>Made with Svelte and Typescript. Open <code>public/index.html</code> to play.</li>
            </ul>
        </section>
    </div>

</main>

<style>

    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div {
        width: 80%;
        height: 80%;
        border: 2px solid aliceblue;
        border-radius: 1em;
        padding: 1em;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    button {
        position: absolute;
        top: 10px;
        left: 50px;
        border-radius: 0.5em;
    }

</style>