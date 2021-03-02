/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.phrases = this.createPhrases();
    this.missed = 0;
    this.activePhrase = null;
  }

  /**
   * Creates 5 phrase objects.
   * @return {Array} - An array of 5 phrase objects to be used in the game.
   */
  createPhrases() {
    const phrasesArr = [];
    phrasesArr.push(new Phrase('Break The Ice'));
    phrasesArr.push(new Phrase('Love Birds'));
    phrasesArr.push(new Phrase('Like Father Like Son'));
    phrasesArr.push(new Phrase('Talk the Talk'));
    phrasesArr.push(new Phrase('Easy As Pie'));

    return phrasesArr;
  }

  /**
   * Randomly retrieves a phrase from the phrases array and returns it
   * @return {String} - randomly selected phrase string.
   */
  getRandomPhrase() {
    const randIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randIndex];
  }

  /**
   * Hides the start screen and initilizes the game
   */
  startGame() {
    //Hides the start screen
    document.querySelector('#overlay').style.display = 'none';

    //Set the random phrase
    this.activePhrase = this.getRandomPhrase();

    //Dsiplay random phrase placeholder
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Checks the button that was clicked and performs the game logic.
   * @param {Object} e - Clicked event object
   */
  handleInteraction(e) {
    //If any of the keyboard buttons are clicked hangle interaction and game logic
    if (
      (e.target.tagName === 'BUTTON' &&
        e.target.textContent !== 'Start Game' &&
        e.target.textContent !== 'Play Again') ||
      typeof e.key === 'string'
    ) {
      const targetVal = this.eventValue(e);
      console.log(targetVal);

      if (!targetVal) {
        return;
      }

      const keyboardKeys = document.querySelectorAll('.key');

      //Checks to see if the letter is part of the phrase.
      if (this.activePhrase.checkLetter(targetVal)) {
        if (e.target.tagName === 'BUTTON') {
          e.target.disabled = true;
          e.target.classList.add('chosen');
        } else {
          keyboardKeys.forEach(key => {
            if (key.textContent === e.key) {
              key.disabled = true;
              key.classList.add('chosen');
            }
          });
        }
        this.activePhrase.showMatchedLetter(targetVal);
      } else {
        if (e.target.tagName === 'BUTTON') {
          e.target.disabled = true;
          e.target.classList.add('wrong');
        } else {
          keyboardKeys.forEach(key => {
            if (key.textContent === e.key) {
              key.disabled = true;
              key.classList.add('wrong');
            }
          });
        }

        this.removeLife();
      }

      if (this.checkForWin()) {
        this.gameOver(true);
      }

      if (this.missed === 5) {
        this.gameOver(false);
      }
    }
  }

  /**
   * Checks if the event triggered is a keyup or a click on the onscreen keyboard.
   * @param {e} e - Event object
   * @return {String} - The value of the triggered event if it is between a-z.
   */
  eventValue(e) {
    if (e.key !== undefined) {
      const charRegEx = /^[a-z]{1}$/;

      if (charRegEx.test(e.key)) {
        return e.key;
      } else {
        alert('Sorry the key you pressed is not a letter! Please try again.');
      }
    }

    if (e.target.tagName === 'BUTTON') {
      return e.target.textContent;
    }
  }

  /**
   * Removes available heart icon from the page and adds 1 to the missed value
   */
  removeLife() {
    const tries = document.querySelectorAll('.tries');
    const lastHeart = tries.length - 1 - this.missed;
    tries[
      lastHeart
    ].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon Lost" height="35" width="30">`;
    this.missed++;
  }

  /**
   * Check if all the letters on the page are filled correctly
   * @return {Boolean} - Returns true if the player won or false otherwise.
   */
  checkForWin() {
    const notFilledLetters = document.querySelectorAll('.hide');
    if (notFilledLetters.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Outputs the game over message and overlay on the page based on whether the use won or lost.
   * @param {Boolean} win - Whether the game was won or not (true for yes flase for no).
   */
  gameOver(win) {
    const startScreen = document.querySelector('#overlay');
    const message = document.querySelector('#game-over-message');
    const startBtn = document.querySelector('#btn__reset');

    startScreen.style.display = 'inherit';
    startBtn.innerHTML = 'Play Again';

    if (win) {
      startScreen.className = 'win';
      message.textContent = `You Won 🎉! "${this.activePhrase.phrase.toUpperCase()}" was the correct phrase`;
    } else {
      startScreen.className = 'lose';
      message.textContent = `You Lost 😢! "${this.activePhrase.phrase.toUpperCase()}" was the correct phrase`;
    }
  }

  /**
   * Resets the game by removing old phrase placeholders, resetting the keyboard, resetting available hearts,
   * and resetting missed to 0
   */
  gameReset() {
    const keys = document.querySelectorAll('.key');
    const phraseLIs = document.querySelectorAll('#phrase > ul > li');
    const hearts = document.querySelectorAll('.tries');

    //Reset keys
    keys.forEach(key => {
      key.className = 'key';
      key.disabled = false;
    });

    //Reset displayed LI placeholders
    phraseLIs.forEach(li => {
      li.remove();
    });

    //Reset hearts-lives
    hearts.forEach(heart => {
      heart.innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30" />`;
    });

    //Reset opportunities
    this.missed = 0;
  }
}
