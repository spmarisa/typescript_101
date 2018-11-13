class ContactService{
    private CONTACTS: Contact[] = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ];

    getAll(): Contact[] {
        return this.CONTACTS;
    }

    getById(id): Contact{
        return this.CONTACTS.filter(x => x.id == id)[0];
    }

    deleteById(id: number): void {
		var ind = this.findIndexById(id);
		if( ind>=0 )
			this.CONTACTS.splice(ind,1);
	}
    
	private findIndexById(contactId: number): number {
		var contact = this.getById(contactId);
		if( !contact ) return -1;

		return this.CONTACTS.indexOf(contact);
	} 
}