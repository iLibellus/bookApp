/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	* Upload image of book
	*
	* (POST /user/avatar)
	*/
	uploadImage: function  (req, res) {
        req.file('file').upload({
            dirname: sails.config.appPath + '/assets/images'
        },function (err, uploadedFiles) {
            if (err) return res.negotiate(err);
						/*BookService.uploadImage(function(success) {
							if(success.ok())
		            res.json(success);
		        });*/
            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!'
            });
        });

    },

			/**
	 * Download image of the book with the specified id
	 *
	 * (GET /user/avatar/:id)
	 */
	image: function (req, res){

	  req.validate({
	    id: 'string'
	  });

	  User.findOne(req.param('id')).exec(function (err, user){
	    if (err) return res.negotiate(err);
	    if (!user) return res.notFound();

	    // User has no avatar image uploaded.
	    // (should have never have hit this endpoint and used the default image)
	    if (!user.avatarFd) {
	      return res.notFound();
	    }

	    var SkipperDisk = require('skipper-disk');
	    var fileAdapter = SkipperDisk(/* optional opts */);

	    // Stream the file down
	    fileAdapter.read(user.avatarFd)
	    .on('error', function (err){
	      return res.serverError(err);
	    })
	    .pipe(res);
	  });
	}
};
