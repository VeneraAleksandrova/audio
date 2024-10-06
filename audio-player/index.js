const title = document.querySelector(".music-player h1");
const name = document.querySelector(".song__name");
const audio = document.querySelector("#song");
const playBtn = document.querySelector(".play-pause-btn");
const controlIcon = document.querySelector("#controlIcon");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");
const progress = document.querySelector("#progress");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const image = document.querySelector(".slide img");
const songs = [
  {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source: "./music/Clean-Bandit-Symphony.mp3",
    img: "./img/1.jpg",
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source: "./music/Pawn-It-All.mp3",
    img: "./img/2.JPG",
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source: "./music/Madrigal-Seni-Dert-Etmeler.mp3",
    img: "./img/3.JPG",
  },
  {
    title: "Instant Crush",
    name: "Daft Punk ft. Julian Casablancas",
    source: "./music/Daft-Punk-Instant-Crush.mp3",
    img: "./img/4.JPG",
  },
  {
    title: "As It Was",
    name: "Harry Styles",
    source: "./music/Harry-Styles-As-It-Was.mp3",
    img: "./img/5.JPG",
  },

  {
    title: "Physical",
    name: "Dua Lipa",
    source: "./music/Dua-Lipa-Physical.mp3",
    img: "./img/6.JPG",
  },
  {
    title: "Delicate",
    name: "Taylor Swift",
    source: "./music/Taylor-Swift-Delicate.mp3",
    img: "./img/7.JPG",
  },
];

let indexOfSong = 0;
let isPlaying = false;
let updateTimer;

function loadSong(index) {
  clearInterval(updateTimer);
  resetValues();
  audio.src = songs[index].source;
  audio.load();
  name.textContent = songs[index].name;
  title.textContent = songs[index].title;
  image.src = songs[index].img;
  updateTimer = setInterval(seekUpdate, 1000);
  audio.addEventListener("ended", nextSong);
}
function resetValues() {
  currentTime.textContent = "00:00";
  //duration.textContent = "00:00";
  progress.value = 0;
}

function playPauseSong() {
  if (!isPlaying) playSong();
  else pauseSong();
}

function playSong() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;

    controlIcon.classList.remove("fa-play");
    controlIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    isPlaying = false;
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
  }
}
function playNotCurrentSong() {
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
}
function nextSong() {
  if (indexOfSong < songs.length - 1) indexOfSong += 1;
  else indexOfSong = 0;
  loadSong(indexOfSong);
  playNotCurrentSong();
}

function prevSong() {
  if (indexOfSong > 0) indexOfSong -= 1;
  else indexOfSong = songs.length - 1;
  loadSong(indexOfSong);
  playNotCurrentSong();
}

loadSong(indexOfSong);
function changeDuration() {
  if (!isNaN(audio.duration)) {
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
    durationSeconds =
      durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    durationMinutes =
      durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes;
    duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
function seekUpdate() {
  if (!isNaN(audio.duration)) {
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);

    currentSeconds =
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    currentMinutes =
      currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    currentTime.textContent = currentMinutes + ":" + currentSeconds;
  }
}

playBtn.addEventListener("click", playSong);
backward.addEventListener("click", () => prevSong());
forward.addEventListener("click", () => nextSong());
audio.addEventListener("loadedmetadata", function () {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
  changeDuration();
});
audio.addEventListener("timeupdate", function () {
  if (!audio.paused) {
    progress.value = audio.currentTime;
  }
});
progress.addEventListener("input", () => (audio.currentTime = progress.value));
