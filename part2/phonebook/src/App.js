import axios from 'axios'
import { useEffect, useState } from 'react'
import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [updateMsg, setUpdateMsg] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notif' style={addstyle}>
        {message}
      </div>
    )
  }

 const addstyle = {
  color: 'red',
  padding_top: '5px',
  padding_bottom: '5px',
  border: '3px',
  borderColor: 'orange',
  fontStyle: 'italic',
  fontSize: 16
 } 

  const addNumber = (event) => {
    event.preventDefault()
    const newPers = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name===newName && person.number===newNumber)) {
      alert(`${newName} is already added to phonebook with the same number`)
    }
    else if (persons.some(person => person.name===newName && person.number!==newNumber)) {
      var foundperson = persons.find(p => p.name===newName)
      if (window.confirm("are you sure you want to update number?")) {
          var newcontact = {...foundperson,number: newNumber}
          contactService.update(foundperson.id,newcontact)
          .catch(error => {
            setUpdateMsg(
              `Information of'${newName}' was already deleted from server`
            )
            setTimeout(() => {
              setUpdateMsg(null)
            }, 5000)
          })
          setPersons(persons.map(person => person.name===newName ? newcontact : person))
          setUpdateMsg(
            `Updated '${newName}' `
          )
          setTimeout(() => {
            setUpdateMsg(null)
          }, 5000)
      }
      
      setNewName('')
      setNewNumber('')
    }
    else {
      contactService.create(newPers)
      .then(() => {
        contactService.getAll()
        .then(response => {
          setPersons(response.data)
          setUpdateMsg(
            `Added '${newName}' `
          )
          setTimeout(() => {
            setUpdateMsg(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
      })
      .catch(error => {
        console.log(error.response)
        setUpdateMsg(
          ` Error in name or number format ${error.response.data.error}`
        )
        setTimeout(() => {
          setUpdateMsg(null)
        }, 5000)
      })
    }
  }
  
  useEffect(() => {
    contactService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  },[])

  const deletion = (id) => {
    if (window.confirm("are you sure you want to delete?")) {
      contactService.delete1(id)
      setPersons(persons.filter(person=>person.id!==id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={updateMsg}/>
      <Filter filter={newFilter} handleNewFilter={handleNewFilter} />

      <h3>Add a new</h3>
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletion={deletion}/>
    </div>
  )
}

export default App