const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Book = require('./models/bookmodel.js')
app.use(express.json());
mongoose.connect("mongodb+srv://vani:vani12345@cluster0.alovxrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("DB Connected") })
    .catch(err => console.log(err));

app.get('/welcome', (req, res) => {
    console.log(req)
    return res.status(200).send("Welcome")

})

app.post('/books', async (req, res) => {
    try {
        const { title, author, publishyear } = req.body
        if (!title || !author || !publishyear) {
            return res.status(400).send('All fields are required');
        }
        const newBook = new Book({
            title, author, publishyear
        })
        await newBook.save()
        return res.status(200).send("Book created successfully")
    }

    catch (err) {
        console.log(err.message)
        return res.status(500).send({ message: err.message });
    }
})

app.get("/books", async (req, res) => {
    try {
        let allbooks = await Book.find()
        return res.status(200).json({
            count: allbooks.length,
            data: allbooks
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ message: err.message });
    }
})

app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params
        let book = await Book.findById(id)
        return res.status(200).json({
            count: book.length,
            data: book
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ message: err.message });
    }
})

app.put("/books/:id", async (req, res) => {
    try {
        const { title, author, publishyear } = req.body
        if (!title || !author || !publishyear) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const { id } = req.params
        let book = await Book.findByIdAndUpdate(id, req.body)
        if (!book) {
            return res.status(400).json({ message: "book not found " })
        }

        return res.status(200).send("book updated successfully")

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ message: err.message })
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(400).json({ message: "Book Not found" })
        }
        return res.status(200).send({message :"Book deleted successfully"})
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

app.listen(5001, () => {
    console.log("started listening ")
})