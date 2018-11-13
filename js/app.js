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
    ContactService.prototype.getById = function (id) {
        return this.CONTACTS.filter(function (x) { return x.id == id; })[0];
    };
    return ContactService;
}());
var ContactController = /** @class */ (function () {
    function ContactController(contactService) {
        this.contactService = contactService;
        this.selectedId = 1;
        this.drawContactList();
        this.drawViewDetails(this.selectedId);
    }
    ContactController.prototype.drawContactList = function () {
        var allContacts = this.contactService.getAll();
        var html = '<ul>';
        for (var i in allContacts) {
            var contact = allContacts[i];
            html +=
                "<li class='item" + (this.selectedId == contact.id ? ' active' : '') + "'>" +
                    "<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
                    "<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
                    "</li>";
        }
        html += '</ul>';
        var contactsListContainer = document.getElementById('contactsListContainer');
        contactsListContainer.innerHTML = html;
    };
    ContactController.prototype.drawViewDetails = function (contactId) {
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        var contact = this.contactService.getById(contactId);
        contactsDetailsContainer.innerHTML =
            '<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
                '<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
                '<label>email: </label><b>' + contact.email + '</b><br/>' +
                '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
    };
    ContactController.prototype.select = function (event, id) {
        this.selectedId = id;
        this.drawViewDetails(this.selectedId);
        this.drawContactList();
    };
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