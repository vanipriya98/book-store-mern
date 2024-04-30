const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Book = require('./models/bookmodel.js')
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://vani:vani12345@cluster0.alovxrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("DB Connected") })
    .catch(err => console.log(err));

app.get('/welcome', (req, res) => {
    console.log(req)
    return res.status(200).send("Welcome")

})


app.listen(5001, () => {
    console.log("started listening ")
})