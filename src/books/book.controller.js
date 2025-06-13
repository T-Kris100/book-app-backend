const Book = require('./book.model');

//post a book
const postABook = async (req, res) => {
   try {
      const newBook = await Book({ ...req.body });
      await newBook.save();
      res.status(200).send({
         message: 'Book created successfully',
         book: newBook,
      });
   } catch (error) {
      console.log('Error creating book', error);
      res.status(500).send({
         message: 'Failed to creating book',
         error,
      });
   }
};

//get all books
const getAllBooks = async (req, res) => {
   try {
      const books = await Book.find().sort({ createdAt: -1 });
      res.status(200).send(books);
   } catch (error) {
      console.log('Error fetching book', error);
      res.status(500).send({
         message: 'Failed to fetching book',
      });
   }
};

// get single book
const getSingleBook = async (req, res) => {
   try {
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
         return res.status(404).send({
            message: 'Book not found',
         });
      }
      res.status(200).send(book);
   } catch (error) {
      console.log('Error fetching book', error);
      res.status(500).send({
         message: 'Failed to fetching book',
      });
   }
};

// update book data
const updateBook = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
         new: true,
      });
      if (!updatedBook) {
         return res.status(404).send({
            message: 'Book is not found',
         });
      }

      res.status(200).send({
         message: 'Book updated successfully',
         book: updatedBook,
      });
   } catch (error) {
      console.log('Error updating book', error);
      res.status(500).send({
         message: 'Failed to update book',
      });
   }
};

//delete a book
const deleteBook = async (req, res) => {
   try {
      const { id } = req.params;
      const deleteBook = await Book.findByIdAndDelete(id);
      if (!deleteBook) {
         return res.status(404).send({
            message: 'Book is not found',
         });
      }
      res.status(200).send({
         message: 'Book deleted successfully',
         book: deleteBook,
      });
   } catch (error) {
      console.log('Error deleting book', error);
      res.status(500).send({
         message: 'Failed to delete book',
      });
   }
};

module.exports = {
   postABook,
   getAllBooks,
   getSingleBook,
   updateBook,
   deleteBook,
};
