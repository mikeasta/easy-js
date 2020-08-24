// DOM elements
let counter = document.getElementById('counter');
let cookie  = document.getElementById('cookie');

// State
let money = 0;
let counterSpeed = 1;
let clickProfit = 1;
let error = false;
// Buffs data
let passiveData = [
    {
        buff: 1,
        cost: 50,
        multiply: 0,
    },
    {
        buff: 5,
        cost: 500,
        multiply: 0
    },
    {
        buff: 15,
        cost: 15000,
        multiply: 0,
    },
    {
        buff: 50,
        cost: 500000,
        multiply: 0
    },
    {
        buff: 1000,
        cost: 10000000,
        multiply: 0
    },
    {
        buff: 5000,
        cost: 1000000000,
        multiply: 0
    },
];

let clickData = [
    {
        buff: 1,
        cost: 50,
        multiply: 0
    },
    {
        buff: 5,
        cost: 200,
        multiply: 0
    },
    {
        buff: 15,
        cost: 15000,
        multiply: 0,
    },
    {
        buff: 50,
        cost: 500000,
        multiply: 0
    },
    {
        buff: 1000,
        cost: 10000000,
        multiply: 0
    },
    {
        buff: 5000,
        cost: 1000000000,
        multiply: 0
    },
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

// PASSIVE SECTION
// Passive money earn
function passiveMoneyCounter() {
    setInterval(() => {
        money += counterSpeed;
        counter.innerHTML = money;
    }, 1000)
}

// Passive money improve
function passiveMoneyBuff(id) {
    counterSpeed += passiveData[id].buff;
    passiveData[id].cost = Math.round( passiveData[id].cost * 1.1);
    passiveData[id].multiply += 1;
}

// Passive money changing data
function passiveMoneyChangeData(item, id) {
    const buff = document.getElementById(`passive-${id}-buff`);
    const btn  = document.getElementById(`passive-${id}-btn`);
    buff.innerHTML = `+ ${item.buff}/sec`;
    btn.innerHTML = `$${item.cost}`
}

// Define every passive increasing
passiveData.forEach( (item, id) => {
    passiveMoneyChangeData(item, id);
})

// Multiply defining
function multiplyModifyPassive() {
    passiveData.forEach( (item, idx) => {
        if (item.multiply >= 1) {
            const span = document.getElementById(`passive-multiply-${idx}`);
            span.innerHTML = `x${item.multiply}`;
        }
    })
}

// Buy system (passive)
function buyPassive(item, id) {
    if (money >= item.cost) {
        money -= item.cost;
        counter.innerHTML = money;
        passiveMoneyBuff(id);
        passiveMoneyChangeData(item, id);
        multiplyModifyPassive();
        passiveData.forEach( (item, idx) => bigNums(item, idx, 'passive'));
    } else if (money <= item.cost && !error) {
        error = true;
        const p = document.createElement('p');
        p.id = 'error';
        p.innerHTML = 'Not Enough Money!'
        document.body.appendChild(p);
        setTimeout(() => {
            error = false;
            p.remove()
        }, 3000)
    }
}

// CLICK SECTION
// Click buff changing data
function clickChangeData(item, id) {
    const buff = document.getElementById(`click-${id}-buff`);
    const btn  = document.getElementById(`click-${id}-btn`);
    buff.innerHTML = `+${item.buff}/click`;
    btn.innerHTML = `$${item.cost}`;    
}

// Clicking on cookie
function cookieClick() {
    money += clickProfit;
    counter.innerHTML = money;
    clickEffect();
} 

// Define every click increasing
clickData.forEach( (item, id) => {
    clickChangeData(item, id);
})

// Click buff
function clickBuff(id) {
    clickProfit += clickData[id].buff;
    clickData[id].cost = Math.round( clickData[id].cost * 1.1);
    clickData[id].multiply += 1;
}

// Create an click effect
function clickEffect() {
    let p = document.createElement('p');
    p.innerHTML = `+${clickProfit}`;
    p.className = 'effect';
    document.body.appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 2000);
}

// Multiply modify
function multiplyModifyClick() {
    clickData.forEach( (item, idx) => {
        if (item.multiply >= 1) {
            const span = document.getElementById(`click-multiply-${idx}`);
            span.innerHTML = `x${item.multiply}`;
        }
    })
}
// buy system (click)
function buyClick(item, id) {
    if (money >= item.cost) {
        money -= item.cost;
        counter.innerHTML = money;
        clickBuff(id);
        clickChangeData(item, id);
        multiplyModifyClick();
        clickData.forEach( (item, idx) => bigNums(item, idx, 'click'));
    }
}

// Update stats
function updateStats() {
    const passiveStats = document.getElementById('passive-stats');
    const clickStats = document.getElementById('click-stats');
    clickStats.innerHTML = `Click: +${clickProfit}`;
    passiveStats.innerHTML = `Passive: +${counterSpeed}/sec`;
}

// Modify BigNums 
function bigNums(item, idx, string) {
    console.log(idx);
        const btn = document.getElementById(`${string}-${idx}-btn`)
        if (item.cost > 999999999) {
            btn.innerHTML = 
                `$${Math.floor(item.cost / 1000000000) +
                '.' + 
                String((item.cost / 1000000000 - Math.floor(item.cost / 1000000000)) * 10).slice(0, 1)}bil`;
        } else if (item.cost > 999999) {
            btn.innerHTML = 
                `$${Math.floor(item.cost / 1000000) +
                '.' + 
                String((item.cost / 1000000 - Math.floor(item.cost / 1000000)) * 10).slice(0, 1)}mil`;
        } else if (item.cost > 999) {
            btn.innerHTML = 
                `$${Math.floor(item.cost / 1000) +
                '.' + 
                String((item.cost / 1000 - Math.floor(item.cost / 1000)) * 10).slice(0, 1)}k`;
        } else {
            btn.innerHTML = `$${item.cost}`;
        }
}
clickData.forEach( (item, idx) => bigNums(item, idx, 'click'));
passiveData.forEach( (item, idx) => bigNums(item, idx, 'passive'));

// Initial callings
updateStats();
multiplyModifyPassive();
multiplyModifyClick();
passiveMoneyCounter();

