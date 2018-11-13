class ContactController{
    public selectedId = 1;

    constructor(private contactService: ContactService){
        this.drawContactList();

        this.drawViewDetails(this.selectedId);
    }

    drawContactList() :void{
        let allContacts = this.contactService.getAll();
        let html = '<ul>'

        for(let i in allContacts){
            let contact = allContacts[i]

            html += 
				"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
					"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
					"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
                "</li>"
                
        }

        html += '</ul>'

		let contactsListContainer = document.getElementById('contactsListContainer');
		contactsListContainer.innerHTML = html;
    }

    drawViewDetails(contactId: number): void {
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		let contact = this.contactService.getById(contactId);
		contactsDetailsContainer.innerHTML = 
			'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
			'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
			'<label>email: </label><b>' + contact.email + '</b><br/>' +
			'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
    }
    
    select(event: any, id: number ){
        this.selectedId = id;
        this.drawViewDetails(this.selectedId);
        this.drawContactList();
    }
}