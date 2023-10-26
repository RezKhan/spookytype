const spookytype = {
    words: document.querySelectorAll(".word"),
    letters: document.querySelectorAll(".letter"),
    timerbox: document.querySelector(".timer-container"),
    counter: 0,
    started: false, 
    timerStart: 0,
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
    currentWordTime = (spookytype.wordTimer - spookytype.lastWordTimer) / 1000;
    totalWordTime = (spookytype.wordTimer - spookytype.timerStart) / 1000;
    spookytype.wpm += totalWordTime;
    spookytype.lastWordTimer = spookytype.wordTimer;
    spookytype.timerbox.innerHTML = ("Total time: " + totalWordTime.toFixed(2) + " Total words: " + spookytype.wordsCompleted + " WPM: " +  (spookytype.wordsCompleted / totalWordTime * 60).toFixed(2) + " Last word: " + currentWordTime);

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

function moveToInput() {
    inp = document.querySelector(".wordinput")
    inp.focus();
}

function happyPath(keyEvt) {
    controlKeys = ['Alt', 'Control', 'Enter', 'Meta', 'Shift', 'Tab'];
    if (controlKeys.includes(keyEvt.key)) {
        return false;
    }
    if (keyEvt.key == 'Backspace' && spookytype.counter == 0) {
        return false;
    }
    if (spookytype.counter >= spookytype.letters.length) {
        return false;
    }
}

function assessKeyEntry(keyEvt) {
    if (keyEvt.key == spookytype.letters[spookytype.counter].innerHTML) {
        spookytype.letters[spookytype.counter].classList.add("good");
        
    } else {
        spookytype.letters[spookytype.counter].classList.add("bad");
    } 
    spookytype.counter++;
}

function keyHandler(keyEvt) {
    if(!happyPath) {
        return;
    }
    assessKeyEntry(keyEvt)
    if (spookytype.counter == 0) {
        spookytype.started = true;
        spookytype.timerStart = performance.now();
        spookytype.lastWordTimer = performance.now();
    }
    wpmCalc();
    cursor();
}

cursor();



document.addEventListener("keydown", keyHandler);
document.addEventListener("click", moveToInput);
