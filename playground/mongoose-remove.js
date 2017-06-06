const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id})

Todo.findByIdAndRemove('5936a21d9c932ca2ff170b78').then((todo) => {
    console.log(todo)
});
