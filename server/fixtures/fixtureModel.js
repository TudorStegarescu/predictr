var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fixtureModel = new Schema({
    homeTeamName: {
      type: String
    },
    awayTeamName: {
      type: String
    }
});

module.exports = mongoose.model('Fixture', fixtureModel);
