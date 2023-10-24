counter = 0;
spans = document.querySelectorAll(".letter");
// console.log(spans)

spans.forEach((el, index) => {
    el.id = index; 
});

function keyHandler(keyEvt) {
    controlKeys = ['Alt', 'Control', 'Enter', 'Meta', 'Shift', ' ', 'Tab']
    if (controlKeys.includes(keyEvt.key)) {
        return;
    }
    if (keyEvt.key == spans[counter].innerHTML) {
        spans[counter].classList.add("good");
        console.log(spans[counter], "GOOD")
    } else {
        spans[counter].classList.add("bad");
        console.log(spans[counter],"BAD")
    }
    counter++;
}

// TODO: Add some way to simulate a cursor
function cursor() {

}


document.addEventListener("keydown", keyHandler);
