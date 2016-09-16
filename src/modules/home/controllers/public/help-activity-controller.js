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

        $rootScope.pageName = "";

        vm.showLoginPopup = false;
        vm.loginTab = true;

        vm.activities = [
            {
                "urlTitle": "peinture",
                "title": "Peinture",
                "imgUrl": "../../../img/peinture.png",
                "intro": [
                    {"p": "Vous avez acquis une habitation neuve ou vous souhaitez rénover votre logement. Vous avez prévu dans vos plans de (re)faire toutes les peintures d’intérieur. Opération simple en apparence."},
                    {"p": "Que ce soit pour l’intérieur ou l’extérieur, les murs sont de véritables espaces d’expression qui créent différentes ambiances selon le type et la couleur de peinture choisie."},
                    {"p": "Que choisir pour habiller les murs ? De la peinture, du papier peint, de la chaux ou de la peinture à effets? Il existe aujourd'hui une multitude de produits qui en plus d'être décoratifs, proposent des caractéristiques anti-pollution, isolantes et même anti-bruit !"},
                    {"p": "Il n’est pas toujours aisé de trouver le revêtement mural idéal. Que ce soit pour des besoins spécifiques à la rénovation, ou des besoins strictement décoratifs, le type de revêtement doit dans tous les cas, permettre d'embellir et de personnaliser son intérieur de manière durable et esthétique."}
                ],
                "paragraphs": [
                    [
                        {"q": "Quelle peinture pour quel revêtement ?"},
                        {"p": "Humidité, superficie, hauteur sous plafond, luminosité, entretien, esthétisme, de nombreuses contraintes peuvent vous décider à choisir un revêtement plutôt qu’un autre. Les innovations techniques, toujours plus pointues, permettent en général de répondre à vos besoins de manière efficace."},
                        {"p": "Les couleurs jouant un rôle très important dans l’ambiance de la maison, sachez jouer avec les nuances !"},
                        {"p": "Il existe de nombreuses solutions pour faire de votre intérieur un lieu de vie agréable et chaleureux."}
                    ],
                    [
                        {"q": "Quel type de peinture choisir ?"},
                        {"p": "Définissez le revêtement ou le type de peinture ou revêtement le plus adapté et personnalisez votre intérieur grâce aux idées malines proposées dans ces articles. Chaque type de revêtement possède des caractéristiques qui lui sont propres et contribue à donner une ambiance particulière à la pièce. Parmi les types de peinture vous trouverez :"},
                        {"p": "- L'acrylique, le béton ciré, la chaux, la peinture métallique ..."}
                    ],
                    [
                        {"q": "Faire appel à un professionnel vous donne la garantie d'un fini impeccable."}
                    ]
                ]

            },
            {
                "urlTitle": "salle_de_bain",
                "title": "Salle de bain",
                "imgUrl": "../../../img/salleDeBain.png",
                "intro": [
                    {"p": "La salle de bain est une pièce à vivre à part entière pour laquelle on accorde autant d’attention que le salon ou la cuisine."},
                    {"p": "Une pièce définie par les designers comme une 'invitation aux plaisirs de l'eau'."},
                    {"p": "On la rêve chaleureuse et fonctionnelle, tantôt en havre de paix ou en espace détente."}
                ],
                "paragraphs": [
                    [
                        {"q": "Comment aménager sa salle de bain ?"},
                        {"p": "L’aménagement, l’équipement et la décoration d’une salle de bains doivent être appréhendés selon la superficie de la pièce, sa forme et les besoins spécifiques des habitants. Il faut savoir que l’isolation est particulièrement importante au sein d’une pièce humide telle que la salle de bains."},
                        {"p": "L’aménagement d’une salle de bains est à adapter selon les spécificités de l’espace mis à disposition, ainsi que selon sa destination. En effet, une salle de bains peut être en longueur ou sous pente."},
                        {"p": "La salle de bains peut être destinée à un couple de parents, à des enfants, à des personnes âgées, à des personnes à mobilité réduite, ou encore à l’ensemble de la famille. On peut décider d’assortir sa salle de bains de WC, à sa convenance."}
                    ],
                    [
                        {"q": "Quels sont les équipements à prévoir ?"},
                        {"p": "L’équipement d’une salle de bains est très varié :"},
                        {"p": " - baignoire"},
                        {"p": " - douche"},
                        {"p": " - vasques"},
                        {"p": " - lavabo simple ou double"},
                        {"p": " - lavabo d’angle pour gagner de l’espace"},
                        {"p": "On peut aussi opter pour un système de combiné baignoire-douche, afin de cumuler les deux options. Si on a un budget suffisamment conséquent et un espace suffisant, on peut même installer chez soi un hammam, un sauna, voire même un SPA jacuzzi ou un SPA de nage."},
                        {"p": "Au sein d’une salle de bains, les rangements tiennent une place essentielle pour ne pas encombrer la pièce. Une colonne de rangement ou des étagères suspendues sont très pratiques."},
                        {"p": "De manière générale, les matériaux utilisés pour l’équipement d’une salle de bains sont les suivants : inox, résine, porcelaine, céramique, acrylique, bois, fonte, verre, lave émaillée, mosaïque, carrelage, PVC, linoléum, résine etc. La résistance, l’entretien et le coût de chaque matériau sont différents, il faut donc demander plusieurs devis salle de bains pour adapter son choix à ses souhaits et à son budget."}

                    ],
                    [
                        {"q": "Faire appel à un professionnel vous donne la garantie d'un fini impeccable."}
                    ]
                ]

            },
            {
                "urlTitle": "cuisine",
                "title": "Cuisine",
                "imgUrl": "../../../img/cuisine.jpg",
                "intro": [
                    {"p": "La cuisine est passée de la petite pièce exigüe à l'un des espaces les plus importants et conviviaux de la maison."},
                    {"p": "Alliant l'esthétisme à la pratique, la cuisine est aujourd'hui un lieu incontournable qui bénéficie de toutes les techniques modernes."},
                    {"p": "Qu'elle soit en kit ou sur mesure, vous n'aurez aucun problème à trouver 'votre' cuisine et ce, quels que soient le budget et la surface dont vous disposez."}
                ],
                "paragraphs": [
                    [
                        {"q": "Comment aménager sa cuisine ?"},
                        {"p": "Avant de faire appel à des cuisinistes, vous pouvez réfléchir à plusieurs éléments quant à la disposition de votre cuisine. Vos déplacements dans la cuisine, la hauteur des éléments, l’éclairage et comment faciliter les différents déplacement que vous aurez dans votre cuisine sont à prendre en considération."},
                    ]
                ]
            }
        ];
    }
})
();
