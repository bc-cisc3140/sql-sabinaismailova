const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const app = express();
const router = express.Router();

const port = 3000;
//app.use(express.json());

// Start server
app.listen(port, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",port))
});

// open the database
let db = new sqlite3.Database('./billboard.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the billboard top 100 database.');
});


// Insert here other API endpoints
// Root endpoint
app.get("/", (req, res, next) => {
  res.send("API end points include /all, /:id, /:artist");
    //res.json({"message":"Ok"})
});

app.get("/rank/:id", (req, res) => {
  // Access id via: req.params.id
  const sql = `SELECT rowid as rank, * FROM top100 where rowid = ${req.params.id};`;
  console.log(sql);
  db.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({row});
  })
});

app.get("/artist/:artist", (req, res) => {
  // Access artist name via: req.params.artist
  const sql = `SELECT rowid as rank, * FROM top100 where Artist LIKE '${req.params.artist}';`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({rows});
  })
});

app.get("/all", (req, res, next) => {
  console.log("/all");
  const sql = "SELECT rowid as rank, * FROM top100";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({rows});
  })
});


app.get("/create", (req, res, next) => {
  console.log("/create");
  const sql = `CREATE TABLE IF NOT EXISTS ${req.query.table}(Artist TEXT, Song TEXT);`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200);
  })
});

app.get("/update", (req, res, next) => {
  const sql = `ALTER TABLE ${req.query.table} add column date text; update table ${req.query.table} set date ='2024-03-27'; select * from ${req.query.table} limit 2`;
  console.log("/update", sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({rows});
  })
});
app.get("/tables", (req, res, next) => {
  console.log("/tables");
  const sql = `PRAGMA table_list`;
  db.all(sql, [], (err, tables) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({tables});
  })
});

app.get("/table/:table", (req, res, next) => {
  const sql = `PRAGMA table_info('${req.params.table}')`;
  console.log(`/table/${req.params.table}`, sql);
  db.all(sql, [], (err, schema) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({schema});
  })
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

