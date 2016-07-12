var request = require('request');

describe("Sample test", function() {
    beforeEach(function() {
        var jar = request.jar();
        var baseUrl = 'http://localhost:3000/';
        var req = request.defaults({
            jar : jar
        });

        function get(url, params) {
            console.log("Calling", baseUrl + url);
            req.get(browser.baseUrl + url, params, function(error, message) {
                console.log("Done call to", baseUrl + url);
            });
        }

        function setupCommon() {
            get('api/users');
        }

        setupCommon();
    });

    it("should do something", function() {
        expect(2).toEqual(2);
    });
});
