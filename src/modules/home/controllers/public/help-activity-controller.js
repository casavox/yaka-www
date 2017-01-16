(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HelpActivityController', HelpActivityController);

    //
    //Controller login
    function HelpActivityController($scope, $rootScope, networkService, alertMsg, $localStorage, $state, $translate, $auth, $stateParams) {


        var vm = this;
        vm.type = $stateParams.activity;

        vm.showLoginPopup = false;
        vm.loginTab = true;

        vm.activities = [
            {
                "urlTitle": "peinture",
                "title1": "Travaux de peinture",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux de peinture ?",
                "imgUrl": "../../../img/works_categories/Peinture.jpg",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, petite rénovation nécessitant des retouches de peinture sur des murs en bon état ou abîmé, peindre des nouvelles cloisons bruts, repeindre après avoir enlevé un papier peint ou gros travaux de rénovation dans votre logement, etc. Ne vous improvisez pas peintre professionnel, il existe des règles et des bonnes pratiques à suivre pour réaliser des travaux de peinture de qualité dans les locaux d'habitation :"},
                    {"l": " "},
                    {"tags": ["Repeindre une chambre", "Peindre une façade", "Ravalement de façade", "Préparer un mur avant peinture", "Peindre des poutres", "Peindre du lambris", "Peinture crépi, tadelakt, sur carrelage, faïence, ...", "Peinture isolante et anti-humidité", "Peinture extérieure", "Peindre un sol de garage", "..."]},
                    {"b": "Le mieux est de faire appel à un peintre offrant toutes les garanties !"},
                    {"p": "En effet, pour que vos travaux de peinture soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des assurances, certifications et qualifications des peintres professionnels, preuves de leur expertise : "},
                    {"b": "- Comment faire confiance à un peintre pour ses travaux ?"},
                    {"l": "Surtout quand cela touche à des considérations subjectives comme les ... goûts et les couleurs, la qualité et le bien-être dans son logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs peintres professionnels en toute confiance grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement la rénovation ou l’amélioration de son logement à un peintre en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) ou de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs goûts personnels."},
                    {"q": "« Connaissez-vous un bon peintre ? »"},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs peintres dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les peintres préférés de votre entourage de confiance et qui bien sûr sont tous des peintres professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables professionnels et surtout ces peintres-là vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de peinture et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance le peintre qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis,…) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de peinture les plus courants dans votre région réalisés par nos Pros CasaVox"},
                    {"l": "Installation / remplacement / réparation :"},
                    {"l": " "},
                    {"tags": ["Mur intérieur", "Plafond", "Mur extérieur", "Sol", "Façade", "Crépi", "Lambris", "Peinture isolante", "Peinture anti moisissure", "Peinture au pistolet", "Peinture sur carrelage", "Enduit tadelakt", "…"]}
                ]
            },
            {
                "urlTitle": "cuisine",
                "imgUrl": "../../../img/works_categories/Cuisine.jpg",
                "title1": "Cuisine",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux dans une cuisine ?",
                "paragraphs": [
                    {"l": "Les travaux dans une cuisine nécessitent souvent la maitrise de plusieurs corps de métier, petite rénovation nécessitant des retouches sur des murs ou l'installation d'une crédence, l'installation d'un évier double bac avec robinet à douchette, l'installation complète d'une nouvelle cuisine, l'installation d'un bar ou d'un îlot central de cuisine, petits ou gros travaux dans votre cuisine, etc. Ne vous improvisez pas cuisiniste professionnel, il existe des règles et des bonnes pratiques à suivre pour réaliser des travaux de qualité dans une cuisine :"},
                    {"l": " "},
                    {"tags": ["Installation d'une cuisine", "Plan de travail", "Cuisine intégrée", "Cuisine américaine", "Console de cuisine", "Cuisine ouverte", "Crédence de cuisine", "Cuisine équipée", "Cuisine sur mesure", "..."]},
                    {"b": "Le mieux est de faire appel à un cuisiniste offrant toutes les garanties !"},
                    {"p": "En effet, pour que les travaux dans votre cuisine soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des cuisinistes professionnels, preuves de leur expertise : "},
                    {"b": "- Comment faire confiance à un cuisiniste pour ses travaux ?"},
                    {"l": "Surtout quand cela touche à des considérations comme le bon fonctionnement de vos équipements, la qualité des travaux électrique et de plomberie dans la durée, le respect des plans et au final, la qualité et le bien-être de son logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs cuisinistes professionnels en toute confiance grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement la rénovation ou l’amélioration de sa cuisine à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs goûts personnels."},
                    {"q": "« Connaissez-vous un bon cuisiniste ? »"},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs cuisinistes dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les cuisinistes préférés de votre entourage de confiance et qui bien sûr sont tous des artisans professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables professionnels et surtout ces cuisinistes-là vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de cuisine et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance le cuisiniste qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de cuisine les plus courants dans votre région réalisés par nos Pros CasaVox"},
                    {"l": "Installation / remplacement / rénovation :"},
                    {"l": " "},
                    {"tags": ["Cuisine ouverte", "Plan de travail", "Evier", "Cuisine américaine", "Îlot central de cuisine", "Desserte de cuisine", "Cuisiniste", "Cuisine d'été", "Cuisine extérieur", "Cuisine complète", "…"]}
                ]
            },
            {
                "urlTitle": "salle_de_bain",
                "imgUrl": "../../../img/works_categories/Salle_de_bain.jpg",
                "title1": "Salle de bain - Salle d'eau",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux dans une salle de bain ?",
                "paragraphs": [
                    {"l": "Les travaux dans une salle de bain nécessitent souvent la maitrise de plusieurs corps de métier, pose de carrelage et faïence, installation de vasques simples ou doubles, installation ou rénovation complète d'une pièce d'eau, ... Que ce soit pour de petits ou gros travaux dans votre salle de bain, ne vous improvisez pas professionnel des travaux, il existe des règles et des bonnes pratiques à suivre pour réaliser des travaux de qualité dans une pièce d'eau :"},
                    {"l": " "},
                    {"tags": ["Installation d'une douche", "Remplacement d'une baignoire", "Installation d'une baignoire balnéo", "Création d'une salle d'eau", "Douche à l'italienne", "Meubles de salle de bains", "Salle de bain ouverte", "Cabine de douche", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel du bâtiment offrant toutes les garanties !"},
                    {"p": "Pour que les travaux dans votre salle de bain soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels spécialisés dans les travaux de salle de bain, preuves de leur expertise : "},
                    {"b": "- Comment faire confiance à un artisan pour ses travaux de salle de bain ?"},
                    {"l": "Surtout quand cela touche à des considérations comme le bon fonctionnement de vos équipements, la qualité dans la durée des travaux de maçonnerie, de carrelage, d'électricité et de plomberie, et le respect des plans pour au final atteindre la qualité et le bien-être recherchés dans une salle de bain !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs professionnels pour vos travaux de salle de bain en toute confiance grâce, à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement la rénovation ou l’amélioration de sa salle de bain à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs goûts et exigences personnels."},
                    {"q": "« Connaissez-vous un bon professionnel pour des travaux de salle de bain ? »"},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs experts dans votre région pour vos travaux de salle de bain sont ceux recommandés par vos cercles de confiance."},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous des professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de salle de bain et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l'artisan qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de salle de bain les plus courants dans votre région réalisés par nos Pros CasaVox"},
                    {"l": "Installation / pose / aménagement / rénovation :"},
                    {"l": " "},
                    {"tags": ["Salle de bain complète", "Meuble de salle de bain", "Evier vasque lavabo", "Douche italienne", "Balnéo", "Baignoire à remous", "Jacuzzi®", "Isolation humidité", "…"]}
                ]
            },
            {
                "urlTitle": "electricite",
                "title1": "Travaux d'électricité",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux électriques ?",
                "imgUrl": "../../../img/works_categories/Electricite.jpg",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, simple réparation électrique, petite rénovation électrique ou gros travaux électrique dans votre logement, ne vous improvisez pas électricien professionnel, la norme NFC 15-100 et ses 2 arrêtés (août 2016) fixent les règles des installations électriques dans les locaux d'habitation et apportent des précisions sur la sécurité des installations électriques et les réseaux de communication des logements."},
                    {"l": " "},
                    {"tags": ["Remplacer vos fusibles par des disjoncteurs différentiels", "Remplacer un interrupteur simple par un variateur", "Installer un éclairage extérieur", "Installer une prise de terre", "Installer une prise USB encastrée", "Poser un sèche-serviette", "Remettre aux normes son installation électrique", "..."]},
                    {"b": "Attention au bricolage sur votre installation électrique ! Le mieux est de ne pas prendre de risque."},
                    {"p": "Pour que les travaux soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels de l’électricité (RGE qualifelec®, Les pros de la performance énergétique®, ...) :"},
                    {"b": "- Comment faire confiance à un électricien pour ses travaux ?"},
                    {"l": "Surtout quand cela touche à la sécurité et à l’assurance de votre logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs électriciens professionnels en toute confiance grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement l’entretien ou l’amélioration de son logement à un électricien en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) ou de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs exigences personnelles."},
                    {"q": "« Connaissez-vous un bon électricien ? »"},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs électriciens dans votre région sont les électriciens recommandés par vos cercles de confiance."},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les électriciens préférés de votre entourage de confiance et qui bien sûr sont tous des électriciens professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables professionnels et surtout ces électriciens-là vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux d’électricité et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l’électricien qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis,…) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux d'électricités les plus courants dans votre région réalisés par nos Pros CasaVox"},
                    {"l": "Installation / remplacement / réparation :"},
                    {"l": " "},
                    {"tags": ["Prise - Câblage électrique", "Eclairage", "Radiateur sèche-serviettes", "Chauffe-eau", "Tableau électrique", "Compteur électrique", "Domotique", "Sécurité - Alarmes - Interphone", "Variateur", "…"]}
                ]
            },
            {
                "urlTitle": "plomberie",
                "title1": "Travaux de plomberie",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux de plomberie ?",
                "imgUrl": "../../../img/works_categories/Plomberie.jpg",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, suite à un dégât des eaux, pour régler une fuite d’eau, une simple réparation ou petite rénovation, de gros travaux de plomberie dans votre logement, etc. Ne vous improvisez pas plombier professionnel, il existe des règles et des normes à suivre pour réaliser des travaux de plomberie dans les locaux d'habitation en toute sécurité."},
                    {"l": " "},
                    {"tags": ["Entretien installation d’une chaudière", "Changer un robinet", "Aménagement installation d’une salle de bain", "Poser un sèche-serviette", "Déboucher un évier", "Entretien installation d’un adoucisseur d’eau", "Installer une douche ou baignoire", "Installer un lavabo dans une salle de bain", "Installer des WC suspendus", "..."]},
                    {"b": "Attention au bricolage sur votre installation, le risque de dégât des eaux est grand !"},
                    {"l": "Le mieux est de ne pas prendre de risque !"},
                    {"l": "En effet, pour que les travaux de plomberie soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des plombiers professionnels, preuves de l’expertise du plombier : "},
                    {"b": "- Comment faire confiance à un plombier pour ses travaux ?"},
                    {"l": "Surtout quand cela touche à la sécurité et à l’assurance de votre logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs plombiers professionnels en toute confiance grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement l’entretien ou l’amélioration de son logement à un plombier en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) ou de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs exigences personnelles."},
                    {"q": "« Connaissez-vous un bon plombier ? »"},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs plombiers dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les plombiers préférés de votre entourage de confiance et qui bien sûr sont tous des plombiers professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables professionnels et surtout ces plombiers-là vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de plomberie et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance le plombier qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis,…) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de plomberie les plus courants dans votre région réalisés par nos Pros CasaVox"},
                    {"l": "Installation / remplacement / réparation :"},
                    {"l": " "},
                    {"tags": ["Fuite d’eau", "Dégâts des eaux", "Chaudière", "Chauffage", "Chauffe-eau", "Toilettes", "Salle de bain", "Douche", "Baignoire", "Lavabo - Évier", "Tuyauterie - Canalisations", "Adoucisseur d'eau", "…"]}
                ]
            },
            {
                "urlTitle": "chauffage_climatisation",
                "imgUrl": "../../../img/works_categories/Climatisation.jpg",
                "title1": "Chauffage - Climatisation",
                "title2": "Vous envisagez de réaliser ou de faire faire des travaux sur votre chauffage ou climatisation ?",
                "paragraphs": [
                    {"l": "Les travaux de chauffage comme les travaux de climatisation nécessitent souvent des compétences particulières et reconnues, qu'il s'agisse de faire un bilan thermique, la maintenance d'une chaudière, étudier l'installation d'une climatisation réversible, ... Que ce soit pour se faire une idée du prix, ou faire réaliser des travaux de chauffage ou des travaux de climatisation, ne vous improvisez pas expert chauffagiste ou expert en climatisation, il existe des règles et des normes bien précises à suivre pour réaliser des travaux de qualité sur un système de chauffage ou de climatisation :"},
                    {"l": " "},
                    {"tags": ["Bilan thermique", "Convecteurs", "Chaudière", "Chauffage électrique", "Pompe à chaleur", "Chauffage fioul", "Climatisation réversible", "Chauffage au sol", "VMC", "Chauffage réversible", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel du bâtiment offrant toutes les garanties !"},
                    {"p": "En effet, pour que l'entretien et les travaux de chauffage comme ceux de climatisation soient de qualité et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels spécialisés dans les travaux de chauffage et les travaux de climatisation, preuves de leur expertise : "},
                    {"b": "- Comment faire confiance à un artisan pour l'entretien ou l'installation d'un système de chauffage ?"},
                    {"b": "- Comment faire confiance à un artisan pour l'entretien ou l'installation d'une climatisation ?"},
                    {"l": "Surtout quand cela touche à des considérations comme le bon fonctionnement d'équipements essentiels pour votre confort, la qualité dans la durée des installations, surtout que cela nécessite presque toujours quelques travaux de maçonnerie, d'électricité et de plomberie, et le respect des plans pour au final atteindre la qualité et le bien-être recherchés dans votre logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs professionnels pour l'installation et l'entretien de chauffage ou de climatisation, en toute confiance, grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement la maintenance ou l’amélioration de son chauffage à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs goûts et exigences personnels."},
                    {"b": "« Connaissez-vous un bon professionnel pour l'installation de mon chauffage ? »"},
                    {"b": "« Connaissez-vous un bon professionnel pour l'installation d'une climatisation ? »"},
                    {"l": " "},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs experts dans votre région pour vos travaux de chauffage et de climatisation sont ceux recommandés par vos cercles de confiance."},
                    {"l": " "},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous des professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de chauffage ou de climatisation et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l'artisan qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de chauffage ou de climatisation les plus courants dans votre région, réalisés par nos Pros CasaVox"},
                    {"l": "Installation / Réparation / Bilan / Maintenance / Entretien :"},
                    {"l": " "},
                    {"tags": ["Chauffage au fioul", "Pompe à chaleur", "Radiateur fonte", "Clim réversible", "Chauffage électrique", "Maintenance chaufferie", "Radiateur électrique", "Entretien climatisation", "Chauffage au sol", "Isolation humidité", "…"]}
                ]
            },
            {
                "urlTitle": "menuiserie_fenetre_veranda",
                "imgUrl": "../../../img/works_categories/Menuiserie.jpg",
                "title1": "Menuiserie - Fenêtre - Véranda",
                "title2": "Vous avez des projets de travaux sur des portes, fenêtres ou pour une véranda ?",
                "paragraphs": [
                    {"l": "En bois, en aluminium ou en PVC, les portes, fenêtres et véranda prennent aujourd'hui de multiples facettes et procurent des avantages bien différents selon le matériau avec lequel elles sont construites. Que vous ayez un projet de construction neuve, de réparation ou de remplacement de fenêtres, de portes ou d'installation de véranda, il vous faut prendre en compte les différents aspects de votre besoin, esthétique, sécuritaire, énergétique et isolation, confort, dimension, ... Que ce soit pour se faire une idée du prix, faire réaliser les travaux d'installation ou estimer l'économie d'énergie ou la performance énergétique ainsi que les aides (crédit d'impôt, éco-PTZ, ...), il existe des règles et des normes bien précises à suivre pour réaliser des travaux de qualité sur un vos portes, fenêtres et vérandas :"},
                    {"l": " "},
                    {"tags": ["Bilan thermique", "Porte-fenêtre", "Fenêtre en bois", "Baie-vitrée ", "Lucarnes", "Velux®", "Véranda en kit", "Double vitrage", "Porte fenêtre", "Véranda en alu", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel du bâtiment offrant toutes les garanties !"},
                    {"p": "En effet, pour que l'entretien et les travaux de menuiserie soient de qualité, dure dans le temps et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : RGE, Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels spécialisés dans les travaux de menuiserie, preuves de leur expertise : "},
                    {"b": "- Comment faire confiance à un artisan pour la réparation ou l'installation de fenêtres ?"},
                    {"b": "- Comment faire confiance à un artisan pour la réparation ou l'installation d'une véranda ?"},
                    {"l": "Surtout quand cela touche à la fois à votre confort, votre consommation énergétique et votre sécurité, c'est-à-dire un bien-être durable dans votre logement !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs professionnels pour l'installation et la réparation de vos portes, fenêtres ou véranda, en toute confiance, grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement ses travaux de menuiserie à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs goûts et exigences personnels."},
                    {"b": "« Connaissez-vous un bon professionnel pour la réparation ou l'installation de fenêtres ? »"},
                    {"b": "« Connaissez-vous un bon professionnel pour la réparation ou l'installation d'une véranda ? »"},
                    {"l": " "},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les meilleurs experts dans votre région pour vos travaux de menuiserie sont ceux recommandés par vos cercles de confiance."},
                    {"l": " "},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous des professionnels reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreuses plateformes de mise en relation entre particuliers et professionnels, promettant d’obtenir rapidement des devis pour vos travaux de portes, fenêtres ou véranda et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l'artisan qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de menuiserie les plus courants dans votre région, réalisés par nos Pros CasaVox"},
                    {"l": "Installation / Réparation / Bilan / Maintenance / Entretien :"},
                    {"l": " "},
                    {"tags": ["Portes coulissantes", "Double vitrage", "Lucarnes", "Véranda sur mesure", "Chauffage électrique", "Agrandissement de véranda", "Fenêtre sur mesure", "Volet roulant", "Fenêtre PVC", "…"]}
                ]
            },
            {
                "urlTitle": "serrurerie",
                "imgUrl": "../../../img/works_categories/Serrurerie.jpg",
                "title1": "Serrurerie",
                "title2": "Porte claquée ou cassée, clés cassées ou perdues, serrure coincée, ... Vous avez des travaux de serrurerie ?",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, serrure bloquée, clés abimée ou cassée, porte fracturée, dépannage, simple réparation, rénovation ou remplacement, ... Ne vous improvisez pas serrurier professionnel, il existe des règles et des normes à suivre pour réaliser des travaux de serrurier en toute sécurité."},
                    {"l": " "},
                    {"tags": ["Serrure de portail", "Serrure électrique", "Serrure 2 points", "Porte blindée", "Serrure 3 points", "Porte renforcée", "Verrou", "Gâche électrique", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel offrant toutes les garanties !"},
                    {"p": "En effet, pour que les travaux de serrurerie soient de qualité, dure dans le temps et soient couverts par votre assurance, il n'y a qu'une seule solution, établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des serruriers spécialisés, preuves de leur sérieux : "},
                    {"b": "- Comment faire confiance à un serrurier ?"},
                    {"l": "Surtout quand cela touche à la fois à votre porte monnaie et à votre sécurité !"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs serruriers professionnels en toute confiance, grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement ses travaux de serrurerie à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs situations et leurs exigences particulières."},
                    {"b": "« Connaissez-vous un bon serrurier professionnel ? »"},
                    {"l": " "},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les serruriers les plus sérieux dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"l": " "},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous des serruriers reconnus, assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et serruriers, cette méfiance est accentuée par de nombreux sites d'annuaire et plateformes de mise en relation, promettant d’obtenir rapidement des devis pour vos travaux de serrurerie et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger rapidement, en toute sécurité et très simplement avec chaque serrurier susceptible d’intervenir chez vous et surtout de décider à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance le serrurier qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de serrurerie les plus courants dans votre région, réalisés par nos Pros CasaVox"},
                    {"l": "Installation / Réparation / Devis :"},
                    {"l": " "},
                    {"tags": ["Serrure classique", "Serrure multipoint", "Serrurerie gâche électrique", "Verrou pour volets roulants", "Verrou pour rideau métallique", "..."]}
                ]
            },
            {
                "urlTitle": "revetement_sol",
                "title1": "Revêtement de sol",
                "imgUrl": "../../../img/works_categories/Sol_carrelage.jpg",
                "title2": "Intérieur ou extérieur, parquet, dallage, terrasse, papier peint, ... Vous avez des travaux de revêtement ?",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, poser une moquette, rénover un parquet, raffraichir un dallage, installer une terrasse, ... Que ce soit pour de petits ou gros travaux sur des revêtements de sols ou des revêtements de murs, ne vous improvisez pas professionnel des travaux, il existe des règles et des bonnes pratiques à suivre pour réaliser des travaux durables et de qualité :"},
                    {"l": " "},
                    {"tags": ["carrelage", "Vitrification d'un parquet", "Marbre", "Béton", "Moquette", "Pierres naturelles", "Lino.®", "Chape", "Terrasse", "Pierres reconstituées", "Margelle", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel du bâtiment offrant toutes les garanties !"},
                    {"p": "En effet, pour que l'entretien, la rénovation ou les travaux d'installation de vos revêtements soient de qualité et durent dans le temps, la meilleure solution est d'établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels du bâtiment, preuves de leur sérieux : "},
                    {"b": "- Comment faire confiance à un artisan pour des travaux sur des revêtements intérieurs ou extérieurs ?"},
                    {"l": " "},
                    {"q": "Avec CasaVox, contactez les meilleurs professionnels en toute confiance, grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement ses travaux à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs situations et leurs exigences particulières."},
                    {"b": "« Connaissez-vous un bon artisan pour mes travaux ? »"},
                    {"l": " "},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les artisans les plus sérieux dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"l": " "},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du batîment, cette méfiance est accentuée par de nombreux sites d'annuaire et plateformes de mise en relation, promettant d’obtenir rapidement des devis pour vos travaux et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger rapidement, en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir pour poser vos nouveaux revêtment de sol, ou revêtement de murs et grâce à CasaVox, vous seul décidez à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l'artisan qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux de revêtement les plus courants dans votre région, réalisés par nos Pros CasaVox"},
                    {"l": "Installation / Pose / Rénovation / Devis :"},
                    {"l": " "},
                    {"tags": ["Papier peint", "Carrelage", "Faïence", "Parquet", "Moquette", "Sol plastique", "Sol PVC", "Lambris", "Parement", "Pierre", "Béton", "Enduit", "..."]}
                ]
            },
            {
                "urlTitle": "cloison_plafond_combles",
                "title1": "Cloison - Plafond - Combles",
                "imgUrl": "../../../img/works_categories/Combles.jpg",
                "title2": "Vous avez des cloisons à poser, un plafond à rénover, des combles à aménager, ... ?",
                "paragraphs": [
                    {"l": "Quelle que soit l’ampleur des travaux à réaliser, isoler vos combles perdus, aménager vos combles habitables, créer une pièce en faisant poser des cloisons, habiller vos murs bruts, agrandir une pièce en ouvrant une cloison, ... Pour de petits ou gros travaux sur des cloisons, des combles ou plafonds, ne vous improvisez pas professionnel des travaux, il existe des règles et des bonnes pratiques à suivre pour réaliser des travaux durables et de qualité :"},
                    {"l": " "},
                    {"tags": ["Cloison", "Faux plafond" , "Plafond suspendu", "Isolation de combles", "Staff", "Stuc", "Aménagement de combles", "Grenier", "Mur porteur", "Cloison en placo plâtre", "..."]},
                    {"b": "Le mieux est de faire appel à un professionnel du bâtiment offrant toutes les garanties !"},
                    {"p": "En effet, pour que la rénovation ou les travaux d'installation de vos cloisons, plafonds ou combles soient de qualité et durent dans le temps, la meilleure solution est d'établir un contrat avec un professionnel offrant les assurances et garanties adaptées aux travaux à réaliser : Responsabilité civile de l'entreprise, garantie de parfait achèvement, garantie des équipements, assurance dommage-ouvrage, etc."}
                ],
                "subText": [
                    {"l": "Au-delà des certifications, agréments et qualifications des professionnels du bâtiment, preuves de leur sérieux : "},
                    {"b": "- Comment faire confiance à un artisan pour des travaux sur des combles, cloisons ou un plafond ?"},
                    {"l": " "},
                    {"l": "Surtout quand cela touche à des considérations comme la qualité dans la durée des travaux de maçonnerie, de carrelage, d'électricité voir de plomberie, et le respect des plans pour au final atteindre la qualité et le bien-être recherchés dans votre logement !"},
                    {"q": "Avec CasaVox, contactez les meilleurs professionnels en toute confiance, grâce à un système unique de recommandation personnalisée entre proches."},
                    {"p": "Il est très difficile de confier sereinement ses travaux à un artisan en le choisissant sur un site de type annuaire, devis en ligne ou service de mise en relation, uniquement à l’aide de notes moyennes (en générale de 0 à 5 étoiles) et de l’avis plus ou moins vérifiés de potentiels anciens clients dont vous ne connaissez rien, à commencer par leurs situations et leurs exigences particulières."},
                    {"b": "« Connaissez-vous un bon artisan pour mes travaux d'aménagement d'espace ? »"},
                    {"l": " "},
                    {"l": "CasaVox s’inspire de la “vraie vie” en portant sur internet le principe de bouche-à-oreille :"},
                    {"b": "Les artisans les plus sérieux dans votre région sont ceux recommandés par vos cercles de confiance."},
                    {"l": " "},
                    {"p": "Seul CasaVox vous permet d’entrer directement en contact avec les artisans préférés de votre entourage de confiance et qui bien sûr sont tous assurés et sérieux, vos travaux sont ainsi réalisés par de véritables Pros et surtout, ces artisans vous sont personnellement recommandés par vos amis, collègues et voisins."},
                    {"p": "CasaVox est bien conscient de la problématique liée à la méfiance mutuelle entre particuliers et professionnels du bâtiment, cette méfiance est accentuée par de nombreux sites d'annuaire et plateformes de mise en relation, promettant d’obtenir rapidement des devis pour vos travaux et qui revendent ensuite vos coordonnées aux plus offrants."},
                    {"q": "CasaVox vous permet d’échanger rapidement, en toute sécurité et très simplement avec chaque artisan susceptible d’intervenir pour poser vos cloisons, aménager vos combles, ou intervenir sur vos plafonds et grâce à CasaVox, vous seul décidez à qui et quand vous diffusez vos coordonnées personnelles. Vous pouvez alors choisir en toute confiance l'artisan qui correspond le plus à vos attentes."},
                    {"p": "CasaVox vous permet de conserver l’historique de vos échanges (messages, photos, devis, …) et de rester en contact avec le Pro que vous aurez retenu, pour de futurs travaux et pour le recommander à votre tour dans vos cercles d’amis, de collègues et de voisinage."},
                    {"b": "CasaVox encourage la recommandation de professionnels du bâtiment entre proches, à chaque fois qu’un de vos proches suit votre recommandation : vous pouvez gagner 10€"},
                    {"l": "(référez-vous aux CGU pour plus d'informations)."},
                    {"l": " "},
                    {"b": "Travaux d'aménagement d'espace de type cloison, plafond, combles..."},
                    {"l": "Installation / Pose / Rénovation / Devis :"},
                    {"l": " "},
                    {"tags": ["Cloisons", "Plafonds", "Combles", "Plaques de platre", "Grenier", "..."]}
                ]
            },
            {
                "urlTitle": "isolation",
                "title1": "Isolation",
                "imgUrl": "../../../img/works_categories/Isolation.jpg",
                "paragraphs": [
                    {"p": "Que ce soit pour une question de confort afin de vous protéger contre le froid, la chaleur ou les bruits, ou que ce soit pour réaliser des économies d’énergie, une bonne isolation est indispensable dans un habitat. Très encadrée par la réglementation, l’isolation doit s’adapter aux contraintes de votre habitation et à vos besoins. Pour ce faire, les fabricants mettent à votre disposition un large choix d’isolants aux qualités et aux applications très différentes."},
                    {"p": "Notre réseau national est constitué de professionnels agréés et vérifiés par nos soins mais aussi et surtout recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région pour réaliser vos travaux."},
                    {"p": "Vous pouvez échanger très simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Pros offrent des services au-delà de la pose d’isolants, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour tous vos travaux. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Isolation thermique intérieure", "Isolation thermique extérieure", "Isolation des combles", "Isolation phonique"]}
                ]
            },
            {
                "urlTitle": "toiture_charpentes",
                "title1": "Toiture - Charpentes",
                "imgUrl": "../../../img/works_categories/Toiture_charpente.jpg",
                "paragraphs": [
                    {"p": "Vous avez des doutes sur l'étanchéité de votre toiture ? Vous avez besoin de modifier ou refaire votre charpente ? Les problèmes d'étanchéité de toiture ne nécessitent pas tous le même niveau d'intervention."},
                    {"p": "Petit chantier ou grosse intervention nous avons réunis au sein de Casavox des professionnels qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de la pose de toiture ou de charpente, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Toiture", "Charpente en bois", "Charpente métallique"]}
                ]
            },
            {
                "urlTitle": "portail_portes_de_garage",
                "title1": "Portail - Portes de garage",
                "imgUrl": "../../../img/works_categories/Portail_portegarage.jpg",
                "paragraphs": [
                    {"p": "Le portail est aujourd’hui un élément décoratif visible de l'extérieur, donnant ainsi au visiteur la première impression de votre habitat. Le choix est parfois difficile quand il s’agit de choisir le portail qui conviendrait le mieux tant la variété dans les formes, les couleurs, les dimensions mais aussi les matériaux est importante."},
                    {"p": "Pour vous aider à bien choisir et poser votre portail, Casavox  vous met en contact avec des professionnels qui ont été agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de la pose portail ou porte de garage, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Portail", "Portail électrique", "Porte de garage", "Porte de garage électrique"]}
                ]
            },
            {
                "urlTitle": "jardin_terrasse_cloture",
                "title1": "Jardin - Terrasse - Cloture",
                "imgUrl": "../../../img/works_categories/jardin.jpg",
                "paragraphs": [
                    {"p": "Que ce soit pour aménager votre jardin, poser une clôture ou poser votre terrasse, il vous faudra prendre le temps de bien vous faire conseiller pour bien comprendre les avantages de chaque matériau."},
                    {"p": "Clôture décorative, clôture en PVC, clôture pour se protéger du vis-à-vis et clôture à petit prix, vous avez un choix très large pour agrémenter votre jardin."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels qui ont été agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de l’aménagement d’espace extérieur, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Jardin et espaces verts", "Terrasse (bois et pvc)"]}
                ]
            },
            {
                "urlTitle": "conseil_architecte_paysagiste",
                "title1": "Conseil - Architecte - Paysagiste",
                "imgUrl": "../../../img/works_categories/Archi_deco.jpg",
                "paragraphs": [
                    {"p": "Particulier ou professionnel, quel que soit votre projet : rénovation, construction, extension, décoration, aménagement d’espace intérieur et extérieur, il est recommandé de faire appel au bon professionnel qu’il soit architecte, paysagiste, décorateur d’intérieur pour obtenir de précieux conseils et s’assurer de la bonne réalisation de vos travaux."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà du conseil et du suivi de chantier, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Conseil d’architecte", "Décoration/aménagement d’intérieur", "Home staging", "Aménagement extérieur"]}
                ]
            },
            {
                "urlTitle": "renovation",
                "title1": "Rénovation",
                "imgUrl": "../../../img/works_categories/Renovation.jpg",
                "paragraphs": [
                    {"p": "Quand vous allez refaire des pièces complètes qui nécessite de réaliser divers type de travaux d’électricité, de plomberie… Nous vous proposons de sélectionner la catégorie multi travaux en indiquant le nombre de pièces concernées et d’expliquer en détail les travaux que vous souhaitez réaliser."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services qui peuvent couvrir plusieurs types de travaux pour vos chantiers, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Salon", "Séjour", "Bureau", "Chambre", "Salle de bain", "Cuisine", "Combles", "Garage"]}
                ]
            },
            {
                "urlTitle": "construction_gros_oeuvre",
                "title1": "Construction - Gros oeuvre",
                "imgUrl": "../../../img/works_categories/Construction.jpg",
                "paragraphs": [
                    {"p": "Les travaux sont souvent synonymes de « construction ». Un tel domaine regroupe de nombreux sujets, qu'il s'agisse des démarches liées à la construction, des techniques innovantes pour construire, en passant par les solutions écologiques pour l'habitat et les matériaux. Sans oublier que la construction n'est pas forcément à cantonnée au neuf, mais peut s'immiscer dans la rénovation…"},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels peuvent intervenir sur de nombreux types de travaux, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Construction rénovation d’une maison", "Construction/rénovation d’un garage", "Construction d’une extension", "Construction de fondations", "Construction d’une piscine"]}
                ]
            },
            {
                "urlTitle": "menuiserie_compiegne_oise",
                "title1": "Contacter les meilleurs menuisiers professionnels dans la région de Compiègne dans l’Oise",
                "imgUrl": "../../../img/works_categories/Menuiserie_oise.png",
                "paragraphs": [
                    {"p": "Dans la catégorie menuiserie, fenêtre et véranda, sur la région de Compiègne dans l’Oise, grâce à CasaVOX vous pourrez trouver les meilleurs professionnels pour des travaux concernant l’installation, la réparation et la rénovation d’une baie coulissante double vantaux (2 vantaux), de fenêtre double vantaux, d’un volet roulant électrique, d’un volet roulant manuel ou de mécanisme de volet roulant (motorisation de volet roulant) on retrouve également des projets de travaux de pose d'un volet roulant manuel, solaire ou store, de fenêtre de toit (type velux), d’un store banne motorisé ou manuel, ainsi que la pose, la réparation ou la rénovation d’une porte de garage coulissante, et de porte de garage sectionnable, porte de garage manuel ou motorisé avec télécommande et capteur de présence."},
                    {"p": "Associé aux travaux de menuiserie on retrouve bien sûr les projets de montage, d’installation de pose et d’aménagement de placard, de porte coulissante pour placard et dressing."},
                    {"p": "En bois, en aluminium ou en PVC, les travaux de menuiserie, fenêtre et véranda prennent aujourd'hui de multiples facettes et procurent des avantages bien différents selon le matériau avec lequel ils sont réalisés."},
                    {"p": "Que vous ayez un projet de construction neuve ou de remplacement de fenêtres existantes notre réseau de Professionnels de confiance dans l’Oise est constitué de menuisiers expérimentés et recommandés par votre entourage, voisins collègues et amis, de la communauté CasaVOX."},
                    {"p": "CasaVOX vous aide à choisir le meilleur professionnel autour de Compiègne, dans votre région de l’Oise et vous permet de discuter simplement avec chaque artisan susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Beaucoup de nos professionnels agréés offrent des services au-delà de la simple menuiserie, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez CasaVOX est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de menuiserie. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"p": "Pour la région de Compiègne dans l’Oise - département 60 - nos professionnels de confiance peuvent réaliser vos projets de travaux de menuiserie :"},
                    {"p": "Remplacement d'une baie coulissante 2 vantaux volet roulant intégré / Remplacement d'une baie coulissante 2 vantaux / Pose d'aménagement de placard classique à 3 éléments / Remplacement d'une baie coulissante 2 vantaux en rénovation / Remplacement d'une fenêtre 2 vantaux en rénovation / Pose d'une porte coulissante / Remplacement d'une fenêtre 2 vantaux avec volet roulant / Remplacement d'une porte d'entrée / Remplacement d'une fenêtre 2 vantaux / Pose d'un auvent / Remplacement d'une fenêtre de toit ≤ 78x98cm / Pose d'un store banne manuel / Pose d'une porte de garage enroulable / Pose d'un volet roulant électrique / Pose d'un volet roulant sur baie coulissante / Réglage d'un store banne / Installation d'une motorisation volet roulant / Pose d'une porte de garage sectionnelle 200x240cm / Pose d'un store banne motorisé jusqu'à 5 m x 3.50 m / Remplacement d'une fenêtre de toit de 78x98cm à 140x134cm / Pose d'une porte de garage sectionnelle 200x300cm / Pose d'un volet roulant sur fenêtre 2 vantaux / Pose d'un volet roulant manuel, solaire ou store / Pose d'une porte de garage coulissante / Pose d'un store banne motorisé de 5 à 6 m x 3.50 m / Remplacement d'un vitrage fenêtre de toit ≤ 78x98cm / Remplacement de vitrage 78 x 98 cm pour fenêtre de toit / Etc."},
                    {"p": "Pour toute question ou remarque concernant la recherche d’un professionnel pour des travaux de fenêtre, la recherche d’un professionnel pour des travaux sur une véranda, la recherche d’un professionnel pour des travaux sur une porte, de même que des travaux sur un escalier, des travaux sur une mezzanine, des travaux sur des placards ou rangements, etc. sur la région de Compiègne n’hésitez pas à nous joindre via le Support CasaVOX."},
                    {"p": ""},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’un artisan qualifié et recommandé par vos voisins et collègues."}
                ],
                "subText": [
                    {"q": "Travaux les plus couramment réalisés par nos professionnels du bâtiment CasaVOX dans la région de Compiègne Oise :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Porte simple", "Porte multipoints", "Fenêtre de toit - velux", "Fenêtre", "Porte-fenêtre", "Volets", "Escalier", "Mezzanine", "Placards-rangements", "Véranda"]}
                ]
            }
        ];
        vm.getActivity = function () {
            for (var i = 0; i < vm.activities.length; i++) {
                if (vm.activities[i].urlTitle == vm.type) {
                    return vm.activities[i];
                }
            }
        };

        if (!vm.getActivity()) {
            $state.go("home");
        }

        $rootScope.pageName = vm.getActivity().title;


    }
})
();
