const timeControls = document.querySelector('.timer__controls');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let interval;

function secondsToHourMinSec(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

function advanceCurrentTime(seconds) {
  const date = new Date(0);
  date.setSeconds(Math.floor(Date.now() / 1000) + seconds);
  return date.toLocaleTimeString().substr(0, 7);
}

function displayRemainingTime(seconds) {
  timeLeft.textContent = secondsToHourMinSec(seconds);
}

function displayEndTime(seconds) {
  endTime.textContent = `Be back at ${advanceCurrentTime(seconds)}`;
}

function displayTime(seconds) {
  displayRemainingTime(seconds);
  displayEndTime(seconds);

  interval = setInterval(function() {
    seconds--;
    if(seconds < 0) {
      clearInterval(interval);
      return;
    }
    displayRemainingTime(seconds);
  }, 1000);
}

function startTimer(seconds) {
  clearInterval(interval);
  displayTime(seconds);
}

timeControls.addEventListener('click', e => {
  const button = e.target.closest('button');
  if(button)
    startTimer(parseInt(button.dataset.time));
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = this.minutes.value;
  if(value.length !== 0)
    startTimer(parseInt(value) * 60);
  this.reset();
});
