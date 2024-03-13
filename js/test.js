let attempts = 0;
let index = 0;
let timer;
// const answer = 'APPLE';

const options = ['APPLE', 'CONST', 'WORST', 'TABLE', 'TOAST', 'MOUSE', 'BONUS', 'CHECK', 'TASTE'];
// const options = ['APPLE', 'CONST'];
function getRandom(num) {
  return Math.floor(Math.random() * num);
}

let answer = options[getRandom(options.length)];
// console.log(answer);

function backkeyHandler() {
  const deleteBlock = document.querySelector(`.board-column[data-index="${attempts}${index - 1}"]`);
  console.log('back');
  if (index == 0) {
    return;
  }

  deleteBlock.innerHTML = '';
  deleteBlock.style.border = '2px solid #d3d6da';
  index -= 1;
}
let gameOverDiv = document.createElement('div');
function gameOver() {
  window.removeEventListener('keydown', keyDownHandler);

  gameOverDiv.style =
    'position:fixed; top:40%; left : 50%; transform : translateX(-50%);background:black;padding:15px 30px; color : white';
  document.body.appendChild(gameOverDiv);

  clearInterval(timer);
}

function gameOverCorrect() {
  gameOver();
  gameOverDiv.innerHTML = '정답입니다. ';
}

function gameOverWrong() {
  gameOver();
  gameOverDiv.innerHTML = `실패하였습니다.<br> 정답은 : ${answer}입니다.`;
}

function goToNextLine() {
  attempts += 1;
  index = 0;

  if (attempts === 6) {
    gameOverWrong();
  }
  console.log(attempts);
}

function enterKeyHandler() {
  // console.log('enter');
  if (index < 5) {
    alert('not enough letters!');
    return;
  }

  let correctNum = 0;

  for (let i = 0; i < 5; i++) {
    const block = document.querySelector(`.board-column[data-index="${attempts}${i}"]`);
    const letter = block.innerHTML;
    const correctLetter = answer[i];
    let keyBlocks = document.querySelectorAll('.key-block');

    if (letter === correctLetter) {
      block.style.backgroundColor = 'green';
      block.style.color = 'white';
      block.style.border = '2px solid green';
      correctNum += 1;
      keyBlocks.forEach(function (keyblock) {
        blockDataKey = keyblock.getAttribute('data-key');
        if (blockDataKey === letter) {
          keyblock.style.backgroundColor = 'green';
          keyblock.style.color = 'white';
        }
      });
    } else if (answer.includes(letter)) {
      block.style.backgroundColor = 'orange';
      block.style.color = 'white';
      block.style.border = '2px solid orange';
      keyBlocks.forEach(function (keyblock) {
        blockDataKey = keyblock.getAttribute('data-key');
        if (blockDataKey === letter) {
          keyblock.style.backgroundColor = 'orange';
          keyblock.style.color = 'white';
        }
      });
    } else {
      block.style.backgroundColor = 'grey';
      block.style.color = 'white';
      block.style.border = '2px solid grey';
      keyBlocks.forEach(function (keyblock) {
        blockDataKey = keyblock.getAttribute('data-key');
        if (blockDataKey === letter) {
          keyblock.style.backgroundColor = 'grey';
          keyblock.style.color = 'white';
        }
      });
    }
  }

  if (correctNum == 5) {
    gameOverCorrect();
  } else {
    goToNextLine();
  }
}

function keyDownHandler(e) {
  // console.log(`키값: ${e.key},키코드:${e.keyCode}`);
  // a:65, z:90, Backspace:8, Enter:13, Escape:27, F5:116
  let thisBlock = document.querySelector(`.board-column[data-index="${attempts}${index}"]`);

  if (!timer) {
    startTimer();
  }

  const key = e.key.toUpperCase();
  const keycode = e.keyCode;

  if (e.keyCode === 8) {
    // console.log('backspace');
    backkeyHandler();
  } else if (e.keyCode === 13) {
    enterKeyHandler();
  } else if (index === 5) {
    return;
  } else if (keycode >= 65 && keycode <= 95) {
    thisBlock.innerHTML = key;
    thisBlock.style.border = '2px solid black';
    index += 1;
  }
}

function startTimer() {
  const startTime = new Date();
  function setTime() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    const minute = elapsedTime.getMinutes().toString().padStart(2, '0');
    const second = elapsedTime.getSeconds().toString().padStart(2, '0');
    document.querySelector('#timer').innerHTML = `${minute} : ${second}`;
  }

  timer = setInterval(setTime, 1000);
}

let keyBoards = document.querySelectorAll('.key-block');

keyBoards.forEach((keyboardkey) => {
  let data = keyboardkey.getAttribute('data-key');

  keyboardkey.addEventListener('click', function (e) {
    if (!timer) {
      startTimer();
    }
    let keyBlock = document.querySelector(`.board-column[data-index="${attempts}${index}"]`);

    if (data === 'ENTER') {
      enterKeyHandler();
    } else if (data === 'BACK') {
      backkeyHandler();
    } else {
      // keyBoardHandler();
      console.log(data);
      keyBlock.innerHTML = data;
      keyBlock.style.border = '2px solid black';
      index += 1;
    }
  });
});

window.addEventListener('keydown', keyDownHandler);
