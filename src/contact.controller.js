System.register([], function (exports_1, context_1) {
    "use strict";
    var ContactController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // import { EditMode } from './contact.service';
            /// <reference path="contact.interface.ts" />
            /// <reference path="contact-edit.form.ts" />
            /// <reference path="edit-mode.enum.ts" />
            /// <reference path="contacts.service.ts" />
            ContactController = /** @class */ (function () {
                function ContactController(contactService) {
                    this.contactService = contactService;
                    this.selectedId = 1;
                    this.drawContactsList();
                    this.drawContactsDetails();
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
                    var container = document.getElementById('contactsListContainer');
                    container.innerHTML = html;
                };
                ContactController.prototype.select = function (event, contactId) {
                    event.preventDefault();
                    this.selectedId = contactId;
                    this.drawContactsDetails();
                    this.drawContactsList();
                };
                ContactController.prototype.drawContactsDetails = function () {
                    var contact = this.contactService.get(this.selectedId);
                    var container = document.getElementById('contactsDetailsContainer');
                    container.innerHTML =
                        '<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
                            '<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
                            '<label>email: </label><b>' + contact.email + '</b><br/>' +
                            '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
                };
                ContactController.prototype.edit = function (event, contactId) {
                    event.preventDefault();
                    this.selectedId = contactId;
                    this.editMode = EditMode.Edit;
                    this.drawEditContactsDetails();
                };
                ContactController.prototype.add = function (event) {
                    event.preventDefault();
                    this.selectedId = undefined;
                    this.editMode = EditMode.Add;
                    this.drawContactsList();
                    this.drawEditContactsDetails();
                };
                ContactController.prototype.drawEditContactsDetails = function () {
                    var contact;
                    if (this.editMode === EditMode.Edit) {
                        contact = this.contactService.get(this.selectedId);
                    }
                    else {
                        contact = {
                            id: undefined,
                            firstName: '',
                            lastName: '',
                            email: ''
                        };
                    }
                    var contactId = contact.id;
                    var container = document.getElementById('contactsDetailsContainer');
                    container.innerHTML = '<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
                        '<input name="contactId" type="hidden" value="' + contact.id + '">' +
                        '<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
                        '<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
                        '<label>Email: </label><input name="email" value="' + contact.email + '"><br/>' +
                        '<label></label><input type="submit" class="btn btn-danger" value="' + (!contactId ? 'Add' : 'Save') + '"/>' +
                        '<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
                        '</form>';
                    var firstNameField = document.editContactForm.firstName;
                    firstNameField.focus();
                    firstNameField.select();
                };
                ContactController.prototype.remove = function (event, contactId) {
                    event.preventDefault();
                    this.contactService.remove(contactId);
                    if (contactId == this.selectedId) {
                        this.clearDetails();
                    }
                    this.drawContactsList();
                };
                ContactController.prototype.submit = function (event) {
                    event.preventDefault();
                    var isFormValid = this.validate();
                    if (!isFormValid) {
                        return;
                    }
                    var form = document.editContactForm;
                    var contact = {
                        id: this.editMode === EditMode.Edit ? this.selectedId : undefined,
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        email: form.email.value
                    };
                    if (this.editMode == EditMode.Add) {
                        this.selectedId = this.contactService.create(contact);
                    }
                    else {
                        this.selectedId = this.contactService.update(contact);
                    }
                    this.drawContactsList();
                    this.drawContactsDetails();
                };
                ContactController.prototype.cancelEdit = function () {
                    if (this.selectedId == undefined) {
                        this.clearDetails();
                    }
                    else {
                        this.drawContactsDetails();
                    }
                };
                ContactController.prototype.clearDetails = function () {
                    var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
                    contactsDetailsContainer.innerHTML = '';
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
                return ContactController;
            }());
            exports_1("ContactController", ContactController);
        }
    };
});
//# sourceMappingURL=contact.controller.js.map