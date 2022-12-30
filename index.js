const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const e = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p1jrtk0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        // Mongodb folder and file add or contion part
        const allpostsCollection = client.db('somaj-media').collection('allposts');
        const usersCollection = client.db('somaj-media').collection('users');
        const allcommentsCollection = client.db('somaj-media').collection('allcomments');
        
        
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { email }
            const products = await usersCollection.find(query).toArray();
            console.log(products);
            res.send(products);
        })

        app.post('/allposts', async (req, res) => {
            const post = req.body;
            const result = await allpostsCollection.insertOne(post);
            res.send(result);
        });
        app.post('/allcomments', async (req, res) => {
            const post = req.body;
            const result = await allcommentsCollection.insertOne(post);
            res.send(result);
        });
        
        app.get('/allposts',  async (req, res) => {
            const query = {};
            const posts = await allpostsCollection.find(query).toArray();
            res.send(posts);
        });
        
        app.get('/allcomments/:id',  async (req, res) => {
            const id = req.params.id;
            const query = { id:id };
            const posts = await allcommentsCollection.find(query).toArray();
            res.send(posts);
        });
        
        app.get('/topposts', async (req, res) => {
            const query = {};
            const cursor = allpostsCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });

        app.get('/allposts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const booking = await allpostsCollection.findOne(query);
            res.send(booking);
        })


    }
    finally {

    }
}
run().catch(console.log());

app.get('/', async (req, res) => {
    res.send('somaj-media server is  runnig')
})

app.listen(port, () => console.log(`somaj-media  portal runnig ${port}`))