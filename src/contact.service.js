// declare interface Array<T> {
// 	find(f: (T) => boolean ): T
// }
System.register([], function (exports_1, context_1) {
    "use strict";
    var ContactService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {// declare interface Array<T> {
            // 	find(f: (T) => boolean ): T
            // }
            ContactService = /** @class */ (function () {
                function ContactService() {
                    this.CONTACTS = [
                        { id: ContactService._contactId++, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
                        { id: ContactService._contactId++, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
                        { id: ContactService._contactId++, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
                        { id: ContactService._contactId++, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
                        { id: ContactService._contactId++, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
                    ];
                }
                ContactService.prototype.getAll = function () {
                    return this.CONTACTS;
                };
                ContactService.prototype.get = function (id) {
                    return this.findById(id);
                };
                ContactService.prototype.create = function (contact) {
                    contact.id = ContactService._contactId++;
                    this.CONTACTS.push(contact);
                    return contact.id;
                };
                ContactService.prototype.update = function (contact) {
                    var idx = this.findIndexById(contact.id);
                    this.CONTACTS.splice(idx, 1, contact);
                    return contact.id;
                };
                ContactService.prototype.remove = function (id) {
                    var index = this.findIndexById(id);
                    this.CONTACTS.splice(index, 1);
                };
                ContactService.prototype.findById = function (contactId) {
                    return this.CONTACTS.find(function (contact) { return contact.id == contactId; });
                };
                ContactService.prototype.findIndexById = function (contactId) {
                    var contact = this.findById(contactId);
                    if (!contact)
                        return -1;
                    return this.CONTACTS.indexOf(contact);
                };
                ContactService._contactId = 1;
                return ContactService;
            }());
            exports_1("ContactService", ContactService);
        }
    };
});
//# sourceMappingURL=contact.service.js.map