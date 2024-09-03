const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://lugo:${password}@fullstack.qfnxb.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)

mongoose.connect(url)
const db = mongoose.connection
db.on('connected', () => { console.log('Connected to the db') })
db.on('err', (err) => { console.log(`Error while trying to connect ${err}`) })
db.on('disconnected', () => { console.log('Mongoose disconnected') })

const closeConnection = () => {
  mongoose.connection.close()
}
const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: name,
  number: number,
})

if (name && number) {
  contact.save().then(result => {
    console.log(result)
    console.log('contact saved!')
    mongoose.connection.close()
  })
} else if (process.argv.length > 100) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
  }).finally(closeConnection)
}

if ("")
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
  })

if (0)
  Contact.find({ name: /^ana/ }).then(contact => {
    console.log(contact)
  }).finally(closeConnection)

Contact.find({ $or: [{ name: /^ana/ }, { number: 23843284 }] }).then(result => {
  console.log(result)
}).finally(closeConnection)
