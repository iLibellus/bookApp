/**
 * BookInfoController
 *
 * @description :: Server-side logic for managing Bookinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getBookById: function(req, res) {
	//var bookId = req.param("bookid");
  var bookId = (req.body.value) ? req.body.value : undefined
    BookInfoService.getBookById(bookId, function(book) {
        res.json(book);
    });
   }
};
