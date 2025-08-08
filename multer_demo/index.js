const express = require('express');
const multer = require('multer');
const app = express();
const upload = require('./multer/multer')
// EJS view engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post('/savefiles', upload.single('file'), (req, res) => {
    console.log("Body:", req.body);         // For other form fields (if any)
    console.log("File:", req.file);         // Uploaded file info
    res.send("File uploaded successfully!");
});

// Start server
app.listen(7500, () => {
    console.log(`server started on 7500`);
});
