const axios = require('axios');
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  return res.status(300).json({
    message: "Yet to be implemented"
  });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {

  return res.send(
    JSON.stringify(books, null, 4)
  );

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.json(books[isbn]);

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  let result = [];

  Object.keys(books).forEach(key => {

    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      result.push(books[key]);
    }

  });

  return res.json(result);

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  let result = [];

  Object.keys(books).forEach(key => {

    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      result.push(books[key]);
    }

  });

  return res.json(result);

});

// Get book review
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.json(books[isbn].reviews);

});
public_users.get('/async/books', async function (req, res) {

    try {
  
      const response = await axios.get(
        'http://localhost:5000/'
      );
  
      return res.json(response.data);
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message
      });
  
    }
  
  });
  public_users.get('/async/author/:author', async function (req, res) {

    try {
  
      const author = req.params.author;
  
      const response = await axios.get(
        `http://localhost:5000/author/${author}`
      );
  
      return res.json(response.data);
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message
      });
  
    }
  
  });
  public_users.get('/async/title/:title', async function (req, res) {

    try {
  
      const title = req.params.title;
  
      const response = await axios.get(
        `http://localhost:5000/title/${title}`
      );
  
      return res.json(response.data);
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message
      });
  
    }
  
  });
  public_users.get('/async/isbn/:isbn', async function (req, res) {

    try {
  
      const isbn = req.params.isbn;
  
      const response = await axios.get(
        `http://localhost:5000/isbn/${isbn}`
      );
  
      return res.json(response.data);
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message
      });
  
    }
  
  });
  
module.exports.general = public_users;