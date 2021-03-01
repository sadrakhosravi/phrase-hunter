/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startBtn = document.querySelector('#btn__reset');
const mainContent = document.querySelector('.main-container');
const game = new Game();

startBtn.addEventListener('click', e => {
  game.gameReset();
  game.startGame();
});

mainContent.addEventListener('click', e => {
  game.handleInteraction(e);
});

document.addEventListener('keyup', e => {
  game.handleInteraction(e);
});
