const express = require("express");
let notes = require("./notes.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});
app.get("/api/v1/notes", (req, res) => {
  console.log(req.headers);
  console.log(req.ip);
  console.log(req.get("host"));
  res.json(notes);
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

app.delete("/api/v1/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const len = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length === len) {
    return res.status(404).json({ message: "No notes found to delete" });
  }

  res.status(204).json({ message: "Note deleted successfully" });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
