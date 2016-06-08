var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
});

module.exports = mongoose.model('User', userModel);
