require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const prot = process.env.PORT;

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

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    // Valid id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        todo ? res.send({todo}) : res.status(404).send();
    }).catch((e) => {
        res.status(404).send();
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // To mapping which properties that want to updated.
    var body = _.pick(req.body, ['text', 'complete']);
    
    if(!ObjectID.isValid(id)) {
            return res.status(404).send();
    }

    if(_.isBoolean(body.complete) && body.complete) {
        body.completeAt = new Date().getTime();
    } else {
        body.complete = false;
        body.completeAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

// POST /users
app.post('/users/',(req, res) => {
    var body = _.pick(req.body, ['name', 'email','password']);
    
    var user = new User(body);

    user.save().then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(prot, () => {
    console.log(`Server started on port ${prot}`);
});

module.exports = {app};