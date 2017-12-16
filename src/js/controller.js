let game = new Board();
let isFirstMove = true;
let playerTeam = 'x';
let aiTeam = 'o';

// Team selection elements
const teamX = document.querySelector('.x p');
const teamO = document.querySelector('.o p');


// gets called when the board is clicked
function handleBoardClick(e) {

  if (isFirstMove) {
    isFirstMove = false;
  }

  const target = e.target.dataset.index;
  if (!target) { // target doesn't have a data-index attribute
    return;
  }

  const isMoveSuccessful = game.makeMove(target, playerTeam);
  if (isMoveSuccessful === false) { // spot taken
    return;
  }

  // move was sucessful
  updateBoardView();

  // getGameState returns false for unfinished games
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

  game.aiMakeMove(aiTeam);
  window.setTimeout(updateBoardView, 250);
}


// gets called when the 'restart-button' is clicked
function handleButtonClick(e) {
  const restartConfirmed = confirm("Are you sure you want to restart the game?");

  if (restartConfirmed) {
    game = new Board();
    isFirstMove = true;
    playerTeam = 'x';
    aiTeam = 'o';
    teamX.classList.add('active-team');
    teamO.classList.remove('active-team');
    updateBoardView();
  }
}


function handleTeamSelection() {
  if (isFirstMove) {
    isFirstMove = false;
    teamX.classList.remove('active-team');
    teamO.classList.add('active-team');
    playerTeam = 'o';
    aiTeam = 'x';
    game.aiMakeMove(aiTeam);
    updateBoardView();
  }
}


document.querySelector('.board').addEventListener('click', handleBoardClick);
document.querySelector('.restart-button').addEventListener('click', handleButtonClick);
teamO.addEventListener('click', handleTeamSelection);
