const expect = require('chai').expect
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('todo API', () => {
    describe('Get /todos', () => {
        it('should return list of todos ', (done) => {
            request.get('/todos')
                .send()
                .end((err, res) => {
                    let todos = res.body
                    expect(todos).to.be.an('array')

                    let todo = todos[0]
                    expect(todo).to.have.property('title')
                    expect(todo).to.have.property('completed')
                    done()

                })
        })
    })
    describe('Get /todos/:id', () => {
        it('should return list todo id 1', (done) => {
            request.get('/todos/1')
                .send()
                .end((err, res) => {
                    let todos = res.body
                    expect(todos).to.be.an('object')

                    let todo = todos[0]
                    expect(todo).to.have.property('title')
                    expect(todo).to.have.property('completed')
                    done()
                })
        })
    })
    describe('POST /todo', () => {
        let totalTodos = 0
        beforeAll((done) => {
            request.get('/todos')
                .end((err, res) => {
                    let todos = res.body
                    totalTodos = todos.length
                    done()

                })
        })

        it('should return status 200 when create new todo', (done) => {
            request.post('/todo')
                .expect(201)
                .end((err, res) => {
                    request.get('/todos')
                        .end((err, res) => {
                            let remaining = res.body.length
                            expect(remaining).to.above(totalTodos)
                            done()
                        })

                })
        })
    })




    describe('DELETE /todo/:id', () => {
        let totalTodos = 0
        beforeAll((done) => {
            request.get('/todos')
                .end((err, res) => {
                    let todos = res.body
                    totalTodos = todos.length
                    done()
                })
        })

        it('should return status 200 when create new todo', (done) => {
            request.delete('/todo/1')
                .expect(204)
                .end((err, res) => {
                    request.get('/todos')
                        .end((err, res) => {
                            let remaining = res.body.length
                            expect(remaining).to.below(totalTodos)
                            done()
                        })
                })
        })
    })



})