/*global Book.js*/

module.exports = {
  getBooks: function(next) {
    Book.find().exec(function(err, books) {
      if(err) throw err;
      next(books);
    });
  },
  addBook: function(bookVal, next) {
    Book.create({value: bookVal}).exec(function(err, book) {
      if(err) throw err;
      next(book);
    });
  },
  removeBook: function(bookVal, next) {
    Book.destroy({value: bookVal}).exec(function(err, book) {
      if(err) throw err;
      next(book);
    });
  }
};