var audio = new Audio("music/Boli.mp3");
var index = 0;
var arr = ["Boli", "ItzAHustle", "AddiSunni"];

function setSong(i) {
    audio.pause();
    audio = new Audio(`music/${arr[i]}.mp3`);
    songName.textContent = `${arr[i]}-Karan Aujla`
    getTime();
    if (playBtn.classList.contains('play')) {
        audio.play();
    }
}


const playBtn = document.getElementById('play');
const imgAni = document.getElementById('songimg');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const songName = document.getElementById('songName');
const c_dur = document.getElementById('c-dur');
const t_dur = document.getElementById('t-dur');
const pgress_bar = document.getElementById('pgress');
const pgress_div = document.getElementById('pgress_div');
const gif = document.getElementById('gif');



function animate() {
    if (imgAni) {
        imgAni.classList.add('anime');
    }
}


function Removeanimate() {
    if (imgAni) {
        imgAni.classList.remove('anime');
    }
}


playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('play')) {
        audio.pause();
        Removeanimate();
        gif.style.display = 'none';
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        playBtn.title = 'Play';


    } else {
        audio.play();
        animate();
        getTime();
        gif.style.display = 'block';
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        playBtn.title = 'Pause';


    }
})

function nextSong() {
    index = (index + 1) % arr.length;
    setSong(index);
}

function prevSong() {
    index = (index - 1) >= 0 ? (index - 1) : (index - 1) + (arr.length - 1);
    setSong(index);
}
pgress_div.addEventListener('click', (e) => {
    const { duration } = audio;
    let movePgress = (e.offsetX / e.target.clientWidth) * duration
    audio.currentTime = movePgress
})
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
audio.addEventListener('ended', nextSong)
audio.addEventListener("loadedmetadata", () => {
    c_dur.textContent = '0:0';
    let dur = audio.duration;
    t_dur.textContent = Math.floor(dur / 60) + ":" + Math.floor(dur % 60);
})


function getTime() {
    audio.addEventListener("loadedmetadata", () => {
        c_dur.textContent = '0:0';
        let dur = audio.duration;
        t_dur.textContent = Math.floor(dur / 60) + ":" + Math.floor(dur % 60);
    })
    audio.addEventListener('timeupdate', (e) => {
        const { currentTime, duration } = e.target;
        let p_bar = (currentTime / duration) * 100;
        pgress_bar.value = p_bar;
        c_dur.textContent = Math.floor(currentTime / 60) + ":" + Math.floor(currentTime % 60);
        t_dur.textContent = Math.floor(duration / 60) + ":" + Math.floor(duration % 60);


    })
    audio.addEventListener('ended', nextSong)
}