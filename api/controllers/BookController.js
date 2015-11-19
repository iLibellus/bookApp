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
        BookService.addBook(bookVal, function(success) {
            res.json(success);
        });
    },
    removeBook: function(req, res) {
       var bookVal = (req.body.value) ? req.body.value : undefined
        BookService.removeBook(bookVal, function(success) {
            res.json(success);
        });
    }
};

