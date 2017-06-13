const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$f3IvVvGwKPOExtvgLaw2yOcoyzWStZvNJpXrilm9M6VMxtSflazn6';

bcrypt.compare('123!', hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123abc');
// //console.log(`decoded:${decoded}`);
// console.log(decoded);

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`Message:${message}`);
// console.log(`hash:${hash}`);

// var data = {
//     id: 4
// };