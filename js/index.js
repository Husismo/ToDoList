let mainUl = document.querySelector(`.main__ul`);
mainUl.addEventListener(`click`, (event) => {
  if (event.target.className == `checkbox`) {
    event.target.parentElement.parentElement.classList.toggle(`completed`);
  }
  if (event.target.className == `delete__btn`) {
    event.target.parentElement.remove();
  }
});

let toDoList = document.querySelector(`.main__toDolist`);
let btnClose = document.querySelector(`.toDoList__exit`);
toDoList.addEventListener(`click`, (event) => {
  if (event.target == btnClose) {
    toDoList.toggleAttribute(`hidden`);
  }
  if (event.target.className == `delete-all__btn`) {
    mainUl.innerHTML = ``;
  }
});

// handBtn.addEventListener(`click`, function () {
//   let bgVideo = document.querySelector(`.bgVideo`);
//   let handImg = document.querySelector(`.hand__img`);
//   bgVideo.toggleAttribute(`controls`);
//   if (handImg.getAttribute(`src`) == `images/handOff.jpg`) {
//     handImg.setAttribute(`src`, `images/handOn.jpg`);
//   } else {
//     handImg.setAttribute(`src`, `images/handOff.jpg`);
//   }
// });
let addBtn = document.querySelector(`.add-li__btn`);
addBtn.addEventListener(`click`, createTask);

function createTask() {
  let li = document.createElement(`LI`);
  li.classList.add(`main__li`);
  mainUl.append(li);

  let label = document.createElement(`LABEL`);
  li.append(label);

  let liInner = document.createElement(`DIV`);
  liInner.classList.add(`li__inner`);
  li.append(liInner);

  let inputCheckBox = document.createElement(`INPUT`);
  inputCheckBox.setAttribute(`type`, `checkbox`);
  inputCheckBox.classList.add(`checkbox`);
  liInner.append(inputCheckBox);

  let inputText = document.createElement(`INPUT`);
  inputText.classList.add(`input__text`);
  inputText.setAttribute(`maxlength`, `26`);
  liInner.append(inputText);
  inputText.focus();

  let img = document.createElement(`IMG`);
  img.setAttribute(`src`, `images/cross.png`);
  img.classList.add(`delete__btn`);
  li.appendChild(img);
  let maxHeight = document.documentElement.clientHeight - 67;
  if (toDoList.offsetHeight > maxHeight){
    toDoList.setAttribute(`style`, `overflow-y: scroll; max-height: ${maxHeight}px;`)
  }
}

let volumeRange = document.querySelector(`.volume`);
volumeRange.addEventListener(`click`, volume);
function volume() {
  let bgVideo = document.querySelector(`.bgVideo`);
  let volumeImg = document.querySelector(`.volume__img`);
  v = this.value;
  bgVideo.volume = v / 100;
  console.log(v)
  if (v == 0){
    volumeImg.setAttribute(`src`, `images/volumeOff.jpg`);
  }
  else {
    volumeImg.setAttribute(`src`, `images/volumeOn.png`);
  }

}

let btnPlay = document.querySelector(`.login__btn`);
btnPlay.addEventListener(`click`, videoPlay);

function videoPlay() {
  let bgVideo = document.querySelector(`.bgVideo`);
  let loginConfirm = document.querySelector(`.login-confirm`);
  loginConfirm.style.display = `none`
  bgVideo.play();
  let v = 0;
  bgVideo.volume = v;
}

let headerUL = document.querySelector(`.header__ul`);
headerUL.addEventListener(`click`, headerClick)

function headerClick (event) {
  let toDoBtn = headerUL.querySelector(`.toDo__Btn`);
  let fullScreenBtn = headerUL.querySelector(`.fullscreen__Btn`);
  let TimerBtn = headerUL.querySelector(`.timer__Btn`);
  let sendVideoBtn = headerUL.querySelector(`.sendVideo__Btn`);
  if (event.target == toDoBtn){
    toDoList.toggleAttribute(`hidden`);
  } else if (event.target == fullScreenBtn){
    let header = document.querySelector(`.header`)
    if (document.fullscreenElement) {
      document.exitFullscreen();
      header.style.padding = `20px 0px 20px 0px`;

     } else {
      document.documentElement.requestFullscreen();
      header.style.padding = `5px 0px 5px 0px`;
     }
  } else if (event.target == TimerBtn){
    let timerWrapper = document.querySelector(`.timer__wrapper`);
    timerWrapper.toggleAttribute(`hidden`)
  } else if (event.target == sendVideoBtn){
    let ownVideoWrapper = document.querySelector(`.your-own-video`);
    ownVideoWrapper.style.display = `flex`
  }
}

let ownWrapper = document.querySelector(`.your-own-video`);
ownWrapper.addEventListener(`click`, function (event) {
  let closeOwn = document.querySelector(`.closeOwn`);
  let submitLinkBtn = document.querySelector(`.submitLinkBtn`)
    if (event.target == closeOwn){
      ownWrapper.style.display = `none`
    } else if (event.target == submitLinkBtn){
      ownWrapper.style.display = `none`
      let sendedForm = document.querySelector(`.sendedForm`);
      sendedForm.style.display = `flex`;
      sendFormInterval = setTimeout(() => {
        sendedForm.style.display = `none`;
      }, 3000);

    }
})

let timeInterval;
let currentTime = 30;
let display = document.querySelector('.timer-display');
let minutesInput = document.querySelector('.minutes-input');
let secondsInput = document.querySelector('.seconds-input');
let startButton = document.querySelector('.start-button');
let pauseResumeButton = document.querySelector('.pause-resume-button');
let resetButton = document.querySelector('.reset-button');
let timerSettingBtn = document.querySelector(`.timer__settings-btn`);

timerSettingBtn.addEventListener(`click`, function(){
  let timerSettings = document.querySelector(`.timer__settings`);
  timerSettings.toggleAttribute(`hidden`)
})


function updateDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  display.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimer() {
  currentTime = parseInt(minutesInput.value * 60) + parseInt(secondsInput.value);
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  startButton.disabled = true;
  pauseResumeButton.disabled = false;
  resetButton.disabled = false;
  timeInterval = setInterval(() => {
    currentTime--;
    updateDisplay();
    if (currentTime <= 0) {
      clearInterval(timeInterval);
      pauseResumeButton.disabled = true;
    }
  }, 1000);
}

function pauseResumeTimer() {
  if (pauseResumeButton.textContent === 'Pause') {
    clearInterval(timeInterval);
    pauseResumeButton.textContent = 'Resume';
  } else if (pauseResumeButton.textContent === 'Resume') {
    timeInterval = setInterval(() => {
      currentTime--;
      updateDisplay();
      if (currentTime <= 0) {
        clearInterval(timeInterval);
        pauseResumeButton.disabled = true;
      }
    }, 1000);
    pauseResumeButton.textContent = 'Pause';
  }
}

function resetTimer() {
  clearInterval(timeInterval);
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  startButton.disabled = false;
  pauseResumeButton.disabled = true;
  pauseResumeButton.textContent = 'Pause';
  resetButton.disabled = true;
  minutesInput.value = '0';
  secondsInput.value = '0';
  currentTime = 0;
  updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseResumeButton.addEventListener('click', pauseResumeTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();




