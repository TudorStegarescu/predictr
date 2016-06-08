var userController = function(User){

    var post = function(req, res){
        var user = new User(req.body);

        if(!req.body.firstName){
            res.status(400);
            res.send('First name is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.firstName)
        {
            query.firstName = req.query.firstName;
        }
        User.find(query, function(err,users){
            if(err)
                res.status(500).send(err);
            else
                res.json(users);
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = userController;
