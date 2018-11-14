/// <reference path="contact.service.ts" />
/// <reference path="contact.controller.ts" />
System.register(["./contact.controller", "./contact.service"], function (exports_1, context_1) {
    "use strict";
    var contact_controller_1, contact_service_1;
    var __moduleName = context_1 && context_1.id;
    function bootstrap() {
        var contactService = new contact_service_1.ContactService();
        var contactController = new contact_controller_1.ContactController(contactService);
        window.ctrl = contactController;
    }
    return {
        setters: [
            function (contact_controller_1_1) {
                contact_controller_1 = contact_controller_1_1;
            },
            function (contact_service_1_1) {
                contact_service_1 = contact_service_1_1;
            }
        ],
        execute: function () {/// <reference path="contact.service.ts" />
            /// <reference path="contact.controller.ts" />
            bootstrap();
        }
    };
});
//# sourceMappingURL=bootstrap.js.map