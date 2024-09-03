require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/notes.js')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('headers:', request.headers)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const CORSmiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
}
// app.use(CORSmiddleware)
const corsOptions = {
  origin: ['http://localhost:5173', 'https://notes-api-kip5.onrender.com/']
}
app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>')
})
app.get('/api/v1/notes', (req, res) => {
  console.log(req.headers)
  console.log(req.ip)
  console.log(req.get('host'))
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})
app.get('/api/v1/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id)
    .then((note) => {
      if (!note) { return res.status(400).json({ message: 'error fetching the note' }) }
      res.json(note)
    })
    .catch((err) => {
      next(err)
    })
})

app.post('/api/v1/notes', (req, res, next) => {
  const body = req.body
  if (!body.content) {
    const error = new Error('content missing')
    error.name = 'EmptyBody'
    return next(error)
  }

  const newNote = new Note({
    important: Boolean(body.important),
    content: req.body.content
  })
  console.log(newNote)
  newNote.save(newNote).then((result) => {
    res.status(201).json(result)
  }).catch((err) => next(err))
})

app.put('/api/v1/notes/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body
  const note = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, note, { new: true, runValidators: true})
    .then((updatedNote) => {
      console.log('note to update: ', updatedNote)
      if (!updatedNote) return res.status(404).end()
      res.json(updatedNote)
    })
    .catch((error) => next(error))
})

app.delete('/api/v1/notes/:id', (request, response, next) => {
  console.log(request.params.id)
  console.log(typeof request.params.id)
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(result)
      if (!result) return response.status(404).end()
      response.status(204).json(result)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('entering error handler')
  console.error(error.message)
  if (error.name === 'EmptyBody') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
