module.exports = {
  getBookById: function(bookVal, next) {
    Book.find({name: bookVal}).exec(function(err, book) {
      if(err) throw err;
      next(book);
    });
  }
};
