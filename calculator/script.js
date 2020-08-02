let inputString = '';
let state = {
    // if barckets false => '(', else ')'
    brackets: false,

    // if operator true => '', else `${operator}`
    operator: true,
}
const input = document.getElementById('calculatorInput');
const body  = document.getElementById('body');

// Key reaction
const arr = ['+', '-', '*', '/', 'Enter', 'Backspace']
for (let i = 0; i < 10; i++) {
    arr[i + 6] = i + ''
}

body.addEventListener( 'keydown', function(e) { 
    let confArr = arr.filter( item => {
        return item === e.key
    })
    if ( confArr[0] === 'Enter') {
        solveProblem()
    } else if (confArr[0] === 'Backspace'){
        deleteSymb()
    } else if (confArr[0] !== undefined) {
        addSymb(confArr[0]);
    }
});

// addSymb(e.key)

const addSymb = (event) => {

    if (event === '()') {

        if (state.brackets === false) {
            inputString += '(';
            state.brackets = true;
        } else {
            inputString += ')';
            state.brackets = false;
        }

    } else if ( event === '/' || event === '*' || event === '+' || event === '-') {

        if ( state.operator === false) {
            inputString += event;
            state.operator = true;
        }

    } else {
        inputString += event;
        state.operator = false;
    }

    input.value = inputString;
};

const clearString = () => {
    inputString = '';
    input.value = inputString;
};

const solveProblem = () => {
    inputString = eval(inputString);

    input.value = inputString !== undefined ? inputString: '';
};

const deleteSymb = () => {
    inputString = inputString.slice(0, -1);
    input.value = inputString;
};

input.value = inputString;





