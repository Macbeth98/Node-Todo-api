// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAPP',(err,db)=>{
  if(err){
    return console.log(err.message);
  }
  console.log('Connected to MongoDB Server');
  const MDB = db.db('TodoAPP');

// MDB.collection('Todos').deleteMany({text:'Lunch'}).then((result)=>{
//   console.log(result);
// })

// MDB.collection('Todos').deleteOne({text:'Lunch'}).then((res)=>{
//   console.log(res);
// });

// MDB.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
//   console.log(res);
// })

// MDB.collection('Users').deleteMany({name:'Mani'}).then((result)=>{
//   console.log(result);
// })

MDB.collection('Users').findOneAndDelete({
  _id:new ObjectID('5b5db4301f7aad2c8c9b1b7e')
}).then((res)=>{
  console.log(JSON.stringify(res,undefined,2));
})

  //db.close();
});
