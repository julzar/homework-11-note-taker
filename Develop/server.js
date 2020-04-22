const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

// Get
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    res.json(JSON.parse(data))
  })
});

// Post
app.post('/api/notes', function(req, res) {
  fs.readFile('db/db.json', 'utf8', function(err, data) {
    if (err) {
      throw err
    }

    const notes = JSON.parse(data);
    const newNote = req.body;
 
    notes.push(newNote);
    notes.forEach( (note, i) =>  note.id = i );

    fs.writeFile('db/db.json', JSON.stringify(notes, null, 1), function(err) {
      if (err) {
        throw err;
      }
    });

    res.json(newNote);
  });
});

// Delete
app.delete('/api/notes/:id', function(req, res) {
  fs.readFile('db/db.json', 'utf8', function(err, data) {
    if (err) {
      throw err
    }

    const notes = JSON.parse(data);
    const noteId = parseInt(req.params.id);
    const notesFiltered = notes.filter( note => note.id !== noteId);

    fs.writeFile('db/db.json', JSON.stringify(notesFiltered, null, 1), function(err) {
      if (err) {
        throw err
      }
    });

    res.json(notesFiltered);
  });
});

// Start app
app.listen(PORT, function() {
  console.log(`-- App listening on port ${PORT} --`);
});


