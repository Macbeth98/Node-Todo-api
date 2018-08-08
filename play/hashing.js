const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password= '123abc!';

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});

var hashed = '$2a$10$SP7NfnuMiFBWZh3t3USvKeCzPG4L.zrsuDAhkexW4jxjSVfr5eTIG';

bcrypt.compare(password, hashed, (err,result)=>{
  console.log(result);
});
// var data={
//   id:10
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
// var msg = 'I am ugbhgdhgss';
//
// var hash = SHA256(msg).toString();
// console.log("message: ",msg);
// console.log("Hash: ",hash);
//
// var data = {
//   id: 4
// };
//
// var token ={
//   data,
//   hash:SHA256(JSON.stringify(data) + 'somesecret' ).toString()
// }
//
// // token.data.id  = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var reshash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
// if(reshash === token.hash){
//   console.log('Sekai');
// }else{
//   console.log('Machigata');
// }
