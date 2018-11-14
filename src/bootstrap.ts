/// <reference path="contact.service.ts" />
/// <reference path="contact.controller.ts" />

import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

function bootstrap():void {
    let contactService = new ContactService();
    let contactController = new ContactController(contactService);

    (<any>window).ctrl = contactController;
}

bootstrap();