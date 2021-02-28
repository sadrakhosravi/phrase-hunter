/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase(); // Fix later!
  }

  /**
   * Displays each phrase's chracter as a li box or space on the page.
   * @param {Object} phrase - The phrase to be displayed on the page.
   */
  addPhraseToDisplay() {
    const phraseUL = document.querySelector('#phrase > ul');

    //Iterates over the phrase string.
    this.phrase.split('').forEach(letter => {
      let li = '';

      if (letter !== ' ') {
        li = `<li class="hide letter ${letter}">${letter}</li>`;
      } else {
        li = `<li class="space"> </li>`;
      }

      phraseUL.insertAdjacentHTML('beforeend', li);
    });
  }

  /**
   * Checks to see if the selected letter matches any of the characters in the phrase word.
   * @param {Object} e - Event object.
   * @return {Boolean} - Returns true if the word matches and false otherwise.
   */
  checkLetter(e) {
    return this.phrase.includes(e.target.textContent) ? true : false;
  }

  /**
   * Displays the user's selected letter that matched a character in the phrase word.
   * @param {String} char - The letter to be shown
   */
  showMatchedLetter(char) {
    const phrasePlaceholders = document.querySelectorAll(`.${char}`);

    phrasePlaceholders.forEach(letter => {
      letter.className = 'show letter';
    });
  }
}
