const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Post/Todos', () => {
  it('create a new Todo', (done) => {
    var text = 'test';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text})
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((e) => done(e));
      });
  });

  it('not create invalid todo', (done) => {
    request(app)
      .post('/todos')
      .send({ text: '' })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((e) => done(e));
      });
  });
});

describe('GET/Todos',()=>{
  it('get all Todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
});

describe('Get/Todos/:id',()=>{
  it('return Todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('return 404',(done)=>{
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('return 404 for non object id',(done)=>{
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});


describe('Delete/todos/id',()=>{
  it('remove a todo',(done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err,res)=>{
      if(err)
      return done(err);

      Todo.findById(hexId).then((todo)=>{
        expect(todo).toBe(null);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });

  it('return 404 if todo not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('return 404 for non object id',(done)=>{
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('PATCH/todos/:id',()=>{
  it('update the Todo',(done)=>{
    var hexId = todos[0]._id.toHexString();
    var text='Update patch';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text:text, completed:true})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('clear completedAT when todo not completd',(done)=>{
    var hexId = todos[0]._id.toHexString();
    var text='Update patch!!!';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text:text, completed:false})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done);
  })
});


describe('GET/users/me',()=>{
  it('Return user if authenticated',(done)=>{
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });
  it('return 401 if not authenticated',(done)=>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST/users',()=>{
  it('create a user',(done)=>{
    var email ='ex@gmail.com';
    var password = '123abc';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err)=>{
      if(err){
        return done(err);
      }
      User.function({email}).then((user)=>{
        expect(user).toExist();
        expect(user.password).toNotBe(password);
      });
    });

  });

  it('return validation errors',(doen)=>{
    var email = 'bhd';
    var password = '12345';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });

  it('should not create if email ion use',(done)=>{
    request(app)
    .post('/users')
    .send({
      email: users[0].email,
      password:'12345'
    })
    .expect(400)
    .end(done);
  });
});
