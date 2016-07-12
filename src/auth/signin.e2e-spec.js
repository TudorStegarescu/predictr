var signInPage = function() {
  var email = element(by.model('auth.email')),
      pass = element(by.model('auth.password'));

  this.get = function() {
    browser.get('http://localhost:8000/src/#/signin');
  };

  this.setEmail = function(emailaddr) {
    email.sendKeys(emailaddr);
  };

  this.setPass = function(passwd) {
    pass.sendKeys(passwd);
  };

  this.getGreeting = function() {
    return greeting.getText();
  };
};

describe('Predict signin', function() {
  it('should enter login details', function() {
    var signinPage = new signInPage();
    signinPage.get();

    signinPage.setEmail('test@gmail.com');

    signinPage.setPass('test@gmail.com');

    element(by.css('.submit')).click();

    var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($('h4')), 5000);

    expect(browser.getCurrentUrl()).toBe('http://localhost:8000/src/#/user');

  });
});
