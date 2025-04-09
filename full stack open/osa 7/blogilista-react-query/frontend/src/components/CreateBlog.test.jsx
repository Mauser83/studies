import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
    test('call create function with object', async () => {
        const user = userEvent.setup()
        const createBlog = vi.fn()

        render(<CreateBlog createBlog={createBlog} />)

        const inputTitle = screen.getByPlaceholderText('write title here')
        const inputAuthor = screen.getByPlaceholderText('write author here')
        const inputUrl = screen.getByPlaceholderText('write url here')
        const createButton = screen.getByText('Save')

        await user.type(inputTitle, 'created for testing')
        await user.type(inputAuthor, 'Robot')
        await user.type(inputUrl, 'robotsrock.com')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('created for testing')
        expect(createBlog.mock.calls[0][0].author).toBe('Robot')
        expect(createBlog.mock.calls[0][0].url).toBe('robotsrock.com')

    })
})