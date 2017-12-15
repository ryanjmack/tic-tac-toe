let game = new Board();
let isFirstMove = true;

function handleBoardClick(e) {
  const target = e.target.dataset.index;
  if (!target) {
    return;
  }

  const isMoveSuccessful = game.makeMove(target, 'x');
  if (!isMoveSuccessful) {
    return;
  }

  updateBoardView();

  const state = game.getGameState();
  if (state) {
    if (state === 'x') {
      console.log('x won');
    }
    else if (state === 'o') {
      console.log('o won');
    }
    else {
      console.log('draw');
    }
  }
}


function handleButtonClick(e) {
  game = new Board();
  
  updateBoardView();
}

document.querySelector('.board').addEventListener('click', handleBoardClick);
document.querySelector('.restart-button').addEventListener('click', handleButtonClick);
