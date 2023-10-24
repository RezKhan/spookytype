counter = 0;
spans = document.querySelectorAll(".letter");
// console.log(spans)

spans.forEach((el, index) => {
    el.id = index; 
});

function cursor() {
    spans.forEach(el => {
        if (counter == el.id) {
            el.classList.add("blink")
        } else {
            el.classList.remove("blink")
        }
    }) 
}


function keyHandler(keyEvt) {
    controlKeys = ['Alt', 'Control', 'Enter', 'Meta', 'Shift', ' ', 'Tab']
    if (controlKeys.includes(keyEvt.key)) {
        return;
    }
    if (keyEvt.key == spans[counter].innerHTML) {
        spans[counter].classList.add("good");
        // console.log(spans[counter], "GOOD")
    } else {
        spans[counter].classList.add("bad");
        // console.log(spans[counter],"BAD")
    }
    counter++;
    cursor();
}

cursor();

document.addEventListener("keydown", keyHandler);
