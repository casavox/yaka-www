var InfoPro = function () {

    // Informations du Pro à connecter
    this.userFirstName = "Dominique";
    this.userLogin = 'dominique@victorleduc.net';
    this.userPwd = 'blabla';

    // Informations du professionnel à enregistrer
    this.firstName = "Victor";
    this.lastName = "LEDUC";
    this.password = "blabla";
    this.confirmPassword = "blabla";
    this.city = "Paris";
    this.phoneNumber = "0987654321";

    //------------ Génération aléatoire d'une adresse Mail
    this.mailNumber = function () {
        return Math.floor((Math.random() * (20 - 1) + 1) + (Math.random() * (20 - 1) + 1)+ (Math.random() * (20 - 1) + 1));
    };
    this.fakeMail = 'casavox.dev+regPro' + this.mailNumber() + '@gmail.com';


    //------------ Génération aléatoire d'un numéro de téléphone
    this.mailNumberp = function () {
        return (Math.random() * (20 - 1));
    }
    this.fakeNumber = '01' + (Math.floor(this.mailNumberp() * 10000000));

};

module.exports = InfoPro;
