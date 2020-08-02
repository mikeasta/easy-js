// State
const state = {
    opponentChoise:     undefined,
    personChoise:       undefined,
};

// Items
const items = [
    "🖤Rock",
    "✂Scissors",
    "✉Paper"
]

// Getting DOM
const opponentIfChoose      = document.getElementById("opponentIfChoose");
const opponentIfChoosed     = document.getElementById("opponentIfChoosed");
const opponentOnShow        = document.getElementById("opponentOnShow");
const playerIfChoose        = document.getElementById("playerIfChoose");
const playerIfChoosed       = document.getElementById("playerIfChoosed");
const playerChoise          = document.getElementById('playerChoise');
const result                = document.getElementById("result");
const opponentChoiseButton  = document.getElementById("opponentChoiseButton") 
let opponentTimeout;

function start() {
    clearTimeout(opponentTimeout);
    opponentIfChoose.className  = "enable";
    opponentIfChoosed.className = "unable";
    opponentOnShow.className    = "unable";
    playerIfChoose.className    = "enable";
    playerIfChoosed.className   = "unable";

    state.opponentChoise      = undefined;
    state.personChoise        = undefined;

    opponentStart();
}

function rulling(opponent, player) {
    console.log(opponent, player);
    opponentIfChoosed.className     = "unable";    
    opponentOnShow.className        = "enable"; 
    opponentChoiseButton.innerHTML  = opponent;
    if ( 
        opponent === "🖤Rock"     && player === "✂Scissors"  || 
        opponent === "✂Scissors"  && player === "✉Paper"  ||
        opponent === "✉Paper"     && player === "🖤Rock"
    ) { 
        result.innerHTML = "You lost";
    } else if ( opponent === player) {
        result.innerHTML = "Draw";
    } else {
        result.innerHTML = "You won";
    }

}

function checkState() {
    state.opponentChoise != undefined && state.personChoise != undefined ? rulling(state.opponentChoise, state.personChoise): null;
}


function opponentStart() {
    opponentTimeout = setTimeout( () => {
        state.opponentChoise = items[Math.round(Math.random() * 2)];     
        opponentIfChoose.className  = "unable";
        opponentIfChoosed.className = "enable";
        checkState();
        console.log(state.opponentChoise);
    }, 10000 * Math.random())
}


function playerChoose(item) {
    state.personChoise = item;
    playerIfChoose.className    = "unable";
    playerIfChoosed.className   = "enable";
    playerChoise.innerHTML      = item;
    checkState();
}
start();
