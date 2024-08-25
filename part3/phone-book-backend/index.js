const express = require('express')
let contacts = require('./persons.json')
const baseUrl = '/api/v1'

const app = express()
const PORT = 3001

app.get(`${baseUrl}/persons`, (req, res) => {
  res.json(contacts)
})

app.get('/info', (req, res) => {
  const people = contacts.length
  const now = new Date()
  const date = now.toString()
  const content = `
<p>Phonebook has info for ${people} people</p>
<p>${date}</p>
`
  res.end(content)
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
