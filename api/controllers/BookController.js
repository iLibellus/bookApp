/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getBooks: function(req, res) {
        BookService.getBooks(function(books) {
            res.json(books);
        });
    },
    addBook: function(req, res) {
        var bookVal = (req.body.value) ? req.body.value : undefined
        var bookName = (req.body.name) ? req.body.name : undefined
        var bookAuthor = (req.body.author) ? req.body.author : undefined
        console.log('Added book with bookVal: ' + bookVal)
        console.log('Added book with bookName: ' + bookName)
        console.log('Added book with author: ' + bookAuthor)
        BookService.addBook(bookName, bookAuthor, function(success) {
            res.json(success);
        });
    },
    removeBook: function(req, res) {
       var bookVal = (req.body.value) ? req.body.value : undefined
        BookService.removeBook(bookVal, function(success) {
            res.json(success);
        });
    },
    getBookByName: function(req, res) {
      var bookId = req.param('bookid');
      BookInfoService.getBookById(bookId, function(book) {
          res.json(book);
      });
   }
};
