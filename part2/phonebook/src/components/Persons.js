import React from 'react'

const Persons = ({persons, newFilter, deletion}) => {
    var namestoshow = persons.filter(person => person.name.includes(newFilter))
    return (
        namestoshow.map(person =>
            <div>
            <span key={person.name}>{person.name} {person.number}    </span>
            <button onClick={() => deletion(person.id)}>delete</button>
            </div>
        )
    )
}

export default Persons