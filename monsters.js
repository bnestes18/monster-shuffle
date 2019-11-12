;(function () {

    // VARIABLES
    let app = document.querySelector('#app');
    // The monsters and socks
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
    let monsterCount = 0;
    
    // FUNCTIONS

    // Shuffles the items of a given array
    let shuffle = function (array) {
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

    // Initializes the game (shows door.svg in each grid)
    let gameInit = function () {
        monsterCount = 0;

        shuffle(monsters);	// Shuffle monsters
        let description = '<p>Click or press Enter to reveal a monster behind the chosen door.</p>' +
                          '<p><strong>Be careful not to click on a sock!</strong></p>'

        let doorImgs = '<div class="row">' 
                        + monsters.map(function (monster) {
                            return '<div class="grid" aria-live="polite">' +
                                        '<button data-image="' + monster +'"><img title="Click door to reveal the monster" alt="Picture of a door"' + 'src="img/door.svg"' + '/></button>' +
                                '</div>'}).join('') 
                    + '</div>'

        app.innerHTML = description + doorImgs;
    }
    
    // Reveals the monster behind the door
    let handleClicks = function (e) {

        // Check if clicked item is the 'Play again' button
        if (e.target.matches('#reset')) {
            gameInit();         // Restores game back to initial state after win/loss
            return;
        } 

        // Check if clicked item is a button element
        // If it is, it will get the attribute value and insert the image of the corresponding value into the DOM
        let buttonTag = e.target.closest('[data-image]');
        if (buttonTag) {
            let monsterImg = buttonTag.getAttribute('data-image');
            buttonTag.parentNode.innerHTML = '<img alt="Picture of a monster"' + 'src="img/' + monsterImg + '.svg"' + '/>';
            trackGame(monsterImg); 
        } else return; // Bail if clicked item is not a button tag
    }

    // Renders message UI after the user has lost
    let renderLost = function () {
        app.innerHTML = '<div class="outcome-msg">'
                        + '<h2>Sorry. You Lost!!!</h2>' 
                        + '<img src="https://media.giphy.com/media/kEiw9sE1P4iP0YBWFb/giphy.gif" alt="giphy of a gamer">'
                        + '<button id="reset">Play Again</button>'
                     '</div>'
    }

    // Renders message UI after the user has won
    let renderWon = function () {
        app.innerHTML = '<div class="outcome-msg">'
                            + '<h2>Yaaaay! You WOOOOOON!!!</h2>'
                            + '<img src="https://media.giphy.com/media/43JOOvm7SbDbHTKQUm/giphy.gif" alt="giphy of a dancer">'
                            + '<button id="reset">Play Again</button>'
                        '</div>'
    }
 
    // Tracks the progress of the game (win or lose)
    let trackGame = function (img) {
        // If image is a sock, user loses and render lost UI
        if (img === 'sock') {
            renderLost();		
        } else {
            // Increment number of monsters shown
            monsterCount++;
            // If all monsters are shown, (11 total) then render win UI
            if (monsterCount === monsters.length - 1) {
               renderWon();
            }
        }
    }

    // Initialize the game
    gameInit();

    // EVENT HANDLERS
    
    // Reveals the monster on door click event
    window.addEventListener('click', handleClicks, false); 

}(document))