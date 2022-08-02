import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
      title: 'coolbeans',
      author: 'shiv',
      likes: 0,
      url: 'xyz'
    }
  
    const {container} = render(<Blog blog={blog} />)
  
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'coolbeans shiv'
    )
  })