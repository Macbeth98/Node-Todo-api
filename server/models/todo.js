var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {
  Todo: Todo
};

// var newTodo = new Todo({
//   text: '  To do Java and    .....'
//   // completed: false,
//   // completedAt: 123
// });
//
// newTodo.save().then(
//   (doc) => {
//     console.log('Saved Todo', doc);
//   },
//   (err) => {
//     console.log('Unable to save');
//   }
// );
