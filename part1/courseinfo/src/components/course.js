import React from 'react'

const Course = ({course}) => {
    const name = course.name
    const parts = course.parts
    const sumexc = parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <div>
        <h2>{name}</h2>
        <ul>
          {parts.map(part =>
            <li key={part.id}>{part.name} {part.exercises}</li>
            )}
        </ul>
        <p><b>total of {sumexc} exercises</b></p>
      </div>
    )
  }

export default Course