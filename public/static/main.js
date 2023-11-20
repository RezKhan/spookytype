const stapp = {
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

stapp.words.forEach((el, index) => {
    el.id = "word" + index;
})

stapp.letters.forEach((el, index) => {
    el.id = "ltr" + index; 
    stapp.originalText[index] = el.innerHTML;
});

function wpmCalc() {
    if (!stapp.letters[stapp.counter].classList.contains("ll")) {
        return;
    } 
    stapp.wordsCompleted++;
    stapp.wordTimer = performance.now()
    currentWordTime = (stapp.wordTimer - stapp.lastWordTimer) / 1000;
    totalWordTime = (stapp.wordTimer  - stapp.timerStart) / 1000;
    stapp.wpm += totalWordTime;
    stapp.lastWordTimer = stapp.wordTimer;
    stapp.timerbox.innerHTML = (`
    <div>Raw WPM: ${(stapp.wordsCompleted / totalWordTime * 60).toFixed(2)}</div>
    <div>Real WPM: ${((stapp.wordsCompleted / totalWordTime * 60) * (stapp.correctLetters / (stapp.correctLetters + stapp.incorrectLetters))).toFixed(2)}</div>
    <div>Accuracy: ${(stapp.correctLetters / (stapp.correctLetters + stapp.incorrectLetters) * 100).toFixed(2)}%</div>
    <div>Total time: ${totalWordTime.toFixed(2)}</div>
    <div>Total words: ${stapp.wordsCompleted}</div>
    `);

}

function cursor() {
    stapp.letters.forEach(el => {
        ltrid = el.id.replace("ltr", "");
        if (stapp.counter == ltrid) {
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
    if (keyEvt.key == 'Backspace' && stapp.counter <= 0) {
        return false;
    }
    if (stapp.counter >= stapp.letters.length - 1) {
        return false;
    }
    return true;
}

function assessKeyEntry(keyEvt) {
    if (keyEvt.key == 'Backspace') {
        stapp.counter--;
        stapp.letters[stapp.counter] = stapp.originalText[stapp.counter];
        // if (stapp.letters[stapp.counter].classList.includes("bad")) {
        if (stapp.letters[stapp.counter].classList.contains("bad")) {
                stapp.letters[stapp.counter].classList.remove("bad");
            // stapp.incorrectLetters--;
        }
        // if (stapp.letters[stapp.counter].classList.includes("good")) {
        if (stapp.letters[stapp.counter].classList.contains("good")) {
                stapp.letters[stapp.counter].classList.remove("good");
            // stapp.correctLetters--;
        }
        return;
    }
    if (keyEvt.key == stapp.letters[stapp.counter].innerHTML) {
        stapp.letters[stapp.counter].classList.add("good");
        stapp.correctLetters++;
    } else {
        stapp.letters[stapp.counter].classList.add("bad");
        stapp.incorrectLetters++;
    } 
    stapp.counter++;
}

function keyHandler(keyEvt) {
    if(!happyPath(keyEvt)) {
        return;
    }
    if (stapp.counter == 0) {
        stapp.started = true;
        stapp.timerStart = performance.now();
        stapp.lastWordTimer = performance.now();
        stapp.timerbox.classList.remove("off");
        stapp.typingprompt.classList.add("off");
    }
    assessKeyEntry(keyEvt)
    wpmCalc();
    cursor();
}

cursor();

document.addEventListener("keydown", keyHandler);
document.addEventListener("click", moveToInput);
