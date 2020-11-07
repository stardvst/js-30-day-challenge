(function() {
  'use strict';

  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');

  const toggleButton = document.querySelector('.toggle');
  const progressBar = document.querySelector('.progress');
  const progressBarFilled = document.querySelector('.progress__filled');

  function togglePlay(e) {
    if(video.paused) {
      video.play();
      toggleButton.textContent = '❚❚';
    } else {
      video.pause();
      toggleButton.textContent = '▶';
    }
  }

  function updateVideoProgress(e) {
    video.currentTime = video.duration * e.offsetX / progressBar.clientWidth;
  }

  function makeFullScreen() {
    if(video.requestFullscreen) {
      video.requestFullscreen();
    } else if(video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if(video.msRequestFullScreen) {
      video.msRequestFullScreen();
    }
  }

  player.addEventListener('click', e => {
    if(e.target.closest('.toggle') || e.target.closest('.viewer')) {
      togglePlay();
    } else if(e.target.closest('.progress')) {
      updateVideoProgress(e);
    } else if(e.target.closest('.fullscreen')) {
      makeFullScreen();
    } else {
      const skipButton = e.target.closest('[data-skip]');
      if(skipButton) {
        video.currentTime += Number(skipButton.dataset.skip);
      }
    }
  }, false);

  player.addEventListener('input', e => {
    const rangeSlider = e.target.closest('.player__slider');
    if(!rangeSlider) return;
    video[rangeSlider.name] = rangeSlider.value;
  }, false);

  video.addEventListener('timeupdate', () => {
    progressBarFilled.style.flexBasis = `${video.currentTime * 1.0 / video.duration * 100}%`;
  }, false);

  progressBar.addEventListener('mouseup', e => {
    updateVideoProgress(e);
  }, false);
})();
