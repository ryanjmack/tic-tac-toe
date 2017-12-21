/***********************************************************************
** Name: Ryan Mack
** Date: 12/14/2017
** Description: File for the model (MVC) portion of a web based tic
** tac toe game
***********************************************************************/

// Constructor function for Board
function Board() {
  this.board = new Array(9).fill(null);
  this.firstMove = true;
  this.playerTeam = 'x';
  this.aiTeam = 'o';
}


// returns a 'copy' of the board
Board.prototype.getBoardCopy = function() {
  return this.board.slice();
}


// checks to see if the board isFull - returns a boolean
Board.prototype.isFull = function(board = this.board) {
  return this.board.indexOf(null) === -1;
}


// allows a team to make a move. If the spot is open allow the move and
// return true. Else return false
Board.prototype.makeMove = function(index, team) {
  if (this.board[index] !== null) {
    return false;
  }
  else {
    this.board[index] = team;
    return true;
  }
}


// calls makeMove method for AI
Board.prototype.aiMakeMove = function() {
  this.makeMove(aiFindBestMove(this.getBoardCopy()), this.aiTeam);
}


// when the player switches to 'o', the ai/'x' will make first move
Board.prototype.switchTeams = function () {
  this.firstMove = false;
  this.playerTeam = 'o';
  this.aiTeam = 'x';
};


/***********************************************************************
** The following check(Diagonals|Rows|Columns) functions check if there
** is a winner. Returns the winner 'x' or 'o', or the boolean false
** indicating no winner. Pass a default parameter. We want to be able
** to pass in a 'look ahead' board in the evaluate function in the ai.js
** file. So in essence the following functions are used for the
** getGameState() and evaluate(board) functions.
***********************************************************************/
Board.prototype.checkDiagonals = function(board = this.board) {
  const center = board[4];

  if (center && board[0] === center && board[8] === center
   || center && board[2] === center && board[6] === center) {
     return center;
   }

   return false;
}


Board.prototype.checkRows = function(board = this.board) {
  if (board[0] && board[0] === board[1] && board[1] === board[2]) {
    return board[0]
  }
  else if (board[3] && board[3] === board[4] && board[4] === board[5]) {
    return board[3]
  }
  else if (board[6] && board[6] === board[7] && board[7] === board[8]) {
    return board[6]
  }

  return false;
}


Board.prototype.checkColumns = function(board = this.board) {
  if (board[0] && board[0] === board[3] && board[3] === board[6]) {
    return board[0]
  }
  else if (board[1] && board[1] === board[4] && board[4] === board[7]) {
    return board[1]
  }
  else if (board[2] && board[2] === board[5] && board[5] === board[8]) {
    return board[2]
  }

  return false;
}


/***********************************************************************
** If there is a winner, returns 'x' or 'o' indicating who won
** If there is no winner but the board is full, returns 'draw'.
** Else returns false indicating that the game is still ongoing
***********************************************************************/
Board.prototype.getGameState = function() {
  const winner = this.checkRows() || this.checkColumns() || this.checkDiagonals();

  if (winner) {
    return winner;
  }
  else if (this.isFull()) {
    return "draw";
  }
  else {
    return false;
  }
}
