const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'How I fish for likes',
        author: 'Mauno Ampiapi',
        url: 'http://localhost:3003/api/blogs',
        likes: 3
    },
    {
        title: 'Likes are what I like the most',
        author: 'Mauno Meow',
        url: 'http://localhost:3003/api/blogs',
        likes: 6
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'blah', author: 'meh', url: 'doh'})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsList = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersList = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsList, usersList, nonExistingId
}