import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('Test blog component', () => {

  const blog = {
      title: 'Blog for testing',
      author: 'The tester',
      url: 'https://test.dev',
      likes: 0
  }
  const mockLikeHandler = jest.fn()
  let component
  let showButton

  beforeEach(() => {
      component = render(
          <Blog blog={blog} likeHandler={mockLikeHandler}/>
      )

      showButton = component.getByText(`Show`)
  })

  test(`Check only blog title and author displayed initially`, () => {
      const visibleText = component.container.querySelector('p')
      expect(showButton).toBeTruthy()
      expect(visibleText).toHaveTextContent(`${blog.title} by ${blog.author}`)
  })

  test(`Check url and likes are rendered after button press`, () => {
      fireEvent.click(showButton)
      const hideButton = component.getByText(`Hide`)
      expect(hideButton).toBeTruthy()
      const like = component.getByText(`likes: ${blog.likes}`)
      expect(like).toHaveTextContent(`likes: 0`)
  })

  test(`Liking a blog post twice calls handler appropriate amount of time`, () => {
      fireEvent.click(showButton)
      const like = component.getByText(`likes: ${blog.likes}`)
      fireEvent.click(like)
      fireEvent.click(like)
      expect(mockLikeHandler.mock.calls.length).toBe(434)
  })
})