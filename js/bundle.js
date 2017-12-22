'use strict';function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}function Board(){this.board=Array(9).fill(null),this.firstMove=!0,this.playerTeam='x',this.aiTeam='o'}Board.prototype.getBoardCopy=function(){return this.board.slice()},Board.prototype.isFull=function(){0<arguments.length&&arguments[0]!==void 0?arguments[0]:this.board;return-1===this.board.indexOf(null)},Board.prototype.makeMove=function(a,b){return!(null!==this.board[a])&&(this.board[a]=b,!0)},Board.prototype.aiMakeMove=function(){this.makeMove(aiFindBestMove(this.getBoardCopy()),this.aiTeam)},Board.prototype.switchTeams=function(){this.firstMove=!1,this.playerTeam='o',this.aiTeam='x'},Board.prototype.checkDiagonals=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:this.board,b=a[4];return(b&&a[0]===b&&a[8]===b||b&&a[2]===b&&a[6]===b)&&b},Board.prototype.checkRows=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:this.board;if(a[0]&&a[0]===a[1]&&a[1]===a[2])return a[0];return a[3]&&a[3]===a[4]&&a[4]===a[5]?a[3]:a[6]&&a[6]===a[7]&&a[7]===a[8]&&a[6]},Board.prototype.checkColumns=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:this.board;if(a[0]&&a[0]===a[3]&&a[3]===a[6])return a[0];return a[1]&&a[1]===a[4]&&a[4]===a[7]?a[1]:a[2]&&a[2]===a[5]&&a[5]===a[8]&&a[2]},Board.prototype.getGameState=function(){var a=this.checkRows()||this.checkColumns()||this.checkDiagonals();return a?a:!!this.isFull()&&'draw'};var spots=[].concat(_toConsumableArray(document.querySelectorAll('[data-index]')));function updateBoardView(){var a=game.getBoardCopy();spots.forEach(function(b){var c=a[b.dataset.index];b.innerHTML='x'===c?'<i class="fa fa-times" aria-hidden="true"></i>':'o'===c?'<i class="fa fa-circle-o" aria-hidden="true"></i>':''})}var game=new Board,teamX=document.querySelector('.x p'),teamO=document.querySelector('.o p');function handleGameOver(a){window.setTimeout(function(){a===game.playerTeam?alert('Congratulations! You won!'):a===game.aiTeam?alert('Sorry! The other team won!'):alert('Close one! It was a draw!'),game=new Board,teamX.classList.add('active-team'),teamO.classList.remove('active-team'),updateBoardView()},500)}function handleBoardClick(a){game.firstMove&&(game.firstMove=!1);var b=a.target.dataset.index;if(b&&!1!==game.makeMove(b,game.playerTeam)){updateBoardView();var c=game.getGameState();return c?void handleGameOver(c):(game.aiMakeMove(aiTeam),window.setTimeout(updateBoardView,250),c=game.getGameState(),c)?void handleGameOver(c):void 0}}function handleButtonClick(){var b=confirm('Are you sure you want to restart the game?');b&&(game=new Board,teamX.classList.add('active-team'),teamO.classList.remove('active-team'),updateBoardView())}var isFirstMove=!0,playerTeam='x',aiTeam='o';function handleTeamSelection(){return!!game.firstMove&&void(game.switchTeams(),teamX.classList.remove('active-team'),teamO.classList.add('active-team'),game.aiMakeMove(),updateBoardView())}document.querySelector('.board').addEventListener('click',handleBoardClick),document.querySelector('.restart-button').addEventListener('click',handleButtonClick),teamO.addEventListener('click',handleTeamSelection);function evaluate(a){var b=game.checkRows(a)||game.checkColumns(a)||game.checkDiagonals(a);return b===game.playerTeam?-10:b===game.aiTeam?10:0}function aiFindBestMove(a){for(var b={value:-Infinity,index:-1},c=0;9>c;c++)if(!a[c]){a[c]=game.aiTeam;var d=minimax(a.slice(),0,!1,-Infinity,Infinity);d>b.value&&(b.value=d,b.index=c),a[c]=null}return b.index}function minimax(a,b,c,d,f){var g=evaluate(a);if(10===g)return g-b;if(-10===g)return g+b;if(-1===a.indexOf(null))return 0;if(c){for(var h=-Infinity,j=0;9>j;j++)if(!a[j]){var k=a.slice();k[j]=game.aiTeam;var l=minimax(k,b+1,!c,d,f);if(h=Math.max(h,l),d=Math.max(d,h),f<=d)break}return h}for(var m=Infinity,n=0;9>n;n++)if(!a[n]){var o=a.slice();o[n]=game.playerTeam;var p=minimax(o,b+1,!c,d,f);if(m=Math.min(m,p),f=Math.min(m,f),f<=d)break}return m}