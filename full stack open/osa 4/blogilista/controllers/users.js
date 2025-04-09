const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    if (request.body.password) {
    const { username, name, password } = request.body

    if (password && password.length > 2) {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
} else {
    response.status(400).json({error: 'password is too short'})
}
} else {
    response.status(400).json({error: 'password is missing'})
}
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
    response.json(users)
})

module.exports = usersRouter