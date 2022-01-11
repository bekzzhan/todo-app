const fs = require("fs");
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

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

const todos = [
  {
    id: 1,
    title: 'Купить хлеб',
    completed: false,
  },
  {
    id: 1,
    title: 'Купить молоко',
    completed: false,
  }
]
app.use(express.json());
app.use(cors());

app.get('/todos', (req, res) => {
  try {
    res.json(todos)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const content = fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    return Buffer(data, 'utf-8');
  });
  const todo = JSON.parse(content.find((item) => item.id = id));
  res.send(todo);
})




// start();

app.listen(port, () => console.log(`Listening on port ${port}...`))
