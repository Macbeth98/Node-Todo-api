// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAPP',(err,db)=>{
  if(err){
    return console.log(err.message);
  }
  console.log('Connected to MongoDB Server');
  const MDB = db.db('TodoAPP');

// MDB.collection('Todos').find({
//   _id:new ObjectID('5b5db6a0bfc78d66987b01a1')
// }).toArray().then((docs)=>{
//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('Unable to fetch',err);
// });

// MDB.collection('Todos').find().count().then((count)=>{
//   console.log('Todos count:',count);
// },(err)=>{
//   console.log('Unable to fetch',err);
// });

MDB.collection('Users').find({name:'Mani'}).toArray().then((docs)=>{
  console.log('Users with name:"Mani"');
  console.log(JSON.stringify(docs,0,2));
},(err)=>{
  console.log('Unable to fetch',err);
});

  //db.close();
});
