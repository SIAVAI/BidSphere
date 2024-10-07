const express  = require('express');    // Import express
const cors = require('cors');   // Import cors
require('dotenv').config(); // Import dotenv
const app = express();  // Create an express app
const port = process.env.PORT || 9000; // Set the port
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const cookieParser = require('cookie-parser'); // Import cookie-parser


const corsOptions = 
{
    origin: ['http://localhost:5173', 'http://localhost:3001','https://bidsphere-eef0f.web.app','https://bidsphere-eef0f.firebaseapp.com'],    // Add the origin
    credentials: true,   // Add the credentials
    optionsSuccessStatus: 200   // Add the optionsSuccessStatus
}
app.use(cors(corsOptions));    // Use cors
app.use(express.json()); // Use express.json
app.use(cookieParser()); // Use cookieParser



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.bruzsiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const cookieOption = { 
  httpOnly: true, 
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict" }

async function run() {
  try {

    //JWT
    //Create a token and save it in a cookie
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "100d" });
      res.cookie("token", token,cookieOption ).send({success: "Token Created"});
    });
    //Verify the token in the cookie
    const verifyToken = (req, res, next) => {
      const token = req.cookies?.token;
      if(!token){
        res.status(401).send({error: "Unauthorized"});
      }else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if(err){
            res.status(401).send({error: "Unauthorized"});
          }else{
            req.user = decoded;
            next();
          }
        });
      }
    }


    //clear the token in the cookie
    app.get("/logout", async (req, res) => {
      res.clearCookie("token", { ...cookieOption,maxAge: 0 }).send({success: "Token Cleared"});
    });


    const jobCollection = client.db("bidSphere").collection("jobs");
    const bidsCollection = client.db("bidSphere").collection("bids");
    
    // Api

    app.get("/jobs",async (req, res) => {
        
       const result = await jobCollection.find().toArray();
        res.send(result);
    });

    app.get("/job/:id",async (req, res) => {
        const id = req.params.id;
        const query = { _id:new ObjectId(id) };
        const result = await jobCollection.findOne(query);
        res.send(result);
    }
    );
    app.delete("/job/:id",async (req, res) => {
        const id = req.params.id;
        const query = { _id:new ObjectId(id) };
        const result = await jobCollection.deleteOne(query);
        res.send(result);
    }
    );
    app.put("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const data = req.body;
      const result = await jobCollection.updateOne(query, { $set: { ...data } });
      res.send(result);
  });
    app.get("/jobs/:email",verifyToken,async (req, res) => {
        const tokenEmail = req.user.email;
        const email = req.params.email;
        if(tokenEmail !== email){
          res.status(401).send({error: "Unauthorized"});
        }
        const query = { 'buyer.email' : email };
        const result = await jobCollection.find(query).toArray();
        res.send(result);
    }
    );
    app.post("/bids",async (req, res) => {
        //Check if its duplicate
        const alreadyApplied = bidsCollection.findOne({ 
          'buyer.email': req.body.buyer.email, 
          'jobId': req.body.jobId });

        if(alreadyApplied){
          res.status(400).send({error: "Already Applied"});
          return;
        }
        const data = req.body;
        console.log(data);
        const result = await bidsCollection.insertOne(data);
        res.send(result);
    });

    app.post("/jobs",async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await jobCollection.insertOne(data);
        res.send(result);
    });


    app.get("/myBids/:email",async (req, res) => {
        //const tokenEmail = req.user.email;
      const email = req.params.email;
        // if(tokenEmail !== email){
        //   res.status(401).send({error: "Unauthorized"});
        // }
      const query = { email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
  }
  );

    app.get("/bidRequest/:email",async (req, res) => {
      const email = req.params.email;
      const query = { 'buyer.email':email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
  }
  );

  app.patch("/bid/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body
    const query = { _id: new ObjectId(id) };
    const result = await bidsCollection.updateOne(query, { 
      $set: { ...status } });
    res.send(result);
}
);
  app.get('/all-jobs', async (req, res) => {
    const size = parseInt(req.query.size)
    const page = parseInt(req.query.page) - 1
    const filter = req.query.filter
    const sort = req.query.sort
    const search = req.query.search
    console.log(size, page)

    let query = {
      job_title: { $regex: search, $options: 'i' },
    }
    if (filter) query.category = filter
    let options = {}
    if (sort) options = { sort: { deadline: sort === 'asc' ? 1 : -1 } }
    const result = await jobCollection
      .find(query, options)
      .skip(page * size)
      .limit(size)
      .toArray()

    res.send(result)
  })

  // Get all jobs data count from db
  app.get('/jobs-count', async (req, res) => {
    const filter = req.query.filter
    const search = req.query.search
    let query = {
      job_title: { $regex: search, $options: 'i' },
    }
    if (filter) query.category = filter
    const count = await jobCollection.countDocuments(query)

    res.send({ count })
  })


    
    // Send a ping to confirm a successful connection
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);  // Log the port

 })   // Listen to the port

 app.get("/", (req, res) => {
    res.send("Hello World! this server is running on 9000");    // Send Hello World
})