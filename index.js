"use strict";

const map = {
    0: "🥐",
    1: "🎺",
    2: "🥔",
    3: "🔩",
    4: "🥚",
    5: "🧬",
    6: "🪣",
    7: "🗿",
    8: "🌽",
    9: "🎳",
    10: "🧱",
    11: "🐌",
    12: "🐙",
    13: "🦷"
};

const base = Object.keys(map).length;

const getBaseLog = (base, num) => {
    return Math.log(num) / Math.log(base);
};

//screen size
const changeMobile = () => {
    let width = visualViewport.width;
    const grid = document.getElementById('grid');

    if (width > 600){
        grid.classList.add('desktop-grid');
        document.getElementById('title-cont').classList.add('desktop-top-row');
        grid.classList.remove('mobile-grid');

        //Make arrow point down
        document.getElementById('arrow').classList.remove('fa-angle-down');
        document.getElementById('arrow').classList.add('fa-angle-right');
    }
    else {
        grid.classList.add('mobile-grid');
        grid.classList.remove('desktop-grid');
        document.getElementById('title-cont').classList.remove('desktop-top-row');

        //Make arrow point up
        document.getElementById('arrow').classList.remove('fa-angle-right');
        document.getElementById('arrow').classList.add('fa-angle-down');
    }

};

const copyToClip = () => {
    const outputItem = document.getElementById('output');
    const toolip = document.getElementById('toolip');
    navigator.clipboard.writeText(outputItem.value);
    
    let originalText = toolip.innerText;
    toolip.innerText = "Copied!";
    setTimeout(() => {toolip.innerText = originalText}, 1000);
    
};

const randomEmoji = () => {
    const title = document.getElementById('title');
    let index = Math.floor(Math.random() * Object.keys(map).length);
    title.innerText = title.innerText + map[index];
};

const liveUpdate = (e) => {
    return translate(base, map);
};

const translate = (base, map) => {
    const inputItem = document.getElementById('input');
    const input = inputItem.value;

    let num = Number(input);
    let arr = Array.from(input);
    let output = "";

    const mbase = getBaseLog(base, num);
    const maxPower = Math.floor(mbase);

    for (let power = maxPower; power >= 0; power--){
        let posValue = Math.floor(num / base ** power);
        num = num - posValue * base ** power;
        output = output + (map[posValue]);
    }

    const outputItem = document.getElementById('output');
    outputItem.value = output;
};

const keyPress = (event) => {
    if (event.key == "Enter"){
        translate(base, map);
    }
};

// Run on enter

document.addEventListener('keypress', keyPress);
document.addEventListener('resize', changeMobile);
document.getElementById('input').addEventListener('input', liveUpdate);

window.onresize = changeMobile;
changeMobile();
randomEmoji();