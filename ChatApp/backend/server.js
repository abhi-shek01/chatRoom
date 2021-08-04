//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
import mongodb from 'mongodb'
//app config
const app = express()

const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1240196",
    key: "1a500b9deb8698dd3b7d",
    secret: "96690eb723c0a44fe653",
    cluster: "ap2",
    useTLS: true
});


//middleware
app.use(express.json());
app.use(cors());

//Db config
const connection_url = "mongodb+srv://admin:<password>@cluster0.lhrue.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//????


const db = mongoose.connection;
const msgCollection = db.collection("rooms");

db.once("open", () => {
    console.log("Db connected");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
        console.log(change);
        if (change.operationType === 'update') {
            const messageDetails = change.updateDescription.updatedFields;
            // const messageDetails = change.fullDocument;
            const mess = Object.values(messageDetails);
            // console.log(change);
            // pusher.trigger('messages', 'inserted',
            pusher.trigger('messages', 'updated',
                {
                    name: mess[0].name,
                    message: mess[0].message,
                    timestamp: mess[0].timestamp,
                    received: mess[0].received
                });
        }
        else {
            console.log('Error triggering Pusher message wala')
        }



    });

});




//api routes

//to get all the rooms from the database
app.get('/rooms', async (req, res) => {
    await Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})


//to put rooms on the database

app.post('/rooms', async (req, res) => {
    const dbMessage = req.body
    await Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }

    })
})



const MongoClient = mongodb.MongoClient;
const client = new MongoClient(connection_url, { useUnifiedTopology: true });
const ObjectId = mongodb.ObjectId;


//to get the messages
app.get('/rooms/:id', async (req, res) => {

    await client.connect();
    const database = client.db("whatsapp");
    const collection = database.collection("rooms");
    const id = req.params.id;
    const newId = new ObjectId(id);
    const result = await collection.find({ "_id": newId });
    // console.log(req.params.id)
    // const room = await result.toArray();
    while (await result.hasNext()) {
        let room = await result.next();
        res.send(room);
    }
    // console.log(result);
    client.close();
})


//to put messages on the database
app.post('/rooms/:roomId/messages', async (req, res) => {
    const newMsg = req.body;
    console.log(newMsg);
    await client.connect();
    const database = client.db("whatsapp");
    const collection = database.collection("rooms");
    const id = req.params.roomId;
    const newId = new ObjectId(id);
    // const result = await collection.updateOne({ "_id": newId }, { $set: { "messages": [newMsg] } });

    const query = { "_id": newId };
    const updateDocument = {
        $push: { "messages": newMsg }
    };
    const result = await collection.updateOne(query, updateDocument);
    res.json({ ok: true });
    client.close();

})





//listener
app.listen(port, () => console.log(`listening on local host :${port}`));
