var InfoCustomer = function () {

    // Informations du particulier à enregistrer // RegisterByEmail
    this.firstName = "Gregory";
    this.lastName = "BIZET";
    this.password = "blabla";
    this.confirmPassword = "blabla";
    this.city = "Paris";
    this.phoneNumber = "0187654321";

    this.mailNumber = function () {
        return Math.floor((Math.random() * (20 - 1) + 1) + (Math.random() * (20 - 1) + 1)+ (Math.random() * (20 - 1) + 1) + (Math.random() * (20 - 1) + 1));
    }
    this.fakeMail = 'casavox.dev+reg' + this.mailNumber() + '@gmail.com';


    // Informations LOGIN du particulier
    this.userLogin = 'gregorybizet@hotmail.com';
    this.userPwd = 'blabla';

    // Information LOGIN pour mot de passe oublié
    this.forgetLogin = 'gregorybizet@gmail.com';

    // Informations contact AMI ajouté
    this.mailNumberf = function () {
        return Math.floor((Math.random() * (999 - 1) + 1));
    };
    this.fakeFriendMail = 'casavox.dev+f' + this.mailNumberf() + '@gmail.com';


    // Informations contact PRO(famille) ajouté
    this.ProfirstName = "Grégory";
    this.ProlastName = "BIZET";
    this.Procity = "Paris";
    this.ProphoneNumber = "0187654321";

    this.timeStamp = new Date().getTime();

    this.fakeProMail = 'casavox.dev+pro' + this.timeStamp + '@gmail.com';
    this.fakeNumber = '01' + this.timeStamp;
};

module.exports = InfoCustomer;
