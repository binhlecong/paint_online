const body = document.getElementsByTagName('body')
const canvas = document.getElementById('draw')
const ctx = canvas.getContext('2d')
const displaySize = document.querySelector('size-display')

body.height = window.innerHeight;
body.width = window.innerWidth;
canvas.height = window.innerHeight - 6;
canvas.width = window.innerWidth - 100 - 12;

var markerColor = 'black';
var markerSize = 10;
var isMousedown = false;

function setPixel(x, y, c='black', s=2) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, s, s);
    ctx.closePath();
};

canvas.addEventListener('mousedown', (eve) => {
    isMousedown = true;
    const { clientX, clientY } = eve
    const rect = canvas.getBoundingClientRect()
    setPixel(clientX - rect.left - markerSize / 2, clientY - rect.top - markerSize / 2, markerColor, markerSize);
})

canvas.addEventListener('mouseup', (eve) => {
    isMousedown = false;
})

canvas.addEventListener('mousemove', (eve) => {
    const { clientX, clientY } = eve
    const rect = canvas.getBoundingClientRect()
    if(isMousedown) setPixel(clientX - rect.left - markerSize / 2, clientY - rect.top - markerSize / 2, markerColor, markerSize);
})

const colorPickers = [...document.querySelectorAll('.color-picker')]
colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', (eve) => {
        markerColor = eve.target.style.backgroundColor; 
    })
})

const clearButton = document.getElementById('clear-all')

clearButton.addEventListener('click', (eve) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// const sizeDown = document.getElementById('size-down')
// const sizeUp = document.getElementById('size-up')

// sizeDown.addEventListener('click', (eve) => {
//     markerSize = Math.max(markerSize - 1, 1);
//     //displaySize.text(markerSize.toString);
//     // document.querySelector('size-display').innerText = markerSize;
// })

// sizeUp.addEventListener('click', (eve) => {
//     markerSize = Math.min(markerSize + 1, 50);
//     //displaySize.text(markerSize.toString);
//     // document.querySelector('size-display').innerText = markerSize;
// })

const root = document.getElementById('set-size')
function render(HTML) {
    root.innerHTML = HTML;
}

function renderSpanTag(data) {
    return `
        <button style="margin:3px" onclick="changeData(-2)">-</button>
        <span style="margin:12px">${data}</span>
        <button style="margin:3px" onclick="changeData(2)">+</button>
    `
}

function changeData(delta) {
    markerSize += parseInt(delta);
    markerSize = Math.min(markerSize, 50);
    markerSize = Math.max(markerSize, 2);
    render(renderSpanTag(markerSize / 2));
}

render(renderSpanTag(markerSize / 2));