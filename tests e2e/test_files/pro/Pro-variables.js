var InfoPro = function () {

    // Informations du Pro à connecter
    this.userFirstName = "Dominique";
    this.userLastName = "Leduc";
    this.userLogin = 'dominique@victorleduc.net';
    this.userPwd = 'blabla';

    // Informations du professionnel à enregistrer
    this.firstName = "Victor";
    this.lastName = "LEDUC";
    this.password = "blabla";
    this.confirmPassword = "blabla";
    this.city = "Paris";
    this.phoneNumber = "0987654321";

    // Fake mail and phone
    this.timeStamp = new Date().getTime();
    this.fakeMail = 'casavox.dev+regPro' + this.timeStamp + '@gmail.com';
    this.fakeNumber = '01' + this.timeStamp;
};

module.exports = InfoPro;
