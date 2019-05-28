const { app, BrowserWindow, ipcMain } = require('electron');
const request = require('request');
const cheerio = require('cheerio');
let $ = null;

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

  request(`https://www.diki.pl/${words[0]}`, function (error, response, html) {

    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      const entity = $('.dictionaryEntity').first();

      const entry = getEntry(entity);

      e.sender.send('convert', entry)

    }
  });

});

// process input
const processInput = (input) => {
  input = (input.replace(/\W+/g, ' ')).replace(/\s+/g, ' ');
  const words = input.split(' ').filter(word => word !== '');
  return words;
}

// get entry
const getEntry = (entity) => {
  const hws = $(entity).find('.hws');
  let entries = [];

  hws.find('.hw').each((i, el) => {
    const singleEntry = $(el).text(),
    pronunciationImageSrc = $(el).next('.recordingsAndTranscriptions').find('.phoneticTranscription a img').attr('src'),
    additionalInfoRaw = $(el).nextAll('.dictionaryEntryHeaderAdditionalInformation').first().find('a').text();

    const pronunciationImage = pronunciationImageSrc ? ` <a><img src="${pronunciationImageSrc}" style="max-height: 18px; height: auto;"/></a>` : '';
    let additionalInfo = '';

    if (additionalInfoRaw) {
      if (additionalInfoRaw.includes('British') || additionalInfoRaw.includes('American')) {
        additionalInfo = additionalInfoRaw[0] === 'A' ? ' AE' : ' BE';
      } else {
        additionalInfo = ' ' + additionalInfoRaw.toUpperCase();
      }
    }

    entries.push(`${singleEntry}${pronunciationImage}${additionalInfo}`);
  })

  const entry = `<p>${entries.join(', ')}</p>`;
  return entry;
}
// END OF CONVERT

app.on('ready', createWindow);
