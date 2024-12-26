const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<username>:<Password>@cluster0.oq3fq.mongodb.net/todosdata?retryWrites=true&w=majority&appName=Cluster0')
// .then(() => {
//     console.log('Connected to MongoDB successfully');
// })
// .catch(err => {
//     console.error('Error connecting to MongoDB:', err.message);
// });


app.get('/get', (req, res) => {
    TodoModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})



app.put('/update/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findById(id) // Find the current state of the document
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            // Toggle the `done` field
            return TodoModel.findByIdAndUpdate(
                { _id: id },
                { done: !todo.done }, // Toggle the current value
                { new: true } // Return the updated document
            );
        })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json({ message: err.message }));

})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.post('/add', (req, res) => { // Note the corrected route name
    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ message: err.message }));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
