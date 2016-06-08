var should = require('should'),
    sinon = require('sinon');

describe('User Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty firstName on user', function(){
            var User = function(user){this.save = function(){}};

            var req = {
                body: {
                    firstName: 'Test'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var userController = require('../api-routes/controllers/userController')(User);

            userController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('First name is required').should.equal(true);
        })
    })
})
