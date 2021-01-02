const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const connectionString = 'mongodb+srv://ahmad:bademjoon@cluster0.sdj3z.mongodb.net/companyrating?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('companyrating')

        app.get('/businesses', (req, res) => {
            console.log('INSIDE slash')
            db.collection('businesses')
                .find({}).collation({ locale: "en" }).sort({name: 1})
                .toArray()
                .then(results => {
                    //console.log("got result",results)
                    res.send(results)
                })
                .catch(error => {console.error(error)
                    console.log("got error",error)
                    res.send({error})
                })
        })


        app.listen(process.env.PORT || 8080);


    })
    .catch(error => console.error(error))



/*app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

