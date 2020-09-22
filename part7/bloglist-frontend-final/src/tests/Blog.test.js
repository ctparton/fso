import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'
import CreateBlogForm from '../components/CreateBlogForm'

describe('Test blog component', () => {

  const blog = {
      title: 'Blog for testing',
      author: 'The tester',
      url: 'https://test.dev',
      likes: 0
  }
  let mockLikeHandler = jest.fn()
  let mockDelHandler = jest.fn()
  let component
  let showButton

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    mockDelHandler = jest.fn()
      component = render(
          <Blog blog={blog} likeHandler={mockLikeHandler} deleteHandler={mockDelHandler}/>
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

  test(`Liking a blog post twice calls handler twice`, () => {
      fireEvent.click(showButton)
      const likeButton = component.getByText(`Like`)
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)
      expect(mockLikeHandler.mock.calls.length).toBe(2)
  })
})

describe('Test new blog form', () => {
    const formHandler = jest.fn()
    let component
    let titleInput
    let authorInput
    let urlInput
    let form

    beforeEach(() => {
        component = render(
            <CreateBlogForm newBlogHandle={formHandler}></CreateBlogForm>
        )
        form = component.container.querySelector("form")
        titleInput = component.container.querySelector("#title")
        authorInput = component.container.querySelector("#author")
        urlInput = component.container.querySelector("#url")
        
    })
    
    test('Inputs are saved after new form creation', () => {
        fireEvent.change(titleInput, { 
            target: { value: 'testing of forms could be easier' } 
        })
        fireEvent.change(authorInput, {
            target : { value : 'the test author'}
        })
        fireEvent.change(urlInput, {
            target : {value : 'https://testing-library.com/docs/example-codesandbox' }
        })
        fireEvent.submit(form)

        expect(formHandler.mock.calls).toHaveLength(1)
        expect(formHandler.mock.calls[0][0].title).toBe('testing of forms could be easier')
        expect(formHandler.mock.calls[0][0].author).toBe('the test author')
        expect(formHandler.mock.calls[0][0].url).toBe('https://testing-library.com/docs/example-codesandbox')
    })
})