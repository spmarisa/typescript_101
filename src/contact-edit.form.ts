interface ContactEditFormElement extends HTMLFormElement {
	contactId: HTMLInputElement
	firstName: HTMLInputElement
	lastName: HTMLInputElement
	email: HTMLInputElement
}

declare interface Document { editContactForm?: ContactEditFormElement }
