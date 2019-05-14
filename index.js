const { app, BrowserWindow, ipcMain } = require('electron');
const request = require('request');
const cheerio = require('cheerio');

let mainWindow;

const createWindow = () => {

  mainWindow = new BrowserWindow({ 
  	width: 800, 
  	height: 600,
  	webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('mainWindow.html');

}

// CONVERT

ipcMain.on('convert', (e, input) => {

  const words = processInput(input);

  request('https://www.diki.pl/test', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html),
      title = $('.dictionaryEntity .hws h1 span.hw').text();
      console.log(title);
    }
  });

});

// process input
const processInput = (input) => {
  input = (input.replace(/\W+/g, ' ')).replace(/\s+/g, ' ');
  const words = input.split(' ').filter(word => word !== '');
  return words;
}
// END OF CONVERT

app.on('ready', createWindow);
