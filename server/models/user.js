const mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator:(value)=>{
        return validator.isEmail(value);
      },
      //validator: validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
    password:{
      type:String,
      require:true,
      minlength:6
    },
    tokens:[{
      access:{
        type: String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
    }]
});

//Override method--> what to send when a mongoose model is converted to JSON
UserSchema.methods.toJSON = function () {
  var user =this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(()=>{
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'abc123');
  }catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
     '_id': decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(user.password, salt, (err,res)=>{
        user.password = res;
        next();
      });
    });
  }else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};

// var user = new User({
//   email: 'abc@g.com'
// });
//
// user.save().then(
//   (doc) => {
//     console.log('User Saved');
//   },
//   (err) => {
//     console.log('Unable to save User');
//   }
// );
