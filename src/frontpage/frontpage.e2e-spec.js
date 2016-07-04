var fs = require('fs');

function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);

  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

  describe('Protractor Demo App', function() {

    it('should add one and two', function() {

      browser.get('http://localhost:8000/src/#/frontpage');

      expect(element(by.exactRepeater('contact in contacts')).isPresent())
      .toBe(true);

      browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'protractor-screenshot.png');
      });

  });

});
