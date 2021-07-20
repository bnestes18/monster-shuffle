// VARIABLES
let app = document.querySelector('#app');
let grids = Array.prototype.slice.call(document.querySelectorAll('.grid'));
let monsters = [
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
];

// FUNCTIONS
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

}

// Shuffle and cache the monsters
let monsterImgs = shuffle(monsters.map(function(monster) {
    return monster === 'sock' ? `<img src="./img/${monster}.svg" title="A pair of white socks"></img>` : `<img src="./img/${monster}.svg" title="${monster} from Monsters, Inc."></img>`;
}))

// Render the monsters to the DOM (in each cell)
grids.map(function(grid) {
    grid.innerHTML = monsterImgs[grid.textContent - 1];
})
