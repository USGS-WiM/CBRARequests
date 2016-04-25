System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Case;
    return {
        setters:[],
        execute: function() {
            Case = (function () {
                function Case(requester, property, property_string, case_number, status, request_date, casefiles, cbrs_unit, cbrs_unit_string, map_number, map_number_string, cbrs_map_date, determination, determination_string, prohibition_date, distance, fws_fo_received_date, fws_hq_received_date, final_letter_date, close_date, final_letter_recipient, analyst, analyst_string, analyst_signoff_date, qc_reviewer, qc_reviewer_string, qc_reviewer_signoff_date, fws_reviewer, fws_reviewer_string, fws_reviewer_signoff_date, priority, comments, tags, id) {
                    this.requester = requester;
                    this.property = property;
                    this.property_string = property_string;
                    this.case_number = case_number;
                    this.status = status;
                    this.request_date = request_date;
                    this.casefiles = casefiles;
                    this.cbrs_unit = cbrs_unit;
                    this.cbrs_unit_string = cbrs_unit_string;
                    this.map_number = map_number;
                    this.map_number_string = map_number_string;
                    this.cbrs_map_date = cbrs_map_date;
                    this.determination = determination;
                    this.determination_string = determination_string;
                    this.prohibition_date = prohibition_date;
                    this.distance = distance;
                    this.fws_fo_received_date = fws_fo_received_date;
                    this.fws_hq_received_date = fws_hq_received_date;
                    this.final_letter_date = final_letter_date;
                    this.close_date = close_date;
                    this.final_letter_recipient = final_letter_recipient;
                    this.analyst = analyst;
                    this.analyst_string = analyst_string;
                    this.analyst_signoff_date = analyst_signoff_date;
                    this.qc_reviewer = qc_reviewer;
                    this.qc_reviewer_string = qc_reviewer_string;
                    this.qc_reviewer_signoff_date = qc_reviewer_signoff_date;
                    this.fws_reviewer = fws_reviewer;
                    this.fws_reviewer_string = fws_reviewer_string;
                    this.fws_reviewer_signoff_date = fws_reviewer_signoff_date;
                    this.priority = priority;
                    this.comments = comments;
                    this.tags = tags;
                    this.id = id;
                }
                return Case;
            }());
            exports_1("Case", Case);
        }
    }
});
//# sourceMappingURL=case.js.map