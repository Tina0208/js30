const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay(){
    const method = video.paused? 'play' : 'pause'
    video[method]()
}

function updateButton(){
    const icon = video.paused? '►' : '❚ ❚';
    toggle.textContent = icon
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
   }

video.addEventListener('click',togglePlay)

video.addEventListener('play',updateButton)
video.addEventListener('paused',updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click',togglePlay)

ranges.forEach((v,i)=>{
    v.addEventListener('change',function(){
        video[this.name] = [this.value]
    })
})

ranges.forEach((v,i)=>{
    v.addEventListener('mousemove',function(){
        video[this.name] = [this.value]
    })
})

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
