const { ipcRenderer } = require('electron');

const button = document.querySelector('.convert__button'),
input = document.querySelector('.convert__input'),
front = document.querySelector('.card--front'),
back = document.querySelector('.card--back');

button.addEventListener('click', e => ipcRenderer.send('convert', input.value));

ipcRenderer.on('convert', (e, arg) => {
  front.innerHTML = arg;  
})