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

        
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.post('/allposts', async (req, res) => {
            const post = req.body;
            console.log(post);
            const result = await allpostsCollection.insertOne(post);
            res.send(result);
        });
        
        app.get('/allposts',  async (req, res) => {
            const query = {};
            const posts = await allpostsCollection.find(query).toArray();
            res.send(posts);
        });

        app.get('/allposts/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
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