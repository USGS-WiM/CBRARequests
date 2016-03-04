System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Property;
    return {
        setters:[],
        execute: function() {
            Property = (function () {
                function Property(street, city, state, zipcode, unit, subdivision, policy_number, id) {
                    this.street = street;
                    this.city = city;
                    this.state = state;
                    this.zipcode = zipcode;
                    this.unit = unit;
                    this.subdivision = subdivision;
                    this.policy_number = policy_number;
                    this.id = id;
                }
                return Property;
            }());
            exports_1("Property", Property);
        }
    }
});
//# sourceMappingURL=property.js.map