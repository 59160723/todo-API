const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


let todos = [{
    id: 1,
    title: "homework",
    completed: false
}, {
    id: 2,
    title: "cleanning",
    completed: true
}]




app.get('/', (req, res) => {
    res.send({ message: 'Hello Todo API' })
})
app.get('/todos', (req, res) => {
    res.send(todos)

})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id
    let result = todos.filter(todo => todo.id.toString() === id)
    let todo = result[0]
    res.send(todo)

})

app.post('/todo', (req, res) => {
    let title = req.body.title
    let todo = { id: todos.length + 1, title: title, completed: false }
    todos.push(todo)
    res.status(201).send(todo)

})

app.put('/todoTitle/:id', (req, res) => {
    let result = todos.filter(todo => todo.id.toString() === req.params.id)
    let t = result[0]
    t.title = req.body.title
    res.sendStatus(200)

    /*
    let todo = todos.find(t => t.id.toString() ===  req.params.id )
    res.send(todo)
    */

})
app.put('/todoCompleted/:id', (req, res) => {
    let result = todos.filter(todo => todo.id.toString() === req.params.id)
    let a = result[0]
    if (a.completed == true) {
        a.completed = false
    } else {
        a.completed = true
    }
    res.sendStatus(200)
})

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id
    let result = todos.filter(todo => todo.id.toString() != id)
    todos = result
    res.sendStatus(204)
})


app.delete('/todoCompleted/', (req, res) => {
    let result = todos.filter(todo => todo.completed != true)
    todos = result
    res.sendStatus(204)
})



app.listen(port, () => {
    console.log('Todo API Server Started at ' + port)
})