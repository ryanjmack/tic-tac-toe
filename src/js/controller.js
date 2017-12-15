let game = new Board();
let isFirstMove = true;

function handleBoardClick(e) {
  const target = e.target.dataset.index;

  if (!target) {
    return;
  }

  game.makeMove(target, 'x');
  updateBoardView();
}

document.querySelector('.board').addEventListener('click', handleBoardClick);
