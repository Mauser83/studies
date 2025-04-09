import PropTypes from 'prop-types'
import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  CreateBlog.propTypes = {
    createBlog: PropTypes.func
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title{' '}
          <input
            type="text"
            data-testid='title'
            value={newBlog.title}
            name="title"
            onChange={handleChange}
            placeholder='write title here'
          />
        </div>
        <div>
          Author{' '}
          <input
            type="text"
            data-testid='author'
            value={newBlog.author}
            name="author"
            onChange={handleChange}
            placeholder='write author here'
          />
        </div>
        <div>
          URL{' '}
          <input
            type="text"
            data-testid='url'
            value={newBlog.url}
            name="url"
            onChange={handleChange}
            placeholder='write url here'
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default CreateBlog
