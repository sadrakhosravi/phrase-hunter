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

  handleInteraction(e) {
    const keys = document.querySelectorAll('.key');

    //If any of the keyboard buttons are clicked hangle interaction and game logic
    if (e.target.tagName === 'BUTTON' && e.target.textContent !== 'Start Game') {
      keys.forEach(key => {
        if (e.target.textContent === key.textContent) {
          console.log(`${key.textContent} pressed!`);
        }
      });
    }
  }
}
