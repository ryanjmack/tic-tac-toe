/***********************************************************************
** Name: Ryan Mack
** Date: 12/14/2017
** Description: File for the controller (MVC) portion of a web based .
** tic tac toe game
***********************************************************************/

// variables that save information about the game
let game = new Board();

// Team selection elements
const teamX = document.querySelector('.x p');
const teamO = document.querySelector('.o p');


/***********************************************************************
** Gets called when there is a winner. Alerts the user of a winner and
** resets game settings.
***********************************************************************/
function handleGameOver(state) {
  // need a setTimeout so the board will render then alert the user
  window.setTimeout(function() {
    if (state === game.playerTeam) {
      alert('Congratulations! You won!');
    }
    else if (state === game.aiTeam) {
      alert('Sorry! The other team won!');
    }
    else {
      alert('Close one! It was a draw!');
    }

    //
    game = new Board();
    teamX.classList.add('active-team');
    teamO.classList.remove('active-team');
    updateBoardView();
  }, 500);
}


// gets called when the board is clicked
function handleBoardClick(e) {

  if (game.firstMove) {
    game.firstMove = false;
  }

  const target = e.target.dataset.index;
  if (!target) { // target doesn't have a data-index attribute
    return;
  }

  if (game.makeMove(target, game.playerTeam) === false) { // spot taken
    return;
  }

  // move was sucessful
  updateBoardView();

  // getGameState returns false for unfinished games
  let state = game.getGameState();
  if (state) {
    handleGameOver(state);
    return;
  }

  game.aiMakeMove(aiTeam);
  window.setTimeout(updateBoardView, 250);

  state = game.getGameState();
  if (state) {
    handleGameOver(state);
    return;
  }
}


// gets called when the 'restart-button' is clicked
function handleButtonClick(e) {
  const restartConfirmed = confirm("Are you sure you want to restart the game?");

  if (restartConfirmed) {
    game = new Board();
    teamX.classList.add('active-team');
    teamO.classList.remove('active-team');
    updateBoardView();
  }
}
let isFirstMove = true;
let playerTeam = 'x';
let aiTeam = 'o';

function handleTeamSelection() {
  if (game.firstMove) {
    game.switchTeams();
    teamX.classList.remove('active-team');
    teamO.classList.add('active-team');
    game.aiMakeMove();
    updateBoardView();
  }
  else {
    return false;
  }
}


document.querySelector('.board').addEventListener('click', handleBoardClick);
document.querySelector('.restart-button').addEventListener('click', handleButtonClick);
teamO.addEventListener('click', handleTeamSelection);
