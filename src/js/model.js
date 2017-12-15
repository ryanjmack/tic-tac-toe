/***********************************************************************
** Name: Ryan Mack
** Date: 12/14/2017
** Description: File for the model (MVC) portion of a web based tic
** tac toe game
***********************************************************************/

// Constructor function for Board
function Board() {
  this.board = new Array(9).fill(null);
}


// returns a 'copy' of the board
Board.prototype.getBoardCopy = function() {
  return this.board.slice();
}


// checks to see if the board isFull - returns a boolean
Board.prototype.isFull = function() {
  return this.board.filter(val => val === null).length === 0;
}


// allows a team to make a move. If the spot is open allow the move and
// return true. Else return false
Board.prototype.makeMove = function(index, player) {
  if (this.board[index] !== null) {
    return false;
  }
  else {
    this.board[index] = team;
    return true;
  }
}

/***********************************************************************
** The following check(Diagonals|Rows|Columns) functions check if there
** is a winner. Returns the winner 'x' or 'o', or the boolean false
** indicating no winner.
***********************************************************************/
Board.prototype.checkDiagonals = function() {
  const board = this.getBoardCopy();
  const center = board[4];

  if (board[0] === center && board[8] === center
   || board[2] === center && board[6] === center) {
     return center;
   }

   return false;
}


Board.prototype.checkRows = function() {
  const board = this.getBoardCopy();

  if (board[0] === board[1] && board[1] === board[2]) {
    return board[0]
  }
  else if (board[3] === board[4] && board[4] === board[5]) {
    return board[3]
  }
  else if (board[6] === board[7] && board[7] === board[8]) {
    return board[6]
  }

  return false;
}


Board.prototype.checkColumns = function() {
  const board = this.getBoardCopy();

  if (board[0] === board[3] && board[3] === board[6]) {
    return board[0]
  }
  else if (board[1] === board[4] && board[4] === board[7]) {
    return board[1]
  }
  else if (board[2] === board[5] && board[5] === board[8]) {
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
