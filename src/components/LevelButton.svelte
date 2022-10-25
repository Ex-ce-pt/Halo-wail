<script lang="ts">

    export let name: string;
    export let index: number;
    export let select: (i: number) => void;

</script>

<main>
    <button on:click={() => select(index)}>{name}</button>
</main>

<style>

    main {
        width: 100%;
        margin: 20px 0 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    button {
        font-size: 36px;
        font-family: 'Fuzzy Bubbles';
        color: black;
        background-color: azure;
        border: 2px solid black;
        border-radius: 1em;
        padding: 0.3em;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: aqua;
    }

</style>