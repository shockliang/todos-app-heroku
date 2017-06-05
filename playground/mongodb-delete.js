// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Eat shit'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat shit'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // delete duplicate user - shock
    // db.collection('Users').deleteMany({name: 'Shock'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('59317c429c932ca2ff16eef2')
    }).then((result) => {
        console.log(result);
    });

    //db.close();
})