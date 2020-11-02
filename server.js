const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");
let url = "mongodb://localhost:27017/personalbudget";

app.use('/', express.static('public'));
app.use(express.json());

app.get('/budget', (req, res) => {

    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
        .then(() =>{
            budgetModel.find({})
                .then((data) => {
                    console.log("Mongoose get working")
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
});

app.put('/budget', (req,res) => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log("Mongoose put working")
        let newData = new budgetModel({
            title: req.body.title,
            budget: req.body.budget,
            color: req.body.color
        });
        budgetModel.insertMany(newData)
            .then((data) => {
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            })
    })
    .catch((connectionError) => {
        console.log(connectionError);
    })
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});