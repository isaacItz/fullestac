require("dotenv").config()
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
let contacts = require("./persons.json");
const Contact = require("./models/contacts")

const baseUrl = "/api/v1";
const app = express();
const PORT = process.env.PORT || 3001;

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
app.get(`${baseUrl}/persons`, (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts);
  }).catch(err => {
    next(err)
  })
});

app.get(`${baseUrl}/persons/:id`, (req, res, next) => {
  Contact.findById(req.params.id).then(contact => {
    if (!contact)
      return res.status(404).json({ error: "Contact not found" });
    res.json(contact)
  }).catch(err => {
    next(err)
  })
});

app.post(`${baseUrl}/persons`, async (req, res, next) => {
  const { name, number } = req.body
  let message = { message: "name or number missing" };
  if (!name || !number) return res.status(400).send(message);

  try {
    // we are doing two queries, one to get name and the other to get the number
    const existingName = await Contact.findOne({ name: name })
    console.log(existingName)
    if (existingName)
      return res.status(400).json({ message: "Name must be unique" })

    const existingNumber = await Contact.findOne({ number: number })
    if (existingNumber)
      return res.status(400).json({ message: "Number must be unique" })

    const newContact = new Contact({
      name: name,
      number: number
    })
    newContact.save().then(
      contact => {
        res.status(201).json(contact)
      }
    )

  } catch (err) {
    next(err)
  }

});

app.delete(`${baseUrl}/persons/:id`, (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id).then(contact => {
    if (!contact)
      return res.status(404).json({ message: "id not found" })
    res.status(200).json(contact)
  }).catch(err => next(err))
});

app.patch(`${baseUrl}/persons/:id`, async (req, res, next) => {
  // here we are doing everithing on one query and then we look in the result array if there's any field with repeadet number or name 
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact)
      return res.status(404).json({ message: "Contact not found" })

    // looking for duplicates
    const contacts = await Contact.find({ $or: [{ name: req.body.name }, { number: req.body.number }] })
    let nameExists = contacts.some(c => c.name.toString() === req.body && c._id.toString() !== req.params.id)
    let numberExists = contacts.some(c => c.number.toString() == req.body.number && c._id.toString() !== req.params.id)
    console.log(`exists: ${nameExists}, num: ${numberExists}`)

    if (nameExists) return res.status(409).json({ message: "Name already exists" })
    if (numberExists) return res.status(409).json({ message: "Number already exists" })

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

    res.status(202).json(updatedContact)

  } catch (err) {
    next(err)
  }
})

app.put(`${baseUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((contact) => contact.id === id);
  if (!person) return res.status(404).json({ message: "Contact not found" });

  const body = req.body;
  if (!(body.name && body.number)) return res.status(400).json({ message: "name or number missing" });

  let existing = contacts.find((c) => c.name == body.name && c.id !== person.id);
  if (existing) return res.status(400).json({ message: "Contact name must be unique" });

  existing = contacts.find((c) => c.number == body.number && c.id !== person.id);
  if (existing) return res.status(400).json({ message: "Contact number must be unique" });

  person.name
})
app.get("/info", async (req, res) => {
  const people = await Contact.countDocuments({})
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

const handleErrors = (err, req, res, next) => {
  console.log(err)
  if (err.name === "CastError")
    return res.status(400).json({ message: "malformed id" })

  next(err)
}
app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
