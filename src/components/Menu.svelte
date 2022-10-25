<script lang="ts">
	
    export let chooseLevel: () => void;
    export let description: () => void;

</script>

<main>

    <div class="content">

        <h1>Halo-wail</h1>
        <button class="menu-button play-button" on:click={chooseLevel}>Play</button>
        <button class="menu-button desc-button" on:click={description}>Description</button>
        
    </div>

</main>

<style>

    main {
        width: 100%;
        height: 100%;
    }

    .content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 3fr [title-start] 2fr [title-end] 2fr [play-start] 1fr [play-end] 0.5fr [desc-start] 1fr [desc-end] 1.5fr;
        grid-template-columns: 1fr [content-start] max-content [content-end] 1fr;
    }

    h1 {
        font-family: 'Fuzzy Bubbles';
        font-size: 56px;
        margin: 0;
        user-select: none;
        -webkit-user-select: none;
        grid-column-start: content-start;
        grid-column-end: content-end;
        grid-row-start: title-start;
        grid-row-end: title-end;
    }

    .play-button {
        grid-column-start: content-start;
        grid-column-end: content-end;
        grid-row-start: play-start;
        grid-row-end: play-end;
    }
    
    .desc-button {
        grid-column-start: content-start;
        grid-column-end: content-end;
        grid-row-start: desc-start;
        grid-row-end: desc-end;
    }

</style>