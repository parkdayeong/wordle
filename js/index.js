const answer = 'APPLE';

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement('div');
    div.innerHTML = '게임이 종료되었습니다.';
    div.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top:50%; left:50%;transform : translate(-50%, -50%);background-color:black; padding:15px 30px; color:white';
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener('keydown', handlekeyDown);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts == 6) {
      gameOver();
    }
    attempts += 1;
    index = 0;
  };

  const hanldeEnterKey = () => {
    let correctNum = 0;
    // 정답확인

    if (index < 5) {
      alert('Not enough letters!');
      return;
    }
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(`.board-column[data-index="${attempts}${i}"]`);
      const letter = block.innerText.toUpperCase();
      const correctLetter = answer[i].toUpperCase();
      const keyBlocks = document.querySelectorAll('.key-block');

      if (letter === correctLetter) {
        block.style.backgroundColor = '#6aaa64';
        block.style.color = 'white';
        block.style.border = '2px solid #6aaa64';
        correctNum += 1;
        keyBlocks.forEach(function (keyBlock) {
          var datakey = keyBlock.getAttribute('data-key');
          if (datakey === letter) {
            keyBlock.style.backgroundColor = '#6aaa64';
          }
        });
      } else if (answer.includes(letter)) {
        block.style.backgroundColor = '#c9b458';
        block.style.color = 'white';
        block.style.border = '2px solid #c9b458';
        keyBlocks.forEach(function (keyBlock) {
          var datakey = keyBlock.getAttribute('data-key');
          if (datakey === letter) {
            keyBlock.style.backgroundColor = '#c9b458';
          }
        });
      } else {
        block.style.backgroundColor = '#787c7e';
        block.style.color = 'white';
        block.style.border = '2px solid #787c7e';
        keyBlocks.forEach(function (keyBlock) {
          var datakey = keyBlock.getAttribute('data-key');
          if (datakey === letter) {
            keyBlock.style.backgroundColor = '#787c7e';
          }
        });
      }
    }

    console.log(`맞은개수 : ${correctNum}`);
    if (correctNum === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };

  const handleBackspace = (thisBlock) => {
    if (index !== 0) {
      const deleteBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );
      deleteBlock.innerHTML = '';
      index -= 1;
      deleteBlock.style.border = '2px solid #d3d6da';
    }
  };

  const startTimer = () => {
    const startTime = new Date();
    function setTime() {
      const currentTime = new Date();
      const elapsedTime = new Date(currentTime - startTime);
      const minute = elapsedTime.getMinutes().toString().padStart(2, '0');
      const second = elapsedTime.getSeconds().toString().padStart(2, '0');
      const timeH1 = document.querySelector('#timer');
      timeH1.innerText = `${minute} : ${second}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handlekeyDown = (e) => {
    if (!timer) {
      startTimer();
    }
    // console.log(e.key);
    // console.log(e.key, e.keyCode);
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(`.board-column[data-index="${attempts}${index}"]`);

    if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key == 'Enter') {
      hanldeEnterKey();
    } else if (index === 5) {
      return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerHTML = key;
      index += 1;
      thisBlock.style.border = '2px solid black';
    }
  };

  window.addEventListener('keydown', handlekeyDown);
}

appStart();
