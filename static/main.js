const spookytype = {
    words: document.querySelectorAll(".word"),
    letters: document.querySelectorAll(".letter"),
    timerbox: document.querySelector(".timer-container"),
    counter: 0,
    started: false, 
    timerStart: 0,
    letterTimer: 0,
    wordTimer: 0,
    lastWordTimer: 0,
    wordsCompleted: 0,
    timerEnd: 30 * 1000, // milliseconds
    wpm: 0,
}

spookytype.words.forEach((el, index) => {
    el.id = "word" + index;
})

spookytype.letters.forEach((el, index) => {
    el.id = "ltr" + index; 
});

function wpmCalc() {
    if (!spookytype.letters[spookytype.counter].classList.contains("ll")) {
        return;
    } 
    spookytype.wordsCompleted++;
    spookytype.wordTimer = performance.now()
    difference = (spookytype.wordTimer - spookytype.lastWordTimer) / 1000;
    spookytype.wpm += 60 / difference;
    spookytype.lastWordTimer = spookytype.wordTimer;
    spookytype.timerbox.innerHTML = spookytype.wpm.toFixed(2);

}

function cursor() {
    spookytype.letters.forEach(el => {
        ltrid = el.id.replace("ltr", "");
        if (spookytype.counter == ltrid) {
            el.classList.add("blink");
        } else {
            el.classList.remove("blink");
        }
    }) 
}


function keyHandler(keyEvt) {
    controlKeys = ['Alt', 'Control', 'Enter', 'Meta', 'Shift', 'Tab'];
    if (controlKeys.includes(keyEvt.key)) {
        return;
    }
    if (spookytype.counter >= spookytype.letters.length) {
        return;
    }
    if (keyEvt.key == spookytype.letters[spookytype.counter].innerHTML) {
        spookytype.letters[spookytype.counter].classList.add("good");
        
    } else {
        spookytype.letters[spookytype.counter].classList.add("bad");
    } 
    // spookytype.letterTimer = performance.now();
    if (spookytype.counter == 0) {
        spookytype.started = true;
        spookytype.timerStart = performance.now();
        spookytype.lastWordTimer = performance.now();
    }
    wpmCalc();
    spookytype.counter++;
    cursor();
}


cursor();
document.addEventListener("keydown", keyHandler);
