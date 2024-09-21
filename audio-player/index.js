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
const songs = [
  {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source: "./music/Clean-Bandit-Symphony.mp3",
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source: "./music/Pawn-It-All.mp3",
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source: "./music/Madrigal-Seni-Dert-Etmeler.mp3",
  },
  {
    title: "Instant Crush",
    name: "Daft Punk ft. Julian Casablancas",
    source: "./music/Daft-Punk-Instant-Crush.mp3",
  },
  {
    title: "As It Was",
    name: "Harry Styles",
    source: "./music/Harry-Styles-As-It-Was.mp3",
  },

  {
    title: "Physical",
    name: "Dua Lipa",
    source: "./music/Dua-Lipa-Physical.mp3",
  },
  {
    title: "Delicate",
    name: "Taylor Swift",
    source: "./music/Taylor-Swift-Delicate.mp3",
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
  updateTimer = setInterval(seekUpdate, 1000);
  audio.addEventListener("ended", nextSong);
}
function resetValues() {
  currentTime.textContent = "00:00";
  duration.textContent = "00:00";
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

function nextSong() {
  if (indexOfSong < songs.length - 1) indexOfSong += 1;
  else indexOfSong = 0;
  isPlaying = false;
  loadSong(indexOfSong);
  playSong();
}

function prevSong() {
  if (indexOfSong > 0) indexOfSong -= 1;
  else indexOfSong = songs.length - 1;
  isPlaying = false;
  loadSong(indexOfSong);
  playSong();
}

loadSong(indexOfSong);

function seekUpdate() {
  if (!isNaN(audio.duration)) {
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    currentSeconds =
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    durationSeconds =
      durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    currentMinutes =
      currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    durationMinutes =
      durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes;

    // Display the updated duration
    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

playBtn.addEventListener("click", playSong);
backward.addEventListener("click", () => prevSong());
forward.addEventListener("click", () => nextSong());
audio.addEventListener("loadedmetadata", function () {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});
audio.addEventListener("timeupdate", function () {
  if (!audio.paused) {
    progress.value = audio.currentTime;
  }
});
progress.addEventListener("input", () => (audio.currentTime = progress.value));
