let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let players = [];

function startGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  renderBoard();
}

function renderBoard() {
  const gameBoardElement = document.getElementById('gameBoard');
  gameBoardElement.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('data-index', i);
    cell.textContent = gameBoard[i];
    cell.addEventListener('click', handleCellClick);
    gameBoardElement.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      saveGameHistory();
      startGame();
    } else if (gameBoard.every(cell => cell !== '')) {
      alert('It\'s a tie!');
      startGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function addPlayerAndRender(playerName) {
  players.push(playerName);
  renderPlayers();
}

function renderPlayers() {
  const playersContainer = document.getElementById('playersList');
  playersContainer.innerHTML = '';

  players.forEach(player => {
    const playerElement = document.createElement('div');
    playerElement.textContent = player;
    playersContainer.appendChild(playerElement);
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function saveGameHistory() {
  const winner = currentPlayer === 'X' ? 'O' : 'X';
  const date = new Date().toLocaleString();
  const historyItem = `${date} - ${players[0] || 'Player 1'} vs ${players[1] || 'Player 2'} - Winner: ${winner}`;
  const listItem = document.createElement('li');
  listItem.textContent = historyItem;
  document.getElementById('gameHistoryList').appendChild(listItem);
}

function goToNewGame() {
  window.location.href = 'index.html';
}

function goToNewPlayer() {
  window.location.href = 'newplayer.html';
}

function goToGameHistory() {
  window.location.href = 'gamehistory.html';
}

function savePlayer() {
  const playerName = document.getElementById('playerName').value;
  players.push(playerName);
  alert(`${playerName} added as a player!`);
  document.getElementById('playerName').value = '';
  renderPlayers(); 
}




