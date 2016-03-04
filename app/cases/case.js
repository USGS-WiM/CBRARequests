System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Case;
    return {
        setters:[],
        execute: function() {
            Case = (function () {
                function Case(request_date, requester, property, casefiles, id) {
                    this.request_date = request_date;
                    this.requester = requester;
                    this.property = property;
                    this.casefiles = casefiles;
                    this.id = id;
                }
                return Case;
            }());
            exports_1("Case", Case);
        }
    }
});
//# sourceMappingURL=case.js.map