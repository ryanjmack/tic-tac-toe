/***********************************************************************
** Name: Ryan Mack
** Date: 12/21/2017
** Description: File for the code for the tic tac toe AI
***********************************************************************/

/*
this function is similiar to getGameState() but it returns a 'score'
for the minimax function to help AI decide what move it should make
*/
function evaluate(board) {

  const winner = game.checkRows(board) || game.checkColumns(board) || game.checkDiagonals(board);

  if (winner === game.playerTeam) {
    return -10;
  }
  else if (winner === game.aiTeam) {
    return 10;
  }
  else { // unfinished or a draw
    return 0;
  }
}

/*
*  iterates over the empty spots on the board and looks ahead to see
*  potential outcomes. It returns the index of the bestMove, which is
*  in turn fed to Game.prototype.aiMakeMove(index, team)
*/
function aiFindBestMove(board) {
  let bestMove = {
    value: -Infinity,
    index: -1
  }

  // iterate over empty spots
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      // have the ai make a move on the empty spot
      board[i] = game.aiTeam;

      // get the value of the move
      const moveValue = minimax(board.slice(), 0, false, -Infinity, Infinity);
      if (moveValue > bestMove.value) {
        bestMove.value = moveValue;
        bestMove.index = i;
      }
      // undo the move
      board[i] = null;
    }
  }
  return bestMove.index;
}


// https://en.wikipedia.org/wiki/Minimax
// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/
function minimax (board, depth, isMaximizer, alpha, beta) {
  // check to see if there is a terminal state
  const score = evaluate(board);
  if (score === 10) {
    return score - depth;
  }
  else if (score === -10) {
    return score + depth;
  }
  else if (board.indexOf(null) === -1) {
    return 0;
  }

  if (isMaximizer) { // AI turn
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const boardCopy = board.slice();
        boardCopy[i] = game.aiTeam;

        const value = minimax(boardCopy, depth + 1, !isMaximizer, alpha, beta);
        bestScore = Math.max(bestScore, value);
        alpha     = Math.max(alpha, bestScore);

        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  }

  else { // player turn
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const boardCopy = board.slice();
        boardCopy[i] = game.playerTeam;

        const value = minimax(boardCopy, depth + 1, !isMaximizer, alpha, beta);
        bestScore = Math.min(bestScore, value);
        beta      = Math.min(bestScore, beta);

        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  }
}
