// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user={name:'Mani', age:20};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoAPP',(err,db)=>{
  if(err){
    return console.log(err.message);
  }
  console.log('Connected to MongoDB Server');
  const MDB = db.db('TodoAPP');

  // db.db().collection('Todos').insertOne({
  //   text:'Inserted from Node-->1',
  //   tool:true
  // },(err,result)=>{
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  // MDB.collection('Users').insertOne({
  //   name:'Mani1',
  //   age:19,
  //   location:'Hyderabd1'
  // },(err,result)=>{
  //   if(err){
  //     console.log(err.message);
  //   }else {
  //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  //   }
  // });

  db.close();
});
