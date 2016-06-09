describe('Event details list', function() {
	describe('When clicking on event', function() {
		it('Should navigate to the details page', function() {
			browser.get('http://localhost:8080/src/#/frontpage');

			var header = element(by.binding('homeTeamName'));

			expect(header.getText()).toMatch('Manchester United FC');

		});
	});
});
