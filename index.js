const fs = require("fs");
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const port = process.env.PORT || 8080;
const mongoUri = 'mongodb+srv://bekzzhan:qwerty123456@cluster0.ex3xy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const app = express();
const filePath = "todos.json";

// async function start() {
//   try {
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     app.listen(port, () => console.log(`Listening on port ${port}...`))
//   } catch (e) {
//     console.log(e);
//     process.exit(1);
//   }
// }

let todos = [
  {
    id: uuidv4(),
    title: 'Купить хлеб',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Купить молоко',
    completed: false,
  }
]
app.use(express.json());
app.use(cors());

app.get('/todos', (req, res) => {
  try {
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try it again.' });
  }
})

app.post('/todos', (req, res) => {
  try {
    const id = uuidv4();
    const {title, completed} = req.body;
    const item = {id, title, completed};
    todos.push(item);
    res.json(item).status(201);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try it again.' });
  }
})

app.delete('/todos/:id', (req, res) => {
  try {
    const id = req.params.id;
    const item = todos.find((item) => item.id == id);
    todos.splice(todos.indexOf(item), 1);
    res.status(200).json({message: `Todo ${id} was removed`});
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try it again.'});
  }
});

app.patch('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const completed = req.body.completed;
    const item = todos.find((item) => item.id == id);
    if (typeof(completed) !== 'undefined') {
      item.completed = completed;
    }
    if (title) {
      item.title = title;
    }
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: 'Something went wront. Try it again.' });
    throw e

  }
}) 

app.listen(port, () => console.log(`Listening on port ${port}...`))
