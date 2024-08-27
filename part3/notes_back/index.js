require('dotenv').config()
const express = require("express");
const cors = require("cors");
const Note = require("./models/notes.js")
let notes = require("./notes.json");

const app = express();
app.use(express.static("dist"));
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("headers:", request.headers);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

const CORSmiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
};
// app.use(CORSmiddleware)
const corsOptions = {
  origin: ["http://localhost:5173", "https://notes-api-kip5.onrender.com/"],
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});
app.get("/api/v1/notes", (req, res) => {
  console.log(req.headers);
  console.log(req.ip);
  console.log(req.get("host"));
  Note.find({}).then(notes => {
    res.json(notes)
  });
});
app.get("/api/v1/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/v1/notes", (req, res) => {
  const body = req.body;
  if (!body.content)
    return res.status(418).json({ message: "content missing" });

  const newNote = {
    id: generateId(),
    important: Boolean(body.important),
    content: req.body.content,
  };
  console.log(newNote);
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put("/api/v1/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) return res.status(404).end();

  const body = req.body;
  const newNote = { ...note, ...body };
  notes = notes.map((note) => (note.id !== id ? note : newNote));
  res.status(200).json(newNote);
});
app.delete("/api/v1/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const len = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length === len) {
    return res.status(404).json({ message: "No notes found to delete" });
  }

  res.status(204).json({ message: "Note deleted successfully" });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
