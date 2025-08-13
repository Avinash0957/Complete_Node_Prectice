const express = require('express');
const todocontroller = require('./controllers/todocontroller');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');

// Routes
app.set('views', path.join(__dirname, 'views')); // ✅ Explicit path
app.set('view engine', 'ejs');
app.get('/all-todo', todocontroller.getalltodos);
app.get('/all-todo-counts', todocontroller.getalltodoscount);
app.post('/addtodos', todocontroller.addtodos);
app.post('/updatetodos', todocontroller.updatetodos);
app.post('/deletetodos', todocontroller.Deletetodos);

app.get('/', (req, res) => {
  res.render('todoapp');
});

// ✅ Run only locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 800;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel
module.exports = app;
