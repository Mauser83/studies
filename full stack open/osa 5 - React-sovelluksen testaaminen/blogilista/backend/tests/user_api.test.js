const { describe, test, after, beforeEach} = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initally one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersList()

        const newUser = {
            username: 'maunomato',
            name: 'Mauno Elo',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersList()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersList()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersList()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await helper.usersList()

        const newUser = {
            username: 'cd',
            name: 'Compact Disc',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        console.log(result.body.error)
        const usersAtEnd = await helper.usersList()
        assert(result.body.error.includes('is shorter than the minimum allowed length'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })
    test('creation fails with proper statuscode and message if password is too short', async () => {
        const usersAtStart = await helper.usersList()

        const newUser = {
            username: 'cdisc',
            name: 'Compact Disc',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        console.log(result.body.error)
        const usersAtEnd = await helper.usersList()
        assert(result.body.error.includes('password is too short'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })
    test('creation fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = await helper.usersList()

        const newUser = {
            username: 'cdisc',
            name: 'Compact Disc',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersList()
        assert(result.body.error.includes('password is missing'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })

})

after(async () => {
  await mongoose.connection.close();
});