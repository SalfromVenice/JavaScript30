// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector('.fullscreen');

// build func
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

function skip() {
  const skipping = parseFloat(this.dataset.skip);
  video.currentTime += skipping;
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgess() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

function goFull() {
  // chrome
  if (video.requestFullscreen) {
    video.requestFullscreen();
  // safari
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
};

// hook event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgess);

toggle.addEventListener('click', togglePlay);

skipButton.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

full.addEventListener('click', goFull);
