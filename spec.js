var fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
// spec.js
describe('Protractor Demo App', function() {
  it('should add one and two', function() {

    browser.get('http://localhost:8000/src/#/frontpage');

    var el = element(by.css('.test'));
    el.getText().then(function(text) {
      console.log(text);
    });

      browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'protractor-screenshot.png');
    });

    expect(element(by.exactRepeater('contact in contacts')).isPresent())
    .toBe(true);
  });

});
