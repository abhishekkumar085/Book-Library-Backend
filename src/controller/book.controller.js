const book = require('../model/book.model.js');

async function createBook(req, res) {
  try {
    const bookData = req.body;

    console.log(bookData, 'bookData');

    const newBook = await book.create(bookData);
    return res.status(201).json({
      success: true,
      message: 'book created successfully!',
      data: newBook,
    });
  } catch (error) {
    console.log(error, 'error');
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

module.exports = createBook;
