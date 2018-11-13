/// <reference path="contact.service.ts" />
/// <reference path="contact.controller.ts" />

function bootstrap():void {
    let contactService = new ContactService();
    let contactController = new ContactController(contactService);

    (<any>window).ctrl = contactController;
}

bootstrap();