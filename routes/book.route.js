const express = require("express");
const mongoose=require("mongoose")
const Book = require("../model/books.modal");
const books = express.Router();

books.post("/add/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the book." });
  }
});

books.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Successfully got the data", book: books });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

books.get("/:bookId", async (req, res) => {
  const _id= req.params.bookId;
  console.log(_id);
  try {
    const book = await Book.findById(_id);
    console.log(book);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while fetching the book." });
  }
});

books.patch("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the book." });
  }
});

books.delete("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the book." });
  }
});

module.exports = books;
