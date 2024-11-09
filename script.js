


const urlParams = new URLSearchParams(window.location.search);
const gameDuration = parseInt(urlParams.get('time-limit')) * 1000 || 10000; 

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-btn');

let score = 0;
let moleTimer;
let gameActive = false;

function showMole() {
  holes.forEach(hole => hole.classList.remove('mole'));
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add('mole');

  randomHole.onclick = () => {
    if (gameActive && randomHole.classList.contains('mole')) {
      score++;
      scoreDisplay.textContent = score;
      randomHole.classList.remove('mole');
    }
  };
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameActive = true;
  
  moleTimer = setInterval(showMole, 800);
  setTimeout(endGame, gameDuration);
}

function endGame() {
  clearInterval(moleTimer);
  gameActive = false;
  alert(`Game Over! Your final score is: ${score}`);
}

startButton.onclick = () => {
  if (!gameActive) {
    startGame();
  }
};
