const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const useroneId = new ObjectID();
const usertwoId = new ObjectID();
const users = [{
  _id: useroneId,
  email:'macbeth@gmail.com',
  password:'useronepass',
  tokens:[{
    access:'auth',
    token:jwt.sign({_id:useroneId, access:'auth'},'abc123').toString()
  }]
},{
  _id:usertwoId,
  email: 'user2@gmail.com',
  password:'usertwopass'
}];

const todos =[{
  _id: new ObjectID(),
  text: 'First test Todo'
},{
  _id: new ObjectID(),
  text:'Second test Todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=>done());
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userone = new User(users[0]).save();
    var usertwo = new User(users[1]).save();

    return Promise.all([userone, usertwo])
  }).then(()=>done());
};

module.exports = {todos, populateTodos, users, populateUsers};
