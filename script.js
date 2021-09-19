const pianoKeys = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');
const audio = document.querySelector('audio');
const fullScreen = document.querySelector('.fullscreen');
const btnLetter = document.querySelector('.btn-letters');
const btnNote = document.querySelector('.btn-notes');

const onKeyboard = (e) => {
    const key = document.querySelector(`.piano-key[data-letter='${e.code.slice(-1)}']`);
    const audio = document.querySelector(`audio[data-letter='${e.code.slice(-1)}']`);
    if (key.classList.contains('piano-key-active', 'piano-key-active-pseudo')) return;
    if (e.repeat) return;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('piano-key-active', 'piano-key-active-pseudo');
};

const offKeyboard = (e) => {
    const key = document.querySelector(`.piano-key[data-letter='${e.code.slice(-1)}']`);
    if (!key) return;
    key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
};

window.addEventListener('keydown', onKeyboard);
window.addEventListener('keyup', offKeyboard);

const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

const startSound = (e) => {
    e.target.classList.add('piano-key-active', 'piano-key-active-pseudo', 'delete-double-play');
    const note = e.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
};

const stopSound = (e) => {
    e.target.classList.remove('piano-key-active', 'piano-key-active-pseudo', 'delete-double-play');
};

const startCorrespondOver = (e) => {
    e.target.classList.add('piano-key-active', 'piano-key-active-pseudo', 'delete-double-play');
    const note = e.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    pianoKeys.forEach((key) => {
        key.addEventListener('mouseover', startSound);
        key.addEventListener('mouseout', stopSound);
    });
};

const stopCorrespondOver = (e) => {
    pianoKeys.forEach((key) => {
        e.target.classList.remove(
            'piano-key-active',
            'piano-key-active-pseudo',
            'delete-double-play',
        );
        key.removeEventListener('mouseover', startSound);
        key.removeEventListener('mouseout', stopSound);
    });
};

piano.addEventListener('mousedown', startCorrespondOver);
document.addEventListener('mouseup', stopCorrespondOver);

fullScreen.addEventListener('click', () => {
    document.fullscreenElement === null
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen();
});

btnLetter.addEventListener('click', (e) => {
    e.target.classList.add('btn-active');
    pianoKeys.forEach((key) => key.classList.add('piano-key-letter'));
    btnNote.classList.remove('btn-active');
});

btnNote.addEventListener('click', (e) => {
    e.target.classList.add('btn-active');
    pianoKeys.forEach((key) => key.classList.remove('piano-key-letter'));
    btnLetter.classList.remove('btn-active');
});
