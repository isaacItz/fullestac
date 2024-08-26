const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
let contacts = require("./persons.json");

const baseUrl = "/api/v1";
const app = express();
const PORT = 3001;

app.use(express.static('dist'))
app.use(cors())
const middleware = (req, res, next) => {
  res.set("name", "isaac");
  next();
};

const body = (req, res) => {
  return JSON.stringify(req.body) || "no body"
}
morgan.token('body', body)
app.use(express.json());
app.use(middleware);
app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      tokens.body(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.get(`${baseUrl}/persons`, (req, res) => {
  res.json(contacts);
});

app.get(`${baseUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((contact) => contact.id === id);

  if (!person) {
    res.status(404).json({ error: "Contact not found" });
  } else {
    res.json(person);
  }
});
const generateId = () => {
  return Math.ceil(Math.random() * 10000);
};
app.post(`${baseUrl}/persons`, (req, res) => {
  const body = req.body;
  let message = { message: "name or number missing" };
  if (!(body.name && body.number)) return res.status(400).send(message);

  let existing = contacts.find((c) => {
    return c.name == body.name;
  });
  message.message = "Contact name must be unique";
  if (existing) return res.status(400).send(message);

  existing = contacts.find((c) => c.number == body.number);
  message.message = "Contact number must be unique";
  if (existing) return res.status(400).send(message);

  const newContact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});
app.delete(`${baseUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((contact) => contact.id === id);
  if (!person) return res.status(404).json({ message: "Contact not found" });

  contacts = contacts.filter((contact) => contact.id !== person.id);

  res.status(202).send();
});
app.get("/info", (req, res) => {
  const people = contacts.length;
  const now = new Date();
  const date = now.toString();
  const content = `
<p>Phonebook has info for ${people} people</p>
<p>${date}</p>
`;
  res.end(content);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
