import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const input1 = screen.getByPlaceholderText('write title here')
    const input2 = screen.getByPlaceholderText('write author here')
    const input3 = screen.getByPlaceholderText('write url here')
    const sendButton = screen.getByText('save')
  
    await user.type(input1, 'testing a form1...')
    await user.type(input2, 'testing a form2...')
    await user.type(input3, 'testing a form3...')
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form1...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a form2...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a form3...')
  })