const spots = [...document.querySelectorAll('[data-index]')];


function updateBoardView() {
  const board = game.getBoardCopy();

  spots.forEach(spot => {
    // look at the dataset-index of the DOM element, look up the value in the
    // board and update the innerHTML of the spot accordingly
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
