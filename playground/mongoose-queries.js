const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '65933cf9daff5f31983f73129';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log('todos',todos)
// });

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log('todo',todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id',todo);
// }).catch((e) => {
//     console.log(e);
// });

var userId = '5932c3c4cd633e0deacb8df3';
User.findById(userId).then((user) => {
    if(!user) {
        return console.log('User id not found');
    }
    console.log('User', user);
}).catch((e) => console.log(e));
