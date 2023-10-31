const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  summary: {
    type: String,
  }
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;

