const { ipcRenderer } = require('electron');

const button = document.querySelector('.convert__button'),
input = document.querySelector('.convert__input'),
front = document.querySelector('.card--front'),
back = document.querySelector('.card--back');

button.addEventListener('click', e => {
	button.classList.add('loading');
	ipcRenderer.send('convert', input.value)
});
input.addEventListener('keyup', e => e.keyCode === 13 ? button.click() : null );

ipcRenderer.on('convert', (e, arg) => {
	button.classList.remove('loading');
  front.innerHTML = arg;  
})