/**
 * BookInfoController
 *
 * @description :: Server-side logic for managing Bookinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getBookById: function(req, res) {
	var bookId = parseInt(request.param("bookId"), 10);
    BookInfoService.getBookById(function(bookId) {
        res.json(book);
    });
   }
};

