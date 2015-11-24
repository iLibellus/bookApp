module.exports = {
  getBookById: function(where, next) {
    Book.find(where).exec(function(err, book) {
      if(err) throw err;
      next(book);
    });
  }
};
