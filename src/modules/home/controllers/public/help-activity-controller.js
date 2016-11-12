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
                "title": "Peinture",
                "imgUrl": "../../../img/works_categories/Peinture.jpg",
                "paragraphs": [
                    {"p": "Vous avez prévu de revoir votre décoration intérieure ou refaire la peinture extérieure de votre habitat. Opération simple en apparence, vaste programme en réalité. Quels que soient vos besoins, Casavox est là pour vous connecter avec les peintres professionnels qui se chargent de répondre à vos exigences."},
                    {"p": "Notre réseau national est constitué de professionnels agréés et vérifiés par nos soins mais aussi et surtout recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Nos entrepreneurs vous proposeront un large choix de peintures et de papiers peints. Peu importe que vous ayez besoin de refaire une chambre ou toute une maison, Casavox peut vous aider à choisir le meilleur professionnel dans votre région."},
                    {"p": "Vous pouvez échanger très simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Pros offrent des services au-delà de la peinture et la pose de papiers peints, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Peinture", "Papier peint", "Carrelage mural", "Parement", "Lambris", "Enduit"]}
                ]
            },
            {
                "urlTitle": "cuisine",
                "title": "Cuisine",
                "imgUrl": "../../../img/works_categories/Cuisine.jpg",
                "paragraphs": [
                    {"p": "Qu'elle soit en kit ou sur mesure, vous n'aurez aucun problème à trouver 'votre' cuisine et ce, quels que soient le budget et la surface dont vous disposez. En revanche, aménager une cuisine nécessite de connaître quelques règles de bases. Éclairage, choix des matériaux, positionnement des équipements, etc"},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de l’aménagement de cuisine, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Cuisine complète", "Meubles de cuisine", "Plan de travail de cuisine"]}
                ]
            },
            {
                "urlTitle": "salle_de_bain",
                "title": "Salle de Bain",
                "imgUrl": "../../../img/works_categories/Salle_de_bain.jpg",
                "paragraphs": [
                    {"p": "Aménager une salle de bains peut-être un véritable casse-tête en fonction de la configuration de votre pièce, des arrivées d’eau, des positionnements des prises électriques… On comprend vite qu’il est nécessaire de se faire accompagnierque ce soit pour les travaux ou simplement pour avoir les idées et bien configurer sa salle de bain !"},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de l’aménagement de salle de bain, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Salle de bain complète", "Meubles de salle de bain", "Douche", "Cabine de douche", "Baignoire", "Lavabo"]}
                ]
            },
            {
                "urlTitle": "electricite",
                "title": "Electricité",
                "imgUrl": "../../../img/works_categories/Electricite.jpg",
                "paragraphs": [
                    {"p": "Notre réseau national est constitué d’électriciens qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous avez des travaux électrique à réaliser ?"},
                    {"p": "Casavox vous aide à choisir le meilleur électricien dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Que vous ayez besoin de faire de petites réparations électriques ou une grosse installation électrique dans votre habitat, il y a toujours un Pro sur notre plateforme Casavox prêt à vous aider."},
                    {"p": "Beaucoup de nos électriciens agréés offrent des services au-delà de la simple installation électrique n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux d’électricité. Aucun projet n’est trop grand ou trop petit pour nos électriciens de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Prise - câblage électrique", "Eclairage", "Radiateur sèche-serviettes", "Chauffe-eau", "Tableau électrique", "Compteur électrique", "Domotique", "Sécurité - Alarmes - Interphone …"]}
                ]
            },
            {
                "urlTitle": "plomberie",
                "title": "Plomberie",
                "imgUrl": "../../../img/works_categories/Plomberie.jpg",
                "paragraphs": [
                    {"p": "Notre réseau national est constitué de professionnels de la plomberie qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous avez des travaux de plomberie à réaliser ?"},
                    {"p": "Casavox vous aide à choisir le meilleur plombier dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Les services que ses Pros varient considérablement de la simple réparation domestique aux installations plus complexes. Que se soit pour un robinet qui fuit ou pour l’installation d’une nouvelle douche, il y a toujours un Pro sur notre plateforme Casavox prêt à vous aider."},
                    {"p": "La plupart de nos plombiers offrent des services au-delà de la plomberie, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de plomberie. Aucun projet n’est trop grand ou trop petit pour nos plombiers de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Toilettes", "Douche", "Baignoire", "Lavabo-évier", "Tuyauterie-canalisations", "Chaudière", "Chauffe-eau", "Adoucisseur d’eau"]}
                ]
            },
            {
                "urlTitle": "chauffage_climatisation",
                "title": "Chauffage - Climatisation",
                "imgUrl": "../../../img/works_categories/Climatisation.jpg",
                "paragraphs": [
                    {"p": "Des maisons trop chaudes et d’autres trop froides ! Chez Casavox, nous voulons nous assurer que la température de votre domicile est toujours la plus juste. Nous avons réunis au sein de Casavox des professionnels du chauffage, de la climatisation et de la ventilation qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous avez des travaux de chauffage ou climatisation à réaliser ?"},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Que vous ayez besoin de réparer un chauffage en prévision de l'hiver, ou entretenir votre climatisation pour être prêt à affronter les fortes températures de nos étés, notre réseau de professionnels est équipé pour intervenir sur tous les types d'installations, de réparations et d'entretien. Il y a toujours un Pro sur notre plateforme Casavox prêt à vous aider."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà du chauffage et la climatisation, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de chauffage et/ou climatisation. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Chaudière", "Chauffe-eau", "Radiateur sèche-serviette", "Chauffage au sol", "Thermostat", "Climatisation", "Pompe à chaleur", "Poêle-insert-Cheminée", "VMC"]}
                ]
            },
            {
                "urlTitle": "menuiserie_fenetre_veranda",
                "title": "Menuiserie - Fenetre - Véranda",
                "imgUrl": "../../../img/works_categories/Menuiserie.jpg",
                "paragraphs": [
                    {"p": "En bois, en aluminium ou en PVC, les fenêtres prennent aujourd'hui de multiples facettes et procurent des avantages bien différents selon le matériau avec lequel elles sont construites. Que vous ayez un projet de construction neuve ou de remplacement de fenêtres existantes notre réseau national est constitué de professionnels qui ont été agréés et vérifiés par nos soins, mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous avez des travaux de menuiserie à réaliser, une fenêtre à remplacer une véranda à poser ?"},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet de discuter simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Beaucoup de nos professionnels agréés offrent des services au-delà de la simple menuiserie, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de menuiserie. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Porte simple", "Porte multipoints", "Fenêtre de toit - velux", "Fenêtre", "Porte-fenêtre", "Volets", "Escalier", "Mezzanine", "Placards-rangements", "Véranda"]}
                ]
            },
            {
                "urlTitle": "serrurerie",
                "title": "Serrurerie",
                "imgUrl": "../../../img/works_categories/Serrurerie.jpg",
                "paragraphs": [
                    {"p": "Vous venez de claquer la porte de votre habitation, vous venez de perdre vos clefs et vous avez besoin d'ouvrir votre porte !"},
                    {"p": "Nous avons réunis au sein de Casavox des serruriers qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous avez des travaux de serrurerie à réaliser ?"},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Il y a toujours un Pro sur notre plateforme Casavox prêt à vous aider."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà du simple changement de serrure ou dépannage, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux et dépannages. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Serrure classique", "Serrure multipoint", "Serrurerie gâche électrique", "Verrou pour volets roulants", "Verrou pour rideau métalliques"]}
                ]
            },
            {
                "urlTitle": "revetement_sol",
                "title": "Revetement de sol",
                "imgUrl": "../../../img/works_categories/Sol_carrelage.jpg",
                "paragraphs": [
                    {"p": "Que vous ayez besoin d'installer un nouveau plancher dans votre maison ou réparer le carrelage de votre cuisine, Casavox est là pour vous connecter avec les Pros dont vous avez besoin."},
                    {"p": "Notre réseau national est constitué de professionnels agréés et vérifiés par nos soins mais aussi et surtout recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Nos entrepreneurs travaillent avec une grande variété de types de revêtements de sol, que ce soit du sol stratifié, du parquet ou du carrelage. Peu importe que vous ayez besoin de rénover un parquet ou poser un sol en marbre, Casavox peut vous aider à choisir le meilleur professionnel dans votre région."},
                    {"p": "Vous pouvez échanger très simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Pros offrent des services au-delà de la pose de sol, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de sol. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Carrelage", "Faïence", "Parquet", "Moquette", "Sol plastique (PVC)", "Pierre", "Béton", "Enduit"]}
                ]
            },
            {
                "urlTitle": "cloison_plafond_combles",
                "title": "Cloison - Plafond - Combles",
                "imgUrl": "../../../img/works_categories/Combles.jpg",
                "paragraphs": [
                    {"p": "Que vous ayez des cloisons à poser, un plafond à rénover ou des combles à aménager, Casavox est là pour vous connecter avec les Pros dont vous avez besoin."},
                    {"p": "L'aménagement de ses combles permet de gagner en surface habitable. C’est devenu une opération courante. Si les avantages sont nombreux, pour bien réussir l'aménagement de vos combles il faut prendre en compte quatre éléments de conception essentiels : les escaliers, l'isolation, l'électricité et la plomberie."},
                    {"p": "Casavox est constitué de professionnels agréés et vérifiés par nos soins mais aussi et surtout recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Vous pouvez échanger très simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Pros offrent des services au-delà de la pose de cloison, plafond ou combles. N’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"tags": ["Cloisons", "Plafonds", "Combles"]}
                ]
            },
            {
                "urlTitle": "isolation",
                "title": "Isolation",
                "imgUrl": "../../../img/works_categories/Isolation.jpg",
                "paragraphs": [
                    {"p": "Que ce soit pour une question de confort afin de vous protéger contre le froid, la chaleur ou les bruits, ou que ce soit pour réaliser des économies d’énergie, une bonne isolation est indispensable dans un habitat. Très encadrée par la réglementation, l’isolation doit s’adapter aux contraintes de votre habitation et à vos besoins. Pour ce faire, les fabricants mettent à votre disposition un large choix d’isolants aux qualités et aux applications très différentes."},
                    {"p": "Notre réseau national est constitué de professionnels agréés et vérifiés par nos soins mais aussi et surtout recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région pour réaliser vos travaux."},
                    {"p": "Vous pouvez échanger très simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Toiture - Charpentes",
                "imgUrl": "../../../img/works_categories/Toiture_charpente.jpg",
                "paragraphs": [
                    {"p": "Vous avez des doutes sur l'étanchéité de votre toiture ? Vous avez besoin de modifier ou refaire votre charpente ? Les problèmes d'étanchéité de toiture ne nécessitent pas tous le même niveau d'intervention."},
                    {"p": "Petit chantier ou grosse intervention nous avons réunis au sein de Casavox des professionnels qui ont été agréés et vérifiés par nos soins mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Portail - Portes de garage",
                "imgUrl": "../../../img/works_categories/Portail_portegarage.jpg",
                "paragraphs": [
                    {"p": "Le portail est aujourd’hui un élément décoratif visible de l'extérieur, donnant ainsi au visiteur la première impression de votre habitat. Le choix est parfois difficile quand il s’agit de choisir le portail qui conviendrait le mieux tant la variété dans les formes, les couleurs, les dimensions mais aussi les matériaux est importante."},
                    {"p": "Pour vous aider à bien choisir et poser votre portail, Casavox  vous met en contact avec des professionnels qui ont été agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Jardin - Terrasse - Cloture",
                "imgUrl": "../../../img/works_categories/jardin.jpg",
                "paragraphs": [
                    {"p": "Que ce soit pour aménager votre jardin, poser une clôture ou poser votre terrasse, il vous faudra prendre le temps de bien vous faire conseiller pour bien comprendre les avantages de chaque matériau."},
                    {"p": "Clôture décorative, clôture en PVC, clôture pour se protéger du vis-à-vis et clôture à petit prix, vous avez un choix très large pour agrémenter votre jardin."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels qui ont été agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Conseil - Architecte - Paysagiste",
                "imgUrl": "../../../img/works_categories/Archi_deco.jpg",
                "paragraphs": [
                    {"p": "Particulier ou professionnel, quel que soit votre projet : rénovation, construction, extension, décoration, aménagement d’espace intérieur et extérieur, il est recommandé de faire appel au bon professionnel qu’il soit architecte, paysagiste, décorateur d’intérieur pour obtenir de précieux conseils et s’assurer de la bonne réalisation de vos travaux."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Rénovation",
                "imgUrl": "../../../img/works_categories/Renovation.jpg",
                "paragraphs": [
                    {"p": "Quand vous allez refaire des pièces complètes qui nécessite de réaliser divers type de travaux d’électricité, de plomberie… Nous vous proposons de sélectionner la catégorie multi travaux en indiquant le nombre de pièces concernées et d’expliquer en détail les travaux que vous souhaitez réaliser."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Construction - Gros oeuvre",
                "imgUrl": "../../../img/works_categories/Construction.jpg",
                "paragraphs": [
                    {"p": "Les travaux sont souvent synonymes de « construction ». Un tel domaine regroupe de nombreux sujets, qu'il s'agisse des démarches liées à la construction, des techniques innovantes pour construire, en passant par les solutions écologiques pour l'habitat et les matériaux. Sans oublier que la construction n'est pas forcément à cantonnée au neuf, mais peut s'immiscer dans la rénovation…"},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
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
                "title": "Contacter les meilleurs menuisiers professionnels dans la région de Compiègne dans l’Oise",
                "imgUrl": "../../../img/works_categories/Menuiserie_oise.png",
                "paragraphs": [
                    {"p": "Dans la catégorie menuiserie, fenêtre et véranda, sur la région de Compiègne dans l’Oise, grâce à CasaVOX vous pourrez trouver les meilleurs professionnels pour les travaux concernant l’installation, la réparation et la rénovation d’une baie coulissante double vantaux (2 vantaux), de fenêtre double vantaux, d’un volet roulant électrique, d’un volet roulant manuel ou de mécanisme de volet roulant (motorisation de volet roulant) on retrouve également des projets de travaux de pose d'un volet roulant manuel, solaire ou store, de fenêtre de toit (type velux), d’un store banne motorisé ou manuel, ainsi que la pose, la réparation ou la rénovation d’une porte de garage coulissante, et de porte de garage sectionnable, porte de garage manuel ou motorisé avec télécommande et capteur de présence."},
                    {"p": "Associé aux travaux de menuiserie on retrouve bien sûr les projets de montage, d’installation de pose et d’aménagement de placard, de porte coulissante pour placard et dressing."},
                    {"p": "En bois, en aluminium ou en PVC, les travaux de menuiserie, fenêtre et véranda prennent aujourd'hui de multiples facettes et procurent des avantages bien différents selon le matériau avec lequel ils sont réalisés."},
                    {"p": "Que vous ayez un projet de construction neuve ou de remplacement de fenêtres existantes notre réseau de Professionnels de confiance dans l’Oise est constitué de menuisiers expérimentés et recommandés par votre entourage, voisins collègues et amis, de la communauté CasaVOX."},
                    {"p": "CasaVOX vous aide à choisir le meilleur professionnel autour de Compiègne, dans votre région de l’Oise et vous permet de discuter simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "Beaucoup de nos professionnels agréés offrent des services au-delà de la simple menuiserie, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez CasaVOX est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux de menuiserie. Aucun projet n’est trop grand ou trop petit pour nos Pros de confiance."},
                    {"p": "Pour la région de Compiègne dans l’Oise - département 60 - nos professionnels de confiance peuvent réaliser vos projets de travaux de menuiserie :"},
                    {"p": "Remplacement d'une baie coulissante 2 vantaux volet roulant intégré / Remplacement d'une baie coulissante 2 vantaux / Pose d'aménagement de placard classique à 3 éléments / Remplacement d'une baie coulissante 2 vantaux en rénovation / Remplacement d'une fenêtre 2 vantaux en rénovation / Pose d'une porte coulissante / Remplacement d'une fenêtre 2 vantaux avec volet roulant / Remplacement d'une porte d'entrée / Remplacement d'une fenêtre 2 vantaux / Pose d'un auvent / Remplacement d'une fenêtre de toit ≤ 78x98cm / Pose d'un store banne manuel / Pose d'une porte de garage enroulable / Pose d'un volet roulant électrique / Pose d'un volet roulant sur baie coulissante / Réglage d'un store banne / Installation d'une motorisation volet roulant / Pose d'une porte de garage sectionnelle 200x240cm / Pose d'un store banne motorisé jusqu'à 5 m x 3.50 m / Remplacement d'une fenêtre de toit de 78x98cm à 140x134cm / Pose d'une porte de garage sectionnelle 200x300cm / Pose d'un volet roulant sur fenêtre 2 vantaux / Pose d'un volet roulant manuel, solaire ou store / Pose d'une porte de garage coulissante / Pose d'un store banne motorisé de 5 à 6 m x 3.50 m / Remplacement d'un vitrage fenêtre de toit ≤ 78x98cm / Remplacement de vitrage 78 x 98 cm pour fenêtre de toit / Etc."},
                    {"p": "Pour toute question ou remarque concernant la recherche d’un professionnel pour vos travaux de fenêtre, la recherche d’un professionnel pour vos travaux sur une véranda, la recherche d’un professionnel pour vos travaux sur une porte, de même que vos travaux sur un escalier, vos travaux sur une mezzanine, vos travaux sur des placards ou rangements, etc. sur la région de Compiègne n’hésitez pas à nous joindre via le Support CasaVOX."},
                    {"p": ""},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’un artisan qualifié et recommandé par vos voisins et collègues."}
                ],
                "subText": [
                    {"q": "Travaux les plus couramment réalisés par nos professionnels du batiment CasaVOX dans la région de Compiègne Oise :"},
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
