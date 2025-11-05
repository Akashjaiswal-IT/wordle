const words = ['PIANO', 'GAMER', 'APPLE', 'ELITE'];
let wordToGuess = words[Math.floor(Math.random() * words.length)];

let keys = document.querySelectorAll('.key');
let tiles = document.querySelectorAll('.tile');

let currentTileIndex = 0;
const tilesPerRow = 5;
const maxTiles = tiles.length;
let count = 0;

keys.forEach(key => {
    key.addEventListener('click', () => {
        let letter = key.textContent;

        if (key.classList.contains('backspace')) {
            if (currentTileIndex > 0 && count > 0) {
                currentTileIndex--;
                count--;
                tiles[currentTileIndex].textContent = '';
                tiles[currentTileIndex].classList.remove('filled');
            }
            return;
        }
        if (letter === 'ENTER') {
            if (count === tilesPerRow) {
                let start = currentTileIndex - tilesPerRow;
                let guessedWord = '';
                
                for (let i = start; i < currentTileIndex; i++) {
                    guessedWord += tiles[i].textContent;
                }

                let wordArr = wordToGuess.split('');
                let guessArr = guessedWord.split('');

                // First pass: exact matches
                for (let i = 0; i < tilesPerRow; i++) {
                    const tile = tiles[start + i];
                    const key = document.getElementById('key-' + guessArr[i]);

                    if (guessArr[i] === wordArr[i]) {
                        tile.classList.add('correct');
                        key?.classList.remove('present', 'absent');
                        key?.classList.add('correct');
                        wordArr[i] = null;  // Mark used
                        guessArr[i] = null;
                    }
                }

                // Second pass: partial matches and wrong letters
                for (let i = 0; i < tilesPerRow; i++) {
                    if (guessArr[i] !== null) {
                        const tile = tiles[start + i];
                        const key = document.getElementById('key-' + guessArr[i]);
                        const index = wordArr.indexOf(guessArr[i]);

                        if (index !== -1) {
                            tile.classList.add('present');
                            if (!key?.classList.contains('correct')) {
                                key?.classList.remove('absent');
                                key?.classList.add('present');
                            }
                            wordArr[index] = null;
                        } else {
                            tile.classList.add('absent');
                            if (!key?.classList.contains('correct') && !key?.classList.contains('present')) {
                                key?.classList.add('absent');
                            }
                        }
                    }
                }

                if (guessedWord === wordToGuess) {
                    alert('🎉 You guessed it!');
                }

                count = 0;
            } else {
                alert('Please enter a 5-letter word.');
            }

            return;
        }

        if (currentTileIndex < maxTiles && count<5 && /^[A-Z]$/.test(letter)) {
            tiles[currentTileIndex].textContent = letter;
            tiles[currentTileIndex].classList.add('filled');
            currentTileIndex++;
            count++;
        }
    });
});
