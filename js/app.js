/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startBtn = document.querySelector('#btn__reset');
const mainContent = document.querySelector('.main-container');
const game = new Game();

//Starts the game by clicking Start Game Button
startBtn.addEventListener('click', e => {
  game.gameReset();
  game.startGame();
});

//Keyboard button clicks interactions
mainContent.addEventListener('click', e => {
  game.handleInteraction(e);
});

//Keyboard input interactions
document.addEventListener('keyup', e => {
  if (document.querySelector('#overlay').style.display === 'none') {
    console.log(document.querySelector('#overlay').style.display !== 'none');
    game.handleInteraction(e);
  } else {
    alert('Please start a game first!');
  }
});
