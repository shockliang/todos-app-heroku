// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);

    // db.collection('Todos').find({
    //     _id: new ObjectID('59316fb69c932ca2ff16eca8')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log(err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count:${count}`);
    // }, (err) => {
    //     console.log(err);
    // });

    db.collection('Users').find({name: 'Shock'}).count().then((count) => {
        console.log(`Users named 'Shock' count:${count}`);
    }, (err) => {
        console.log(err);
    });

    //db.close();
})