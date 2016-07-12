describe("The header component", function () {

    beforeEach(module("myApp.header"));

    var header;
    beforeEach(inject(function ($componentController) {
        header = $componentController('predictrHeader',{
           $scope: {}
        });
    }));

    it("can be created", function () {
        expect(header).toBeDefined();
        expect(header.$onInit).toBeDefined();
    });

});
