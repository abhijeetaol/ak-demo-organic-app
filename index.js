var express=require("express");
var app=express();
var parser=require('body-parser');
var path=require("path");

var uroutes=require("./routes/userroutes");
var products=require("./routes/productroutes");
var orders=require("./routes/orderroutes");
var messages =require("./routes/messageroutes");
var passport = require('passport');
var cors = require('cors')


app.use(cors())



app.use(parser.json());

var mongoose = require('mongoose');

mongoose.set('debug', true);

//mongoose.connect('mongodb://localhost/organic'); // %3D ak-demo-ecommerce-db

//mongoose.connect('mongodb://ak-demo-cosmos-db-account:Kk3bGILYoWjkJGz2LZkWhRn3kUEg6QYQMYg6hkxdZwBOL3hnkAnrNPK5OyDc5KPAcakmmI3nkyku0KTJYnMPEQ==@ak-demo-cosmos-db-account.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ak-demo-cosmos-db-account@');
//mongoose.connect('mongodb://ak-demo-cosmos-db-account:Kk3bGILYoWjkJGz2LZkWhRn3kUEg6QYQMYg6hkxdZwBOL3hnkAnrNPK5OyDc5KPAcakmmI3nkyku0KTJYnMPEQ%3D%3D@ak-demo-cosmos-db-account.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ak-demo-cosmos-db-account@');

var connString = 'mongodb://ak-demo-cosmos-db-account:Kk3bGILYoWjkJGz2LZkWhRn3kUEg6QYQMYg6hkxdZwBOL3hnkAnrNPK5OyDc5KPAcakmmI3nkyku0KTJYnMPEQ%3D%3D@ak-demo-cosmos-db-account.mongo.cosmos.azure.com:10255/ak-demo-ecommerce-db?ssl=true';//&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ak-demo-cosmos-db-account@';

mongoose.connect(connString);

// mongoose.connect(connString, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   auth: {
//   user: 'ak-demo-cosmos-db-account',
//   password: 'Kk3bGILYoWjkJGz2LZkWhRn3kUEg6QYQMYg6hkxdZwBOL3hnkAnrNPK5OyDc5KPAcakmmI3nkyku0KTJYnMPEQ=='
//   }
//   })
//   .then(() => console.log('Connection to CosmosDB successful'))
//   .catch((err) => console.error(err));

var db = mongoose.connection;

app.get("/images/:imagename",function(request,response){
   let imagename = request.params.imagename;     
   response.sendFile(path.join(__dirname,"static-files/"+ imagename))
})

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("mongo db connection is open");
});



/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  next();
});
*/

app.use(passport.initialize());


app.use("/users",uroutes);
app.use("/products",products);
app.use("/orders",orders);
app.use("/messages",messages);
app.listen(4500,function(){
    console.log("App is running in port number 4500");

});