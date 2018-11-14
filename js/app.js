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
        return this.findById(id);
    };
    ContactService.prototype.remove = function (id) {
        var ind = this.findIndexById(id);
        if (ind >= 0)
            this.CONTACTS.splice(ind, 1);
    };
    ContactService.prototype.findById = function (contactId) {
        return this.CONTACTS.find(function (row) {
            return row.id == contactId;
        });
    };
    ContactService.prototype.findIndexById = function (contactId) {
        var contact = this.findById(contactId);
        if (!contact)
            return -1;
        return this.CONTACTS.indexOf(contact);
    };
    ContactService.prototype.update = function (contact) {
        var ind = this.findIndexById(contact.id);
        if (ind < 0)
            return null;
        this.CONTACTS.splice(ind, 1, contact);
        return contact.id;
    };
    ContactService.prototype.add = function (contact) {
        contact.id = ++ContactService._contactId;
        this.CONTACTS.push(contact);
        return contact.id;
    };
    return ContactService;
}());
var ContactController = /** @class */ (function () {
    function ContactController(contactService) {
        this.contactService = contactService;
        this.drawContactsList();
        // this.drawViewDetails(this.selectedId);
    }
    ContactController.prototype.drawContactsList = function () {
        var contacts = this.contactService.getAll();
        var html = '<ul>';
        for (var ind in contacts) {
            var contact = contacts[ind];
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
    ContactController.prototype.select = function (event, contactId) {
        this.selectedId = contactId;
        this.drawContactsList();
        this.drawViewDetails(contactId);
        event.preventDefault();
        return false;
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
    ContactController.prototype.clearDetails = function () {
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        contactsDetailsContainer.innerHTML = '';
    };
    ContactController.prototype.remove = function (event, clientId) {
        if (this.selectedId == clientId)
            this.clearDetails();
        this.contactService.remove(clientId);
        this.drawContactsList();
        event.preventDefault();
        return false;
    };
    ContactController.prototype.add = function (event) {
        this.editMode = 0 /* add */;
        this.selectedId = null;
        this.drawContactsList();
        this.drawEditDetails(null);
        event.preventDefault();
        return false;
    };
    ContactController.prototype.edit = function (event, clientId) {
        this.editMode = 1 /* edit */;
        this.drawEditDetails(clientId);
        event.preventDefault();
        return false;
    };
    ContactController.prototype.drawEditDetails = function (contactId) {
        var contact = !contactId ? { id: '', firstName: '', lastName: '', email: '' } : this.contactsService.getById(contactId);
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        contactsDetailsContainer.innerHTML =
            '<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
                '<input name="contactId" type="hidden" value="' + contact.id + '">' +
                '<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
                '<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
                '<label>Email: </label><input name="email" value="' + contact.email + '"><br/>' +
                '<label></label><input type="submit" class="btn btn-danger" value="' + (!contactId ? 'Add' : 'Save') + '"/>' +
                '<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
                '</form>';
        var firstNameInput = document.editContactForm.firstName;
        firstNameInput.focus();
        firstNameInput.select();
    };
    ContactController.prototype.cancelEdit = function (event) {
        if (this.editMode == 1 /* edit */)
            this.drawViewDetails(this.selectedId);
        else
            this.clearDetails();
        event.preventDefault();
        return false;
    };
    ContactController.prototype.submit = function (event) {
        event.preventDefault();
        var fomValid = this.validate();
        if (!fomValid)
            return;
        this.save();
        return false;
    };
    ContactController.prototype.validate = function () {
        var res = false;
        var form = document.editContactForm;
        if (!form.firstName.value)
            alert('First name is mandatory');
        else if (!form.lastName.value)
            alert('Last name is mandatory');
        else if (form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value))
            alert('Invalid email');
        else
            res = true;
        return res;
    };
    ContactController.prototype.save = function () {
        var form = document.editContactForm;
        var client = {
            id: +form.contactId.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value
        };
        var contactId;
        if (this.editMode == 0 /* add */)
            contactId = this.contactService.add(client);
        else
            contactId = this.contactService.update(client);
        this.selectedId = contactId;
        this.drawContactsList();
        this.drawViewDetails(this.selectedId);
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