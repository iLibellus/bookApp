/*global File.js*/

module.exports = {
  uploadImage: function(next) {
    // Save the "fd" and the url where the image of a book can be accessed
    File.create({

      // Generate a unique URL where the image can be downloaded.
      imageUrl: require('util').format('%s/assets/images/%s', sails.getBaseUrl(), req.session.me),

      // Grab the first file and use it's `fd` (file descriptor)
      imageFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  }
};
