const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

// Get routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
  return res.json(JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')));
});




// Start app
app.listen(PORT, function() {
  console.log(`-- App listening on port ${PORT} --`);
});