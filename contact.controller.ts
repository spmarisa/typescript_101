class ContactController{
    constructor(private contactService: ContactService){
        console.log("Hello");
        console.log(contactService.getAll());
    }
}