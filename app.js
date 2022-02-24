const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();

const conn_uri = process.env.MONGO_URI;

mongoose
  .connect(conn_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("Connected to DB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes 
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
