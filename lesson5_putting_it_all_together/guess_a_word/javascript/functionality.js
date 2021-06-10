document.addEventListener('DOMContentLoaded', () => {
  const message = document.querySelector('#message');
  const spacesDiv = document.querySelector('#spaces');
  const guessesDiv = document.querySelector('#guesses');
  const apples = document.querySelector('#apples');
  const replay = document.querySelector('#replay');
  const guessesSpans = document.querySelectorAll('#guesses span');

  const randomWord = (function() {
    let allWords = ['banana', 'orange', 'cherry', 'h'];
  
    return function() {
      if (allWords.length === 0) return undefined;
  
      let idx = Math.floor(allWords.length * Math.random());
      let word = allWords[idx];
      allWords.splice(idx, 1);
  
      return word;
    };
  })();
  
  class Game {
    constructor() {
      this.word = this.chooseWord();
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
      this.allowedWrongGuesses = 6;
      this.createBlanks();
      this.displayGuesses();
    }

    noMoreWords() {
      if (!this.word) {
        message.textContent = 'Oops! No more words. Bye!';
      }
    }
  
    chooseWord() {
      let word = randomWord();
  
      if (!word) {
        message.textContent = "Sorry, I've run out of words!";
        return null;
      }

      return word;
    }
  
    createBlanks() {
      this.deleteSpans('spaces');
      let amount = this.word ? this.word.length : 0 ;

      for (let num = 1; num <= amount; num += 1) {
        let newSpan = document.createElement('span');
        spaces.appendChild(newSpan);
      }
    }

    deleteSpans(id) { // delete spans based on an id
      let allBlanks = document.querySelectorAll(`#${id} span`);

      allBlanks.forEach(blank => blank.remove());
    }

    displayGuesses() {
      this.deleteSpans('guesses'); // delete old guesses
      this.lettersGuessed.forEach(letter => { // make all new guesses
        let newSpan = document.createElement('span');
        newSpan.textContent = letter;
        guesses.appendChild(newSpan);
      });
    }

    didUserWin() {
      for(let i = 0; i < this.word.length; i += 1) {
        if (!this.lettersGuessed.includes(this.word[i])) return false;
      }
      return true;
    }
  }

  let game = new Game()

  const letterGuessingEvent = (event) => {
    if (event.key >= 'a' && event.key <= 'z') { // if the key pressed is a letter
      if (!game.lettersGuessed.includes(event.key)) {// if that key hasn't already been guessed
        game.lettersGuessed.push(event.key)           // add it to the list of guessed letters
        game.displayGuesses();

        if (game.word.includes(event.key)) {   // if the letter was a correct guess
          let idxs = [];

          for (let i = 0; i < game.word.length; i += 1) { // save all the indexes of where this letter shows up in the game's word
            if (game.word[i] === event.key) {
              idxs.push(i)
            }
          }
          
          let spacesSpans = document.querySelectorAll('#spaces span');        
          spacesSpans.forEach((span, idx) => {
            if (idxs.includes(idx)) {
                span.textContent = event.key
            };
          })
        } else {
          game.incorrectGuesses += 1;
          apples.classList = [];
          apples.classList.add(`guess_${game.incorrectGuesses}`);
        }
      }
    }  
    if (game.incorrectGuesses === game.allowedWrongGuesses) {
      message.textContent = `Sorry, you're out of guesses! The word was ${game.word}.`;
      replay.setAttribute('style', 'display: inline')
    } else if (game.didUserWin()) {
      message.textContent = 'Well done! You won!';
      replay.setAttribute('style', 'display: inline');
    }
  };

  replay.addEventListener('click', (e) => {
    e.preventDefault();
    //document.removeEventListener('keyup', letterGuessingEvent);
    game = new Game();
    message.textContent = '';
    replay.setAttribute('style', 'display: none');
    apples.classList = [];
    game.noMoreWords();
  });

  document.addEventListener('keyup', letterGuessingEvent);
});
