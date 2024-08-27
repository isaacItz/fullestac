const mongoose = require('mongoose')
console.log(process.argv)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://lugo:${password}@fullstack.qfnxb.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const db = mongoose.connection
db.on('connected', () => { console.log(`connected`) })
db.on('error', (err) => { console.log(`Mongoose connection error ${err}`) })
db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
//   console.log(result)
// })

console.log(`vamos`)
Note.find({ important: true }).then(result => {
  console.log(typeof result)
  result.forEach(note => {
    console.log(JSON.stringify(note))
    console.log(typeof note)
  })
  mongoose.connection.close()
})
