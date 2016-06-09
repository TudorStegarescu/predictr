exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./frontpage/frontpage.list.item.spec.js'],

	onPrepare: function(){
		browser.driver.manage().window().setPosition(-1100,0);
		browser.driver.manage().window().setSize(1000, 720);
	}
}
