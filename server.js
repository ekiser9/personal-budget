const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
// const fs = require('fs');

app.use(cors());
const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");
let url = "mongodb://localhost:27017/personalbudget";

// let rawdata = fs.readFileSync('budgetdata.json');
// let budget = JSON.parse(rawdata);

app.use('/', express.static('public'));
app.use(express.json());

app.get('/budget', (req, res) => {
    // res.json(budget);

    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
        .then(() =>{
            budgetModel.find({})
                .then((data) => {
                    console.log("Mongoose worked.")
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

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});