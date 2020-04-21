const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'/public/index.html'));
  });



app.listen(PORT, function() {
    console.log(`-- App listening on port ${PORT} --`)
  });