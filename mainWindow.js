const { ipcRenderer } = require('electron');

const button = document.querySelector('.convert__button'),
input = document.querySelector('.convert__input');

button.addEventListener('click', e => ipcRenderer.send('convert', input.value));