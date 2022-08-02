import {useState} from 'react'

const BlogForm = ({createBlog}) => {
    
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')


    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleURLChange = (event) => {
        setNewURL(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL
        })
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
    }

    return (
    <form onSubmit={addBlog}>
      <p>
        <span> Title: </span>
          <input
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='write title here'
          />
      </p>
      <p>
        <span> Author: </span>
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='write author here'
          />
      </p>
      <p>
        <span> URL: </span>
          <input
            value={newURL}
            onChange={handleURLChange}
            placeholder='write url here'
          />
      </p>
      <button type="submit">save</button>
    </form>  
    )
}
export default BlogForm