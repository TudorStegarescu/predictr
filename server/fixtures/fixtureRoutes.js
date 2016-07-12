var express = require('express');


var routes = function(User){
    var fixtureRouter = express.Router();

    var fixtureController = require('./fixtureController')(User)
    fixtureRouter.route('/')
        .get(fixtureController.get);

    fixtureRouter.use('/:fixtureId', function(req,res,next){
        User.findById(req.params.userId, function(err,user){
            if(err)
                res.status(500).send(err);
            else if(user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.status(404).send('no user found');
            }
        });
    });
    return fixtureRouter;
};

module.exports = routes;
