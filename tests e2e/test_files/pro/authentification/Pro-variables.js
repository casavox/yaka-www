var InfoPro = function () {

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

};

module.exports = InfoPro;
