const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b67490a8ffa053fe015cceb';

// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }

// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todobyId)=>{
//   if(!todobyId){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id',todobyId);
// }).catch((e)=>console.log(e));

User.findById(id).then((user)=>{
  if(!user){
    return console.log('Id not found');
  }
  console.log('User', user);
},(e)=>{
  console.log(e);
});
