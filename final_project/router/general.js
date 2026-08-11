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

module.exports.general = public_users;