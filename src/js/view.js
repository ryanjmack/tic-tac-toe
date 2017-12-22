/***********************************************************************
** Name: Ryan Mack
** Date: 12/14/2017
** Description: File for the view (MVC) portion of a web based tic
** tac toe game
***********************************************************************/
// spots on the tic tac toe board. They have a dataset-index attribute
const spots = [...document.querySelectorAll('[data-index]')];


function updateBoardView() {
  // get a copy of the board
  const board = game.getBoardCopy();

  // iterate over the DOM elements, adding an icon for 'x' or 'o', if applicable
  spots.forEach(spot => {
    const value = board[spot.dataset.index]


    if (value === 'x') {
      spot.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
    }
    else if (value === 'o') {
      spot.innerHTML = `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
    }
    else {
      spot.innerHTML = '';
    }
  });
}
