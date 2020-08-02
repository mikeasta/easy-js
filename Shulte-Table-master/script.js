// Initial alert
alert('Welcome \n =====> Tap "⟳" or "Enter" to generate new table <===== \n =====> Tap "▷/ ||" or "Space" to start/stop timer <=====');

// App state 
let state = {
    time: 0,
    timer: 0,
    stopped: true
}

// Getting DOM-elements
const replay    = document.getElementById('replay');
const timer     = document.getElementById('timer');
const startBtn  = document.getElementById('start');

// Add event listeners
replay.addEventListener('click', tilesFulling);
startBtn.addEventListener('click', startTimer);
document.addEventListener('keypress', (event) => {
    console.log(event.key)
    switch (event.key) {
        case " ":
            if (state.stopped) {
                startTimer(); 
            } else {
                stopTimer();
            }; break;

        case "Enter":
            tilesFulling(); break;

        
    }
})


function tilesFulling() {
    // Defining variables
    const field = document.getElementById('field');
    const tilesArray = field.children;
    let numArray = [];

    // Filling 25-element num array
    for (let i = 1; i <=25; i++) {
        numArray.push(i);
    }

    // Filling tiles with nums (randomly)
    for (let i = 0; i < 25; i++) {
        let clone = numArray.map(i => i);
        let length = (numArray.length - 1);
        let idx = Math.round(Math.random() * length);
        let num = numArray[idx];
        tilesArray[i].innerHTML = num;
        numArray = [...numArray.splice(0, idx), ...clone.splice(idx + 1)];
    }


    state.time = 0;
    timer.innerText = '0.00';
    clearInterval(state.timer);
} 

tilesFulling();  

function startTimer () {
    state.timer = setInterval(() => {
        state.time += 1;
        timer.innerText = state.time / 100
    },10);
    state.stopped = false;  
    startBtn.innerHTML = '||';
}

function stopTimer() {
    clearInterval(state.timer);
    state.timer = false;
    state.stopped = true;
    startBtn.innerHTML = '▷';
}


