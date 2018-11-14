// declare interface Array<T> {
// 	find(f: (T) => boolean ): T
// }

export class ContactService {
	private static _contactId = 1;
	private CONTACTS: Contact[] = [
			{ id: ContactService._contactId++, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
			{ id: ContactService._contactId++, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
			{ id: ContactService._contactId++, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
			{ id: ContactService._contactId++, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
			{ id: ContactService._contactId++, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];
        
    constructor() {}

    public getAll(): Contact[] {
        return this.CONTACTS;
    }

    public get(id:number): Contact {
        return this.findById(id);
    }

    public create(contact: Contact):number {
        contact.id = ContactService._contactId++;
        this.CONTACTS.push(contact);

        return contact.id;
    }

    public update(contact: Contact) {
        let idx = this.findIndexById(contact.id);
        this.CONTACTS.splice(idx, 1 , contact)
        return contact.id;
    }

    public remove(id: number) {
        let index = this.findIndexById(id);
        this.CONTACTS.splice(index , 1);
    }

    private findById(contactId:number):Contact  {
        return this.CONTACTS.find(contact => contact.id == contactId)
    }

    private findIndexById(contactId) {
        var contact = this.findById(contactId);
        if( !contact ) return -1;
        
        return this.CONTACTS.indexOf(contact);
    }
}