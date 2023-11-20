const spookytype = {
    words: document.querySelectorAll(".word"),
    letters: document.querySelectorAll(".letter"),
    timerbox: document.querySelector(".timer-container"),
    typingprompt: document.querySelector(".typing-prompt"),
    originalText: [],
    counter: 0,
    started: false, 
    timerStart: 0,
    wordTimer: 0,
    lastWordTimer: 0,
    wordsCompleted: 0,
    incorrectLetters: 0, 
    correctLetters: 0,
    timerEnd: 60 * 1000, // milliseconds
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
    totalWordTime = (spookytype.wordTimer  - spookytype.timerStart) / 1000;
    spookytype.wpm += totalWordTime;
    spookytype.lastWordTimer = spookytype.wordTimer;
    spookytype.timerbox.innerHTML = (`Raw WPM: ${(spookytype.wordsCompleted / totalWordTime * 60).toFixed(2)} <br>
    Real WPM: ${((spookytype.wordsCompleted / totalWordTime * 60) * (spookytype.correctLetters / (spookytype.correctLetters + spookytype.incorrectLetters))).toFixed(2)} <br>
    Accuracy: ${(spookytype.correctLetters / (spookytype.correctLetters + spookytype.incorrectLetters) * 100).toFixed(2)}%<BR>
    Total time: ${totalWordTime.toFixed(2)} <br>
    Total words: ${spookytype.wordsCompleted}<br>`);

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
        if (spookytype.letters[spookytype.counter].classList.includes("bad")) {
            spookytype.letters[spookytype.counter].classList.remove("bad");
            // spookytype.incorrectLetters--;
        }
        if (spookytype.letters[spookytype.counter].classList.includes("good")) {
            spookytype.letters[spookytype.counter].classList.remove("good");
            // spookytype.correctLetters--;
        }
        return;
    }
    if (keyEvt.key == spookytype.letters[spookytype.counter].innerHTML) {
        spookytype.letters[spookytype.counter].classList.add("good");
        spookytype.correctLetters++;
    } else {
        spookytype.letters[spookytype.counter].classList.add("bad");
        spookytype.incorrectLetters++;
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
        spookytype.typingprompt.classList.add("off");
    }
    assessKeyEntry(keyEvt)
    wpmCalc();
    cursor();
}

cursor();

document.addEventListener("keydown", keyHandler);
document.addEventListener("click", moveToInput);
