/***********************************************************************
** Name: Ryan Mack
** Date: 12/14/2017
** Description: File for the controller (MVC) portion of a web based .
** tic tac toe game
***********************************************************************/

// variables that save information about the game
let game = new Board();
let isFirstMove = true;
let playerTeam = 'x';
let aiTeam = 'o';

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
    if (state === playerTeam) {
      alert('Congratulations! You won!');
    }
    else if (state === aiTeam) {
      alert('Sorry! The other team won!');
    }
    else {
      alert('Close one! It was a draw!');
    }

    // reset the flags and data
    game = new Board();
    isFirstMove = true;
    playerTeam = 'x';
    aiTeam = 'o';
    teamX.classList.add('active-team');
    teamO.classList.remove('active-team');
    updateBoardView();
  }, 500);
}


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
