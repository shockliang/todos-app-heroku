require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const prot = process.env.PORT;

app.use(bodyParser.json());

// POST /todos
app.post('/todos',authenticate, (req, res) => {
    var todo = new Todo({
        text:req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET /todos/123456
app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    // Valid id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
        todo ? res.send({todo}) : res.status(404).send();
    }).catch((e) => {
        console.log(e);
        res.status(404).send();
    });

});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    // Valid id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        todo ? res.send({todo}) : res.status(404).send();
    }).catch((e) => {
        res.status(404).send();
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {$set: body}, {new: true}).then((todo) => {
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

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(prot, () => {
    console.log(`Server started on port ${prot}`);
});

module.exports = {app};