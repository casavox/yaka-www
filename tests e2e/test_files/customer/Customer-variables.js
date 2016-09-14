var InfoCustomer = function () {

    // Informations du particulier à enregistrer // RegisterByEmail
    this.firstName = "Gregory";
    this.lastName = "BIZET";
    this.password = "blabla";
    this.confirmPassword = "blabla";
    this.city = "Paris";
    this.phoneNumber = "0187654321";

    // Informations LOGIN du particulier
    this.userLogin = 'gregorybizet@hotmail.com';
    this.userPwd = 'blabla';

    // Information LOGIN pour mot de passe oublié
    this.forgetLogin = 'gregorybizet@gmail.com';

    // Informations contact PRO(famille) ajouté
    this.ProfirstName = "Grégory";
    this.ProlastName = "BIZET";
    this.Procity = "Paris";
    this.ProphoneNumber = "0187654321";

    // Fake mails and phones number
    this.timeStamp = new Date().getTime();
    this.fakeNumber = '01' + this.timeStamp;
    this.fakeProMail = 'casavox.dev+pro' + this.timeStamp + '@gmail.com';
    this.fakeFriendMail = 'casavox.dev+f' + this.timeStamp + '@gmail.com';
    this.fakeMail = 'casavox.dev+reg' + this.timeStamp + '@gmail.com';
};

module.exports = InfoCustomer;
