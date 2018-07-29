// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAPP',(err,db)=>{
  if(err){
    return console.log(err.message);
  }
  console.log('Connected to MongoDB Server');
  const MDB = db.db('TodoAPP');

MDB.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5b5df850bfc78d66987b15e1')
},{
  $inc:
  {
    age:1
  },
}
  {returnOriginal: false}

).then((res)=>{
  console.log(res);
});
