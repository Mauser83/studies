import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let mockHandler

    beforeEach(() => {
        const blog = { 
            title: 'Component testing is done with react-testing-library',
            author: 'Mauno the tester',
            url: 'http://localhost:5173/',
            likes: 15,
        }

        mockHandler = vi.fn()

        container = render(
            <Blog blog={blog} like={mockHandler}/>
        ).container
    })

test('renders title', () => {
    screen.getByText('Component testing is done with react-testing-library Mauno the tester')
})

test('at start the blog isnt expanded', () => {
    const div = container.querySelector('.expandedContent')
    expect(div).toHaveStyle('display: none')
})

test('after clicking show the blog is expanded', async () => {
    const user = userEvent.setup()
    const button = screen.getByText("show")
    await user.click(button)

    const div = container.querySelector('.expandedContent')
    expect(div).not.toHaveStyle('display: none')
})

test('clicking the like twice calls function twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText("show")
    await user.click(showButton)
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

})

})