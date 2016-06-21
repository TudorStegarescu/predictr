var fixtureController = function(User){

    var get = function(req,res){

        var query = {};

        if(req.query.firstName)
        {
            query.goalsAwayTeam = req.query.goalsAwayTeam;
        }
        User.find(query, function(err, fixtures){
            if(err)
                res.status(500).send(err);
            else
                res.json(fixtures);
        });
    }

    return {
        get: get
    }
}

module.exports = fixtureController;
