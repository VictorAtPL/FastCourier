const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(express.static(path.join(__dirname, 'dist'))); // Point static path to dist

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}); //Catch all other routes and return the index file

const port = process.env.PORT || '3000';  //port setting
app.set('port', port);
app.listen(port, () => console.log(`Listening at localhost:${port}`));
