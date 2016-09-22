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
                "imgUrl": "../../../img/works_categories/Peinture.png",
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
                    {"p": "Peinture, papier peint, carrelage mural, parement, lambris, enduit..."}
                ]
            },
            {
                "urlTitle": "cuisine",
                "title": "Cuisine",
                "imgUrl": "../../../img/works_categories/Cuisine.png",
                "paragraphs": [
                    {"p": "Qu'elle soit en kit ou sur mesure, vous n'aurez aucun problème à trouver 'votre' cuisine et ce, quels que soient le budget et la surface dont vous disposez. En revanche, aménager une cuisine nécessite de connaître quelques règles de bases. Éclairage, choix des matériaux, positionnement des équipements, etc..."},
                    {"p": "Pour vous aider à réaliser vos travaux, Casavox  vous met en contact avec des professionnels agréés et vérifiés mais aussi recommandés par la communauté Casavox pour la qualité de leurs interventions."},
                    {"p": "Casavox vous aide à choisir le meilleur professionnel dans votre région et vous permet d’échanger simplement avec chaque Pro susceptible d’intervenir chez vous par l’intermédiaire de notre messagerie privée. Vous pouvez alors choisir en toute confiance le Pro qui correspond le plus à vos attentes."},
                    {"p": "La plupart de nos Professionnels offrent des services au-delà de l’aménagement de cuisine, n’hésitez pas à leur poser vos questions lors de vos échanges."},
                    {"p": "Notre objectif chez Casavox est de vous aider à trouver le meilleur professionnel proche de chez vous pour vos travaux. Aucun projet n’est trop grand ou trop petit pour nos artisans de confiance."},
                    {"q": "Vous avez un projet ? Démarrez dès maintenant votre recherche d’artisan."}
                ],
                "subText": [
                    {"q": "Travaux les plus courants réalisés par nos Pros Casavox dans votre secteur :"},
                    {"small": "Les travaux concernent l’installation, le remplacement et/ou la réparation de matériel."},
                    {"p": "Cuisine complète, meubles de cuisine, plan de travail de cuisine..."}
                ]
            },
            {
                "urlTitle": "salle_de_bain",
                "title": "Salle de Bain",
                "imgUrl": "../../../img/works_categories/Salle_de_bain.png",
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
                    {"p": "Salle de bain complète, meubles de salle de bain, douche, cabine de douche, baignoire, lavabo..."}
                ]
            },
            {
                "urlTitle": "electricite",
                "title": "Electricité",
                "imgUrl": "../../../img/works_categories/Electricite.png",
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
                    {"p": "Prise - câblage électrique, éclairage, Radiateur sèche-serviettes, Chauffe-eau, tableau électrique, compteur électrique, Domotique, sécurité - Alarmes - Interphone …"}
                ]
            },
            {
                "urlTitle": "plomberie",
                "title": "Plomberie",
                "imgUrl": "../../../img/works_categories/Plomberie.png",
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
                    {"p": "Toilettes, douche, baignoire, lavabo-évier, tuyauterie-canalisations, chaudière, chauffe-eau, adoucisseur d’eau"}
                ]
            },
            {
                "urlTitle": "chauffage_climatisation",
                "title": "Chauffage - Climatisation",
                "imgUrl": "../../../img/works_categories/Climatisation.png",
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
                    {"p": "Chaudière, chauffe-eau, radiateur sèche-serviette, Chauffage au sol, Therrmostat, Climatisation, pompe à chaleur, Poêle-insert-Cheminée, VMC..."}
                ]
            },
            {
                "urlTitle": "menuiserie_fenetre_veranda",
                "title": "Menuiserie - Fenetre - Véranda",
                "imgUrl": "../../../img/works_categories/Menuiserie.png",
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
                    {"p": "Porte simple, porte multipoints, fenêtre de toit - velux, fenêtre, porte-fenêtre, volets, escalier, mezzanine, Placards-rangements, Véranda..."}
                ]
            },
            {
                "urlTitle": "serrurerie",
                "title": "Serrurerie",
                "imgUrl": "../../../img/works_categories/Serrurerie.png",
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
                    {"p": "Serrure classique, serrure multipoint, serrurerie gâche électrique, verrou pour volets roulants, verrou pour rideau métalliques..."}
                ]
            },
            {
                "urlTitle": "revetement_sol",
                "title": "Revetement de sol",
                "imgUrl": "../../../img/works_categories/Sol_carrelage.png",
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
                    {"p": "Carrelage, faïence, parquet, moquette, sol plastique (PVC), Pierre, béton, enduit..."}
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
                    {"p": "Cloisons, plafonds, combles..."}
                ]
            },
            {
                "urlTitle": "isolation",
                "title": "Isolation",
                "imgUrl": "../../../img/works_categories/Isolation.png",
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
                    {"p": "Isolation thermique intérieure, isolation thermique extérieure, isolation des combles, isolation phonique..."}
                ]
            },
            {
                "urlTitle": "toiture_charpentes",
                "title": "Toiture - Charpentes",
                "imgUrl": "../../../img/works_categories/Toiture_charpente.png",
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
                    {"p": "Toiture, charpente en bois, charpente métallique..."}
                ]
            },
            {
                "urlTitle": "portail_portes_de_garage",
                "title": "Portail - Portes de garage",
                "imgUrl": "../../../img/works_categories/Portail_portegarage.png",
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
                    {"p": "Portail, portail électrique, porte de garage, porte de garage électrique..."}
                ]
            },
            {
                "urlTitle": "jardin_terrasse_cloture",
                "title": "Jardin - Terrasse - Cloture",
                "imgUrl": "../../../img/works_categories/jardin.png",
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
                    {"p": "Jardin et espaces verts, terrasse (bois et pvc)..."}
                ]
            },
            {
                "urlTitle": "conseil_architecte_paysagiste",
                "title": "Conseil - Architecte - Paysagiste",
                "imgUrl": "../../../img/works_categories/Archi_deco.png",
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
                    {"p": "Conseil d’architecte, décoration/aménagement d’intérieur, home staging, aménagement extérieur..."}
                ]
            },
            {
                "urlTitle": "renovation",
                "title": "Rénovation",
                "imgUrl": "../../../img/works_categories/Renovation.png",
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
                    {"p": "Salon, séjour, bureau, chambre, salle de bain, cuisine, combles, garage..."}
                ]
            },
            {
                "urlTitle": "construction_gros_oeuvre",
                "title": "Construction - Gros oeuvre",
                "imgUrl": "../../../img/works_categories/Construction.png",
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
                    {"p": "Construction rénovation d’une maison, construction/rénovation d’un garage, construction d’une extension, construction de fondations, construction d’une piscine..."}
                ]
            }
        ];
        vm.getActivity = function () {
                for (var i=0; i<vm.activities.length; i++) {
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
