var ContactService = /** @class */ (function () {
    function ContactService() {
        this.CONTACTS = [
            { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
            { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
            { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
            { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
            { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];
    }
    ContactService.prototype.getAll = function () {
        return this.CONTACTS;
    };
    ContactService.prototype.get = function () {
        return this.CONTACTS[0];
    };
    return ContactService;
}());
var ContactController = /** @class */ (function () {
    function ContactController(contactService) {
        this.contactService = contactService;
        console.log("Hello");
        console.log(contactService.getAll());
    }
    return ContactController;
}());
/// <reference path="contact.service.ts" />
/// <reference path="contact.controller.ts" />
function bootstrap() {
    var contactService = new ContactService();
    var contactController = new ContactController(contactService);
    window.ctrl = contactController;
}
bootstrap();
var Contact = /** @class */ (function () {
    function Contact() {
    }
    return Contact;
}());
//# sourceMappingURL=app.js.map