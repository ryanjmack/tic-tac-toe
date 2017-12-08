const board = document.querySelector('.board');

function handleClick(e) {
  console.log(e.target.dataset.index);
}

board.addEventListener('click', handleClick);
