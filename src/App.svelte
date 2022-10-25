<script lang="ts">

    import { onMount } from "svelte";
	import { GameState } from "./scripts/gameState";
    import Menu from "./components/Menu.svelte";
    import GamePanel from "./components/GamePanel.svelte";
	import type { Level } from "./scripts/level"
    import Description from "./components/Description.svelte";
    import LevelChooser from "./components/LevelChooser.svelte";

	let loadingLevels = false;
	let levels: Level[];
	let game: any = {
		gameState: GameState.MENU
	};

	const loadLevels = async () => {
		loadingLevels = true;

		const levelList = await fetch("./levels/levelList.json").then(resp => resp.json());
		let levelPromises = [];
		levels = [];
		levelList.forEach(e => {
			levelPromises.push(
				fetch(`./levels/${e}`)
					.then(resp => resp.json())
					.then(r => levels.push(r))
			);
		});
		await Promise.allSettled(levelPromises);

		loadingLevels = false;
	}

	onMount(() => {
		loadLevels();
	});

</script>

<main>

	{#if loadingLevels}

	<div class="loading-message"><b>Loading levels...</b></div>

	{/if}

	{#if game.gameState === GameState.MENU}

	<Menu
		chooseLevel={() => { if (!loadingLevels) game = { gameState: GameState.LEVEL_CHOOSER }; }}
		description={() => game = { gameState: GameState.DESCRIPTION }}
		/>

	{:else if game.gameState === GameState.PLAYING}

	<GamePanel
		canvasWidth={window.innerHeight}
		canvasHeight={window.innerHeight}
		exitToMenu={() => game = { gameState: GameState.MENU }}
		bind:game={game}
		bind:levels={levels}
		/>

	{:else if game.gameState === GameState.DESCRIPTION}

	<Description backToMenu={() => game = { gameState: GameState.MENU }} />

	{:else if game.gameState === GameState.LEVEL_CHOOSER}

	<LevelChooser
		bind:levels={levels}
		backToMenu={() => game = { gameState: GameState.MENU }}
		chooseLevel={(i) => game = { gameState: GameState.PLAYING, currentLevelIndex: i }}
		/>

	{/if}

</main>

<style>
	
	main {
		position: relative;
		width: 100vh;
		height: 100vh;
		margin: auto;
		/* background-color: gray; */
		background-image: url('https://i.pinimg.com/originals/72/5a/29/725a298014f3c303f0cb16f1337a2ffd.jpg');
		background-repeat: no-repeat;
		background-position: center;
	}

	.loading-message {
		position: absolute;
		top: 3px;
		left: 3px;
		padding: 5px;
		border: 3px solid black;
	}

</style>