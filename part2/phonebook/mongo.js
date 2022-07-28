const e = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as arguments: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.7wu0l.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', contactSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    return person.save()
  })
  .then(() => {
    if (process.argv[3] && process.argv[4]) {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    }
    else {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        })
    }
    
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))