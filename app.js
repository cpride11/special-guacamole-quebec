require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')


// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }))


// use res.render to load up an ejs view file

//type in result from the enneagram test
let myTypeServer = "The Investigator";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function mongoConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const result = await client.db("courtneys-hobbies-quebec").collection("chainsaw-inventory").find().toArray();

    console.log("mongoConnect Result: ", result);

    return result; 

 } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


app.get('/read', async (req,res) => {

  let myResultServer = await run(); 

  console.log("myResultServer:", myResultServer);

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: myResultServer

  });


}); 
run().catch(console.dir);


// console.log(process.env.URI)

app.get('/', function(req, res) {

  res.render('index', {
   
    myTypeClient: myTypeServer 

  });
  
});

app.get('/name', (req,res) => {

  console.log("in get to slash name:", req.query.ejsFormName); 
  myTypeServer = req.query.ejsFormName; 

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: "myResultServer"

  });

  
})



app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

app.listen(port, () => {
console.log(`papa app listening on port ${port}`)
})

