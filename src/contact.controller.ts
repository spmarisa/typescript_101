import { ContactService } from './contact.service';
// import { EditMode } from './contact.service';


/// <reference path="contact.interface.ts" />
/// <reference path="contact-edit.form.ts" />
/// <reference path="edit-mode.enum.ts" />
/// <reference path="contacts.service.ts" />

export class ContactController {
    public selectedId = 1
    public editMode: EditMode;
    constructor(private contactService: ContactService) {
        this.drawContactsList();
        this.drawContactsDetails();
    }

    public drawContactsList():void {
        let contacts = this.contactService.getAll();
        let html = '<ul>'
		for( let ind in contacts ) {
			let contact = contacts[ind]
			html += 
				"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
					"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
					"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
				"</li>"
		}
        html += '</ul>'
        
        let container = document.getElementById('contactsListContainer');
        container.innerHTML = html;
    }

    public select(event: MouseEvent, contactId: number):void {
        event.preventDefault();
        this.selectedId = contactId;
        this.drawContactsDetails();
        this.drawContactsList();
    }

    public drawContactsDetails():void {
        let contact = this.contactService.get(this.selectedId);

        let container = document.getElementById('contactsDetailsContainer');
        container.innerHTML = 
        '<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
        '<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
        '<label>email: </label><b>' + contact.email + '</b><br/>' +
        '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
    }

    public edit(event: MouseEvent,  contactId: number):void {
        event.preventDefault();
        this.selectedId = contactId;
        this.editMode = EditMode.Edit;
        this.drawEditContactsDetails()
    }

    public add(event: MouseEvent):void {
        event.preventDefault();
        this.selectedId = undefined;
        this.editMode = EditMode.Add;
        this.drawContactsList();
        this.drawEditContactsDetails();
    }

    public drawEditContactsDetails():void {
        let contact: Contact;
        if(this.editMode === EditMode.Edit) {
            contact = this.contactService.get(this.selectedId);
        } else {
            contact = { 
                id: undefined,
                firstName: '',
                lastName: '',
                email: ''
            }
        }
        let contactId = contact.id;
        let container = document.getElementById('contactsDetailsContainer');
        container.innerHTML = '<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
        '<input name="contactId" type="hidden" value="' + contact.id + '">' +
        '<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
        '<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
        '<label>Email: </label><input name="email" value="' + contact.email + '"><br/>' +
        '<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
        '<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
        '</form>';

       let firstNameField = document.editContactForm.firstName 
       firstNameField.focus();
       firstNameField.select();
    }

    public remove(event, contactId: number) {
        event.preventDefault();
        this.contactService.remove(contactId);

        if(contactId == this.selectedId) {
            this.clearDetails();
        }

        this.drawContactsList();
    }

    public submit(event) {
        event.preventDefault();
        let isFormValid = this.validate();
        if(!isFormValid) {
            return;
        }
        let form = document.editContactForm;
        let contact = { 
            id: this.editMode === EditMode.Edit ? this.selectedId : undefined,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value
        }
        if( this.editMode == EditMode.Add) {
            this.selectedId = this.contactService.create(contact);
        } else {
            this.selectedId = this.contactService.update(contact);
        }

        this.drawContactsList();
        this.drawContactsDetails();
    }

    public cancelEdit() {
        if(this.selectedId == undefined) {
            this.clearDetails();
        } else {
            this.drawContactsDetails();
        }
    }

    private clearDetails() {
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        contactsDetailsContainer.innerHTML = '';
    }

    private validate(): boolean {
		let res = false;
		let form = document.editContactForm;
		
		if( !form.firstName.value )
			alert('First name is mandatory');
		else if( !form.lastName.value )
			alert('Last name is mandatory');
		else if( form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value) )
			alert('Invalid email');
		else
			res = true;
		
		return res;
	}
        
} 