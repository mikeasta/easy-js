let counter = document.getElementById('counter');
let cookie  = document.getElementById('cookie');
let money = 0;
let counterSpeed = 1;
let clickProfit = 1;
let timer;
let passiveData = [
    {
        buff: 1,
        cost: 50
    },
    {
        buff: 5,
        cost: 500
    }
];

let clickData = [
    {
        buff: 1,
        cost: 50,
    },
    {
        buff: 5,
        cost: 200,
    }
]


// Event listeners
cookie.addEventListener('click', cookieClick);

passiveData.forEach( (item, id) => {
    const button = document.getElementById(`passive-${id}-btn`);
    button.addEventListener('click', () => {
        buyPassive(item, id);
        updateStats();
    });
});

clickData.forEach( (item, id) => {
    const button = document.getElementById(`click-${id}-btn`);
    button.addEventListener('click', () => {
        buyClick(item, id);
        updateStats();
    });
});


// Passive money earn
function passiveMoneyCounter() {
    timer = setInterval(() => {
        money += counterSpeed;
        counter.innerHTML = money;
    }, 1000)
}

// Passive money improve
function passiveMoneyBuff(id) {
    counterSpeed += passiveData[id].buff;
    passiveData[id].cost = Math.round( passiveData[id].cost * 1.1);
}

// Passive money changing data
function passiveMoneyChangeData(item, id) {
    const buff = document.getElementById(`passive-${id}-buff`);
    const btn  = document.getElementById(`passive-${id}-btn`);
    buff.innerHTML = `+ ${item.buff}/sec`;
    btn.innerHTML = `$${item.cost}`
}

// Click buff changing data
function clickChangeData(item, id) {
    const buff = document.getElementById(`click-${id}-buff`);
    const btn  = document.getElementById(`click-${id}-btn`);
    buff.innerHTML = `+${item.buff}`;
    btn.innerHTML = `$${item.cost}`
}


// Clicking on cookie
function cookieClick() {
    money += clickProfit;
    counter.innerHTML = money;
    clickEffect();
} 

// Define every passive increasing
passiveData.forEach( (item, id) => {
    passiveMoneyChangeData(item, id);
})

// Define every click increasing
clickData.forEach( (item, id) => {
    clickChangeData(item, id);
})

// Buy system
function buyPassive(item, id) {
    if (money >= item.cost) {
        money -= item.cost;
        counter.innerHTML = money;
        passiveMoneyBuff(id);
        passiveMoneyChangeData(item, id);
    }
}

function buyClick(item, id) {
    if (money >= item.cost) {
        console.log('Hello')
        money -= item.cost;
        counter.innerHTML = money;
        clickBuff(id);
        clickChangeData(item, id);
    }
}

// Update stats
function updateStats() {
    const passiveStats = document.getElementById('passive-stats');
    const clickStats = document.getElementById('click-stats');
    clickStats.innerHTML = `Click: +${clickProfit}`;
    passiveStats.innerHTML = `Passive: +${counterSpeed}/sec`;
}

// Click buff
function clickBuff(id) {
    clickProfit += clickData[id].buff;
    clickData[id].cost = Math.round( clickData[id].cost * 1.1);
}

// Create an click effect
function clickEffect() {
    let p = document.createElement('p');
    p.innerHTML = `+${clickProfit}`;
    p.className = 'effect';
    let body = document.getElementsByTagName('body');
    document.body.appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 2000);
}

updateStats();
passiveMoneyCounter();