module.exports = {
  getBookById: function(bookVal, next) {
    console.log('BookInfoService: ' + bookVal)
    Book.findOne().where({name: bookVal}).exec(function(err, book) {
      if(err) throw err;
      next(book);
    });
  }
};
