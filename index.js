const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_OWNER}:${process.env.DB_PASSWORD}@cluster0.wcxgg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const run = async () => {
    try {
        await client.connect();
        const serviceCollection = client.db('Task').collection('Services')
        const doctorCollection = client.db('Task').collection('Doctors')
        const patientCollection = client.db('Task').collection('Patients ')
        app.get('/services', async (req, res) => {
            return res.send(await serviceCollection.find({}).toArray())
        })
        app.get('/doctors', async (req, res) => {
            return res.send(await doctorCollection.find({}).toArray())
        })
        app.get('/patients', async (req, res) => {
            return res.send(await patientCollection.find({}).toArray())
        })
    }
    finally {

    }
}
run().catch(console.dir)