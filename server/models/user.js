var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1
  }
});

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
