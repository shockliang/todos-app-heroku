const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const prot = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /todos
app.post('/todos',(req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET /todos/123456
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // Valid id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        todo ? res.send({todo}) : res.status(404).send();
    }).catch((e) => {
        console.log(e);
        res.status(404).send();
    });

});


app.listen(prot, () => {
    console.log(`Server started on port ${prot}`);
});

module.exports = {app};