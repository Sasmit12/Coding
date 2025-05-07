// Improved and cleaned up JavaScript for Spotify Clone

console.log("Welcome to Spotify Clone");

let songIndex = 0;
let songs = [
    { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
];

let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

const updatePlayPauseIcons = (index) => {
    makeAllPlays();
    const currentPlayButton = document.getElementById(index);
    if (currentPlayButton) {
        currentPlayButton.classList.remove("fa-play-circle");
        currentPlayButton.classList.add("fa-pause-circle");
    }
};

const makeAllPlays = () => {
    document.querySelectorAll(".songItemPlay").forEach(el => {
        el.classList.remove("fa-pause-circle");
        el.classList.add("fa-play-circle");
    });
};

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
        gif.style.opacity = 1;
        updatePlayPauseIcons(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.addEventListener("click", (e) => {
        songIndex = parseInt(e.target.id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
        updatePlayPauseIcons(songIndex);
    });
});

document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    updatePlayPauseIcons(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    updatePlayPauseIcons(songIndex);
});

audioElement.addEventListener("ended", () => {
    masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
    document.getElementById("next").click();
});