var ContactService = /** @class */ (function () {
    function ContactService() {
    }
    return ContactService;
}());
var Contact = /** @class */ (function () {
    function Contact() {
    }
    return Contact;
}());
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("hello");
var button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function () {
    alert(greeter.greet());
};
document.body.appendChild(button);
//# sourceMappingURL=app.js.map