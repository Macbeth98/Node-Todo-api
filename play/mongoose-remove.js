const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove()---> delete multiple records

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove()

Todo.findOneAndRemove({text:'Something!!'}).then((todo)=>{
  console.log(todo);
});

// Todo.findByIdAndRemove('5b688929d3f1f5b20a089409').then((doc)=>{
//   console.log(doc);
// });
