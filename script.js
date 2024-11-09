// Main Game Script for Scribble Pad

// Set up the start page with options for timer selection
function createStartPage() {
  document.body.innerHTML = `
      <h1>Whack-a-Mole</h1>
      <h3>Select Game Duration</h3>
      <form id="game-settings">
          <label><input type="radio" name="time-limit" value="10" required> 10 seconds</label><br>
          <label><input type="radio" name="time-limit" value="30"> 30 seconds</label><br>
          <label><input type="radio" name="time-limit" value="60"> 1 minute</label><br>
          <label><input type="radio" name="time-limit" value="300"> 5 minutes</label><br>
          <button type="button" id="start-game">Start Game</button>
      </form>
  `;

  document.getElementById("start-game").onclick = startGame;
}

// Start the game with the selected duration
function startGame() {
  const selectedTime = document.querySelector('input[name="time-limit"]:checked');
  if (!selectedTime) {
      alert("Please select a game duration!");
      return;
  }

  const gameDuration = parseInt(selectedTime.value) * 1000;
  createGamePage(gameDuration);
}

// Set up the game page
function createGamePage(gameDuration) {
  document.body.innerHTML = `
      <div id="game-board"></div>
      <h3>Score: <span id="score">0</span></h3>
      <button id="start-btn">Start Game</button>
  `;

  // Set up CSS styling
  document.body.style.cssText = 'font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; margin-top: 50px;';
  const gameBoard = document.getElementById('game-board');
  gameBoard.style.cssText = 'display: grid; grid-template-columns: repeat(3, 100px); grid-gap: 10px;';

  for (let i = 1; i <= 9; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      hole.style.cssText = 'width: 100px; height: 100px; background-color: #c3c3c3; border: 2px solid #999; position: relative; cursor: pointer;';
      hole.dataset.hole = i;
      gameBoard.appendChild(hole);
  }

  document.getElementById('start-btn').onclick = () => {
      if (!gameActive) {
          startWhackAMole(gameDuration);
      }
  };
}

let score = 0;
let moleTimer;
let gameActive = false;

function showMole() {
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.classList.remove('mole'));
  
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add('mole');
  randomHole.style.backgroundColor = '#6c6';

  randomHole.onclick = () => {
      if (gameActive && randomHole.classList.contains('mole')) {
          score++;
          document.getElementById('score').textContent = score;
          randomHole.classList.remove('mole');
          randomHole.style.backgroundColor = '#c3c3c3';
      }
  };
}

function startWhackAMole(gameDuration) {
  score = 0;
  document.getElementById('score').textContent = score;
  gameActive = true;
  
  moleTimer = setInterval(showMole, 800);
  setTimeout(endGame, gameDuration);
}

function endGame() {
  clearInterval(moleTimer);
  gameActive = false;
  alert(`Game Over! Your final score is: ${score}`);
}

// Initialize the start page when the script loads
createStartPage();
