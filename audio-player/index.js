const title = document.querySelector('.music-player h1');
const name = document.querySelector('.song__name');
const audio = document.querySelector('#song');
const playBtn = document.querySelector('.play-pause-btn');
const controlIcon = document.querySelector('#controlIcon');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const songs = [
  {
    title: 'Symphony',
    name: 'Clean Bandit ft. Zara Larsson',
    source: './music/Clean-Bandit-Symphony.mp3',
  },
  {
    title: 'Pawn It All',
    name: 'Alicia Keys',
    source: './music/Pawn-It-All.mp3',
  },
  {
    title: 'Seni Dert Etmeler',
    name: 'Madrigal',
    source: './music/Madrigal-Seni-Dert-Etmeler.mp3',
  },
  {
    title: 'Instant Crush',
    name: 'Daft Punk ft. Julian Casablancas',
    source: './music/Daft-Punk-Instant-Crush.mp3',
  },
  {
    title: 'As It Was',
    name: 'Harry Styles',
    source: './music/Harry-Styles-As-It-Was.mp3',
  },

  {
    title: 'Physical',
    name: 'Dua Lipa',
    source: './music/Dua-Lipa-Physical.mp3',
  },
  {
    title: 'Delicate',
    name: 'Taylor Swift',
    source: './music/Taylor-Swift-Delicate.mp3',
  },
];

let indexOfSong = 0;

//Отображение названия текущего трека
function loadSong(index) {
  title.textContent = songs[index].title;
  name.textContent = songs[index].name;
  audio.src = songs[index].source;
}

loadSong(indexOfSong);

//Включение и отключение трека трека
let play = false;
function playCurrentSong() {
  if (!play) {
    play = true;
    audio.play();
    controlIcon.classList.remove('fa-play');
    controlIcon.classList.add('fa-pause');
  } else {
    play = false;
    audio.pause();
    controlIcon.classList.remove('fa-pause');
    controlIcon.classList.add('fa-play');
  }
}
function playNotCurrentSong(index) {
  indexOfSong =
    index < 0 ? songs.length - 1 : index > songs.length - 1 ? 0 : index;
  loadSong(indexOfSong);
  play = true;
  audio.play();
  controlIcon.classList.remove('fa-play');
  controlIcon.classList.add('fa-pause');
}

function pauseSong() {
  audio.pause();
}

playBtn.addEventListener('click', playCurrentSong);
backward.addEventListener('click', () => playNotCurrentSong(indexOfSong - 1));
forward.addEventListener('click', () => playNotCurrentSong(indexOfSong + 1));
