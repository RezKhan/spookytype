const spookytype = {
    words: document.querySelectorAll(".word"),
    letters: document.querySelectorAll(".letter"),
    timerbox: document.querySelector(".timer-container"),
    originalText: [],
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
    spookytype.originalText[index] = el.innerHTML;
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
    spookytype.timerbox.innerHTML = (" WPM: " +  (spookytype.wordsCompleted / totalWordTime * 60).toFixed(2) + " | Last word: " + currentWordTime + " | Total time: " + totalWordTime.toFixed(2) + " | Total words: " + spookytype.wordsCompleted);

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
    if (keyEvt.key == 'Backspace' && spookytype.counter <= 0) {
        return false;
    }
    if (spookytype.counter >= spookytype.letters.length - 1) {
        return false;
    }
    return true;
}

function assessKeyEntry(keyEvt) {
    if (keyEvt.key == 'Backspace') {
        spookytype.counter--;
        spookytype.letters[spookytype.counter] = spookytype.originalText[spookytype.counter];
        spookytype.letters[spookytype.counter].classList.remove("bad");
        spookytype.letters[spookytype.counter].classList.remove("good");
        return;
    }
    if (keyEvt.key == spookytype.letters[spookytype.counter].innerHTML) {
        spookytype.letters[spookytype.counter].classList.add("good");
        
    } else {
        spookytype.letters[spookytype.counter].classList.add("bad");
    } 
    spookytype.counter++;
}

function keyHandler(keyEvt) {
    if(!happyPath(keyEvt)) {
        return;
    }
    if (spookytype.counter == 0) {
        spookytype.started = true;
        spookytype.timerStart = performance.now();
        spookytype.lastWordTimer = performance.now();
        spookytype.timerbox.classList.remove("off");
    }
    assessKeyEntry(keyEvt)
    wpmCalc();
    cursor();
}

cursor();

document.addEventListener("keydown", keyHandler);
document.addEventListener("click", moveToInput);
