const { ipcRenderer } = require('electron');

const button = document.querySelector('.convert__button'),
input = document.querySelector('.convert__input'),
front = document.querySelector('.card--front'),
back = document.querySelector('.card--back');

button.addEventListener('click', e => ipcRenderer.send('convert', input.value));
input.addEventListener('keyup', e => e.keyCode === 13 ? button.click() : null );

ipcRenderer.on('convert', (e, arg) => {
  front.innerHTML = arg;  
})