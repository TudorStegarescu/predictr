// spec.js
describe('Predict login', function() {
  it('should enter login details', function() {
    browser.get('http://localhost:8000/src/#/signin');
    element(by.model('auth.email')).sendKeys('test@gmail.com');
    element(by.model('auth.password')).sendKeys('test@gmail.com');

    element(by.css('.submit')).click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element h4 to be present on the dom and then check the expectation

    browser.wait(EC.presenceOf($('h4')), 5000);

    expect(browser.getCurrentUrl()).toBe('http://localhost:8000/src/#/user');

  });
});
