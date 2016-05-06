angular.module('Yaka')
    .config(['cloudinaryProvider', function (cloudinaryProvider) {
        cloudinaryProvider
            .set("cloud_name", "yaka")
            .set("upload_preset", "cxsdlf5n");
    }])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDtq1oFK_ku6rSm9OHM8Q0MlHeOYzOWgr8',
            libraries: 'weather,geometry,visualization'
            // v: '3.20',
        });
    }])
    .config(['$translateProvider', function ($translateProvider) {
        // Simply register translation table as object hash
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.translations('fr', {
            'ACTIVITY_INSTALLATION': "Installation",
            'ACTIVITY_REPLACEMENT': "Remplacement",
            'ACTIVITY_REPAIR': "Réparation",
            'ACTIVITY_MAINTENANCE': "Maintenance",
            'ACTIVITY_CONSTRUCTION': "Construction",
            'ACTIVITY_RENOVATION': "Rénovation",
            'ACTIVITY_UNCORK': "Déboucher",
            'ACTIVITY_GOOD': "Bon état",
            'ACTIVITY_AVERAGE': "État moyen",
            'ACTIVITY_BAD': "Mauvais état",
            'ACTIVITY_OTHER': "Autre - Je ne sais pas",
            'ACTIVITY_ELE_1000': "Electricité",
            'ACTIVITY_ELE_SHOOTINGWIRING_1005': "Prise / câblage",
            'ACTIVITY_ELE_LIGHTING_1010': "Eclairage",
            'ACTIVITY_ELE_INSIDELIGHTING_1015': "Éclairage intérieur",
            'ACTIVITY_ELE_EXTERIORLIGHTING_1020': "Eclairage extérieur",
            'ACTIVITY_ELE_RADIATORTOWELDRYER_1025': "Radiateur / Sèche serviette",
            'ACTIVITY_ELE_RADIATOR_1030': "Radiateur",
            'ACTIVITY_ELE_DRYTOWEL_1035': "Sèche serviette",
            'ACTIVITY_ELE_BOILERWATERHEATER_1040': "Chaudière / chauffe-eau",
            'ACTIVITY_ELE_BOILER_1045': "Chaudière",
            'ACTIVITY_ELE_WATERHEATER_1050': "Chauffe-eau",
            'ACTIVITY_ELE_HOTWATERTANK_1055': "Ballon d'eau chaude",
            'ACTIVITY_ELE_SWITCHBOARD_1060': "Tableau électrique",
            'ACTIVITY_ELE_ELECTRICMETER_1065': "Compteur électrique",
            'ACTIVITY_ELE_AUTOMATION_1070': "Domotique",
            'ACTIVITY_ELE_SECURITYALARMINTERCOM_1075': "Sécurité / Alarmes / Interphone",
            'ACTIVITY_ELE_ALARMS_1080': "Alarmes",
            'ACTIVITY_ELE_VIDEOSURVEILLANCE_1085': "Vidéo surveillance",
            'ACTIVITY_ELE_INTERCOM_1090': "Interphone",
            'ACTIVITY_ELE_KEYPAD_1095': "Digicode",
            'ACTIVITY_ELE_SMOKEDETECTOR_1100': "Détecteur de fumée",
            'ACTIVITY_PLU_2000': "Plomberie",
            'ACTIVITY_PLU_BATHROOM_2005': "Toilettes",
            'ACTIVITY_PLU_CLASSICWC_2010': "WC classique",
            'ACTIVITY_PLU_HUNGWC_2015': "WC suspendu",
            'ACTIVITY_PLU_MECHANISMWC_2020': "Mécanisme WC",
            'ACTIVITY_PLU_SHOWER_2025': "Douche",
            'ACTIVITY_PLU_SHOWERCABIN_2030': "Cabine de douche",
            'ACTIVITY_PLU_SHOWERCOLUMN_2035': "Colonne de douche",
            'ACTIVITY_PLU_SHOWERDOOR_2040': "Porte de douche",
            'ACTIVITY_PLU_SHOWERSCREEN_2045': "Pare-douche",
            'ACTIVITY_PLU_BATH_2050': "Baignoire",
            'ACTIVITY_PLU_BATH_2055': "Baignoire",
            'ACTIVITY_PLU_FAUCETSHOWERMIXER_2060': "Robinet / Mitigeur baignoire",
            'ACTIVITY_PLU_BATHSCREEN_2065': "Pare-baignoire",
            'ACTIVITY_PLU_SINKSINK_2070': "Lavabo / Évier",
            'ACTIVITY_PLU_PIPESEWER_2075': "Tuyauterie / Canalisation",
            'ACTIVITY_PLU_BOILERWATERHEATERHOTWATERTANK_2080': "Chaudière / Chauffe-eau / Ballon d'eau chaude",
            'ACTIVITY_PLU_BOILER_2085': "Chaudière",
            'ACTIVITY_PLU_WATERHEATER_2090': "Chauffe-eau",
            'ACTIVITY_PLU_HOTWATERTANK_2095': "Ballon d'eau chaude",
            'ACTIVITY_PLU_SOFTENER_2100': "Adoucisseur",
            'ACTIVITY_HEA_3000': "Chauffage / Climatisation",
            'ACTIVITY_HEA_BOILERWATERHEATERHOTWATERTANK_3005': "Chaudière / Chauffe-eau / Ballon d'eau chaude",
            'ACTIVITY_HEA_BOILER_3010': "Chaudière",
            'ACTIVITY_HEA_WATERHEATER_3015': "Chauffe-eau",
            'ACTIVITY_HEA_HOTWATERTANK_3020': "Ballon d'eau chaude",
            'ACTIVITY_HEA_RADIATORTOWELDRYER_3025': "Radiateur / Sèche serviette",
            'ACTIVITY_HEA_ELECTRICHEATER_3030': "Radiateur électrique",
            'ACTIVITY_HEA_GASHEATER_3035': "Radiateur gaz",
            'ACTIVITY_HEA_ELECTRICTOWELRAIL_3040': "Sèche serviette électrique",
            'ACTIVITY_HEA_TOWELDRYGAS_3045': "Sèche serviette gaz",
            'ACTIVITY_HEA_FLOORHEATING_3050': "Chauffage au sol",
            'ACTIVITY_HEA_THERMOSTAT_3055': "Thermostat",
            'ACTIVITY_HEA_AIRCONDITIONER_3060': "Climatisation",
            'ACTIVITY_HEA_HEATPUMP_3065': "Pompe à chaleur",
            'ACTIVITY_HEA_STOVEINSERTSFIREPLACES_3070': "Poêle / Inserts / Cheminée",
            'ACTIVITY_HEA_HEARTH_3075': "Poêle a bois",
            'ACTIVITY_HEA_PELLETSTOVE_3080': "Poêle à granulés",
            'ACTIVITY_HEA_FIREPLACE_3085': "Cheminée",
            'ACTIVITY_HEA_INSERT_3090': "Insert",
            'ACTIVITY_HEA_VMC_3095': "VMC",
            'ACTIVITY_HEA_VMCSINGLEFLOW_3100': "VMC simple flux",
            'ACTIVITY_HEA_VMCDOUBLEFLOW_3105': "VMC Double flux",
            'ACTIVITY_CAR_4000': "Menuiserie / Fenêtre / Véranda",
            'ACTIVITY_CAR_SINGLEDOOR_4005': "Porte simple",
            'ACTIVITY_CAR_HOLDERPLASTICPVC_4010': "Porte en plastique / PVC",
            'ACTIVITY_CAR_METALDOORALU_4015': "Porte en métal / Alu",
            'ACTIVITY_CAR_WOODDOOR_4020': "Porte en bois",
            'ACTIVITY_CAR_MULTIPOINTDOOR_4025': "Porte multipoint",
            'ACTIVITY_CAR_MULTIPOINTDOORPLASTICPVC_4030': "Porte multipoint plastique / PVC",
            'ACTIVITY_CAR_MULTIPOINTDOORMETALALU_4035': "Porte multipoint métal / Alu",
            'ACTIVITY_CAR_WOODDOORMULTIPOINT_4040': "Porte multipoint bois",
            'ACTIVITY_CAR_ROOFWINDOWSKYLIGHT_4045': "Fenêtre de toit / Velux",
            'ACTIVITY_CAR_WINDOW_4050': "Fenêtre",
            'ACTIVITY_CAR_SINGLEGLAZINGWINDOW_4055': "Fenêtre Simple vitrage",
            'ACTIVITY_CAR_DOUBLEGLAZEDWINDOW_4060': "Fenêtre Double vitrage",
            'ACTIVITY_CAR_DOORWINDOW_4065': "Porte fenêtre",
            'ACTIVITY_CAR_SINGLEGLAZINGDOOR_4070': "Porte Simple vitrage",
            'ACTIVITY_CAR_DOUBLEGLASSDOOR_4075': "Porte Double vitrage",
            'ACTIVITY_CAR_SHUTTERS_4080': "Volets",
            'ACTIVITY_CAR_ELECTRICSHUTTERS_4085': "Volets roulants électriques",
            'ACTIVITY_CAR_MANUALSHUTTERS_4090': "Volets roulants manuels",
            'ACTIVITY_CAR_CASEMENTSHUTTERS_4095': "Volets à battants",
            'ACTIVITY_CAR_STAIRCASE_4100': "Escalier",
            'ACTIVITY_CAR_MEZZANINE_4105': "Mezzanine",
            'ACTIVITY_CAR_CUPBOARDSCUPBOARDS_4110': "Placards / Rangements",
            'ACTIVITY_CAR_VERANDA_4115': "Véranda",
            'ACTIVITY_LOC_5000': "Serrurerie",
            'ACTIVITY_LOC_SINGLEDOOR_5005': "Porte simple",
            'ACTIVITY_LOC_HOLDERPLASTICPVC_5010': "Porte en plastique / PVC",
            'ACTIVITY_LOC_METALDOORALU_5015': "Porte en métal / Alu",
            'ACTIVITY_LOC_WOODDOOR_5020': "Porte en bois",
            'ACTIVITY_LOC_MULTIPOINTDOOR_5025': "Porte multipoint",
            'ACTIVITY_LOC_MULTIPOINTDOORPLASTICPVC_5030': "Porte multipoint plastique / PVC",
            'ACTIVITY_LOC_MULTIPOINTDOORMETALALU_5035': "Porte multipoint métal / Alu",
            'ACTIVITY_LOC_WOODDOORMULTIPOINT_5040': "Porte multipoint bois",
            'ACTIVITY_LOC_CONVENTIONALLOCK_5045': "Serrure classique",
            'ACTIVITY_LOC_MULTIPOINTLOCK_5050': "Serrure multipoints",
            'ACTIVITY_LOC_ELECTRICSTRIKE_5055': "Gâche électrique",
            'ACTIVITY_LOC_SHUTTERS_5060': "Volets roulants",
            'ACTIVITY_LOC_METALLICCURTAINS_5065': "Rideaux Métallique",
            'ACTIVITY_PAI_6000': "Peinture / Revêtements",
            'ACTIVITY_PAI_CONCRETE_6005': "Béton",
            'ACTIVITY_PAI_INTERIORWALL_6010': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6015': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6020': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORFLOOR_6025': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6030': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6035': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORWALLANDFLOOR_6040': "Mur et sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6045': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6050': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6055': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6060': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6065': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6070': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6075': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6080': "Plus de 30m",
            'ACTIVITY_PAI_WALLANDFLOOROUTSIDE_6085': "Mur et sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6090': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6095': "Plus de 30m",
            'ACTIVITY_PAI_TILESFAIENCE_6100': "Carrelage/Faience",
            'ACTIVITY_PAI_INTERIORWALL_6105': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6110': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6115': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORFLOOR_6120': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6125': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6130': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORWALLANDFLOOR_6135': "Mur et sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6140': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6145': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6150': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6155': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6160': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6165': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6170': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6175': "Plus de 30m",
            'ACTIVITY_PAI_WALLANDFLOOROUTSIDE_6180': "Mur et sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6185': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6190': "Plus de 30m",
            'ACTIVITY_PAI_COATING_6195': "Enduit",
            'ACTIVITY_PAI_INTERIORWALL_6200': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6205': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6210': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORFLOOR_6215': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6220': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6225': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORWALLANDFLOOR_6230': "Mur et sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6235': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6240': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6245': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6250': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6255': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6260': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6265': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6270': "Plus de 30m",
            'ACTIVITY_PAI_WALLANDFLOOROUTSIDE_6275': "Mur et sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6280': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6285': "Plus de 30m",
            'ACTIVITY_PAI_LAMBRI_6290': "Lambri",
            'ACTIVITY_PAI_INTERIORWALL_6295': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6300': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6305': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6310': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6315': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6320': "Plus de 30m",
            'ACTIVITY_PAI_CARPET_6325': "Moquette",
            'ACTIVITY_PAI_LESSTHAN30M_6330': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6335': "Plus de 30m",
            'ACTIVITY_PAI_WALLPAPER_6340': "Papier peint",
            'ACTIVITY_PAI_LESSTHAN30M_6345': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6350': "Plus de 30m",
            'ACTIVITY_PAI_PARMENT_6355': "Parment",
            'ACTIVITY_PAI_INTERIORWALL_6360': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6365': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6370': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6375': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6380': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6385': "Plus de 30m",
            'ACTIVITY_PAI_PARQUET_6390': "Parquet",
            'ACTIVITY_PAI_INTERIORFLOOR_6395': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6400': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6405': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6410': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6415': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6420': "Plus de 30m",
            'ACTIVITY_PAI_PAINTING_6425': "Peinture",
            'ACTIVITY_PAI_INTERIORWALL_6430': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6435': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6440': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORFLOOR_6445': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6450': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6455': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORWALLANDFLOOR_6460': "Mur et sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6465': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6470': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6475': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6480': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6485': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6490': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6495': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6500': "Plus de 30m",
            'ACTIVITY_PAI_WALLANDFLOOROUTSIDE_6505': "Mur et sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6510': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6515': "Plus de 30m",
            'ACTIVITY_PAI_PIERRE_6520': "Pierre",
            'ACTIVITY_PAI_INTERIORWALL_6525': "Mur intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6530': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6535': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORFLOOR_6540': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6545': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6550': "Plus de 30m",
            'ACTIVITY_PAI_INTERIORWALLANDFLOOR_6555': "Mur et sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6560': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6565': "Plus de 30m",
            'ACTIVITY_PAI_EXTERIORWALL_6570': "Mur extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6575': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6580': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6585': "Sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6590': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6595': "Plus de 30m",
            'ACTIVITY_PAI_WALLANDFLOOROUTSIDE_6600': "Mur et sol extérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6605': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6610': "Plus de 30m",
            'ACTIVITY_PAI_PLASTICPVC_6615': "Plastique/PVC",
            'ACTIVITY_PAI_INTERIORFLOOR_6620': "Sol intérieur",
            'ACTIVITY_PAI_LESSTHAN30M_6625': "Moins de 30m",
            'ACTIVITY_PAI_MORETHAN30M_6630': "Plus de 30m",
            'ACTIVITY_PAI_OUTDOORFLOOR_6635': "Sol extérieur",
            'ACTIVITY_PAI_6640': "Moins de 30m",
            'ACTIVITY_PAI_6645': "Plus de 30m",
            'ACTIVITY_WAL_7000': "Cloisons / Plafonds / Combles",
            'ACTIVITY_WAL_PARTITIONS_7005': "Cloisons",
            'ACTIVITY_WAL_CEILINGS_7010': "Plafonds",
            'ACTIVITY_WAL_LOFT_7015': "Combles",
            'ACTIVITY_WAL_LOFTINSULATION_7020': "Isolation des combles",
            'ACTIVITY_WAL_DEVELOPMENTOFTHEATTIC_7025': "Aménagement des combles",
            'ACTIVITY_WAL_PLANNINGANDATTICINSULATION_7030': "Aménagement et isolation des combles",
            'ACTIVITY_INS_8000': "Isolation",
            'ACTIVITY_INS_INTERIORINSULATION_8005': "Isolation thermique intérieure",
            'ACTIVITY_INS_EXTERNALTHERMALINSULATION_8010': "Isolation thermique extérieure",
            'ACTIVITY_INS_LOFTINSULATION_8015': "Isolation des combles",
            'ACTIVITY_INS_SOUNDPROOFING_8020': "Isolation phonique",
            'ACTIVITY_COU_9000': "Conseil, architecte et paysagiste",
            'ACTIVITY_COU_ARCHITECT_9005': "Architecte",
            'ACTIVITY_COU_DECORATIONHOMEIMPROVEMENT_9010': "Décoration / Aménagement d'intérieur",
            'ACTIVITY_COU_LANDSCAPER_9015': "Paysagiste",
            'ACTIVITY_KIT_10000': "Cuisine / Salle de Bain",
            'ACTIVITY_KIT_KITCHENROOM_10005': "Cuisine",
            'ACTIVITY_KIT_FULLKITCHEN_10010': "Cuisine complète",
            'ACTIVITY_KIT_KITCHENFURNITURE_10015': "Meubles de cuisines",
            'ACTIVITY_KIT_KITCHENWORKTOP_10020': "Plan de travail de cuisine",
            'ACTIVITY_KIT_BATHROOM_10025': "Salle de bain",
            'ACTIVITY_KIT_BATHROOM_10030': "Salle de bain complète",
            'ACTIVITY_KIT_BATHROOMFURNITURE_10035': "Meubles de salle de bains",
            'ACTIVITY_ROO_11000': "Toiture / Charpente",
            'ACTIVITY_ROO_ROOFING_11005': "Toiture",
            'ACTIVITY_ROO_ROOFTERRACE_11010': "Toiture de terrasse",
            'ACTIVITY_ROO_TILEROOF_11015': "Toiture de tuile",
            'ACTIVITY_ROO_SLATEROOF_11020': "Toiture en ardoise",
            'ACTIVITY_ROO_ZINCROOFING_11025': "Toiture en zinc",
            'ACTIVITY_ROO_ROOFSHINGLE_11030': "Toiture en shingle",
            'ACTIVITY_ROO_ROOFINGSHEETS_11035': "Toiture en tôle",
            'ACTIVITY_ROO_THATCHEDROOF_11040': "Toiture en chaume",
            'ACTIVITY_ROO_WOODENROOFS_11045': "Charpente bois",
            'ACTIVITY_ROO_METALFRAME_11050': "Charpente métallique",
            'ACTIVITY_GAT_12000': "Portail / Porte de garage",
            'ACTIVITY_GAT_PORTAL_12005': "Portail",
            'ACTIVITY_GAT_PORTALPLASTICPVC_12010': "Portail en plastique / PVC",
            'ACTIVITY_GAT_METALGATEALU_12015': "Portail en métal / Alu",
            'ACTIVITY_GAT_WOODENGATE_12020': "Portail en bois",
            'ACTIVITY_GAT_ELECTRICGATE_12025': "Portail électrique",
            'ACTIVITY_GAT_ELECPORTALPLASTICPVC_12030': "Portail Elec Plastique / PVC",
            'ACTIVITY_GAT_ELECPORTALMETALALU_12035': "Portail Elec Métal / Alu",
            'ACTIVITY_GAT_PORTALELECWOOD_12040': "Portail Elec Bois",
            'ACTIVITY_GAT_GARAGEDOOR_12045': "Porte de garage",
            'ACTIVITY_GAT_GARAGEDOORPLASTICPVC_12050': "Porte garage Plastique / PVC",
            'ACTIVITY_GAT_DOORGARAGEMETALALU_12055': "Porte garage Métal / Alu",
            'ACTIVITY_GAT_WOODGARAGEDOOR_12060': "Porte garage Bois",
            'ACTIVITY_GAT_ELECTRICGARAGEDOOR_12065': "Porte de garage électrique",
            'ACTIVITY_GAT_DOORGARAGEELECPLASTICPVC_12070': "Porte garage Elec Plastique / PVC",
            'ACTIVITY_GAT_ELECMETALDOORGARAGEALU_12075': "Porte garage Elec métal / Alu",
            'ACTIVITY_GAT_DOORGARAGEELECWOOD_12080': "Porte garage Elec Bois",
            'ACTIVITY_GAR_13000': "Jardin / Terrase / Clôture",
            'ACTIVITY_GAR_GARDENANDGREENSPACES_13005': "Jardin et espaces verts",
            'ACTIVITY_GAR_WOODENDECK_13010': "Terrasse en bois",
            'ACTIVITY_GAR_FENCED_13015': "Clôture",
            'ACTIVITY_GAR_FENCEMESHMETAL_13020': "Clôture en grillage/métal",
            'ACTIVITY_GAR_FENCECANNISSE_13025': "Clôture en cannisse",
            'ACTIVITY_GAR_WOODENFENCEPANELS_13030': "Clôture en panneaux bois",
            'ACTIVITY_GAR_PLASTICFENCEPVC_13035': "Clôture en plastique/PVC",
            'ACTIVITY_GAR_WALLMURET_13040': "Mur / Muret",
            'ACTIVITY_GAR_CINDERBLOCKWALL_13045': "Mur en parpaing",
            'ACTIVITY_GAR_BRICKWALL_13050': "Mur en brique",
            'ACTIVITY_GAR_WOODENWALL_13055': "Mur en bois",
            'ACTIVITY_GAR_METALWALL_13060': "Mur en métal",
            'ACTIVITY_GAR_EARTHWORK_13065': "Terrassement",
            'ACTIVITY_CON_14000': "Construction",
            'ACTIVITY_CON_HOUSE_14005': "Maison",
            'ACTIVITY_CON_TRADITIONALHOUSE-CINDERBLOCK_14010': "Maison traditionnelle - parpaing",
            'ACTIVITY_CON_BRICKHOUSE_14015': "Maison en brique",
            'ACTIVITY_CON_WOODFRAMEHOUSE_14020': "Maison en ossature bois",
            'ACTIVITY_CON_BBCHOME_14025': "Maison BBC",
            'ACTIVITY_CON_GARAGE_14030': "Garage",
            'ACTIVITY_CON_CONCRETEGARAGE_14035': "Garage béton",
            'ACTIVITY_CON_GARAGEBRICKCONCRETEBLOCK_14040': "Garage en brique/parpaing",
            'ACTIVITY_CON_GARAGEWOODFRAME_14045': "Garage en ossature bois",
            'ACTIVITY_CON_GARAGEMETAL_14050': "Garage en métal",
            'ACTIVITY_CON_EXTENSION_14055': "Extension",
            'ACTIVITY_CON_EXTENSIONCINDERBLOCK_14060': "Extension en parpaing",
            'ACTIVITY_CON_EXTENSIONBRICK_14065': "Extension en brique",
            'ACTIVITY_CON_TIMBERFRAMEEXTENSION_14070': "Extension ossature bois",
            'ACTIVITY_CON_FOUNDATIONS_14075': "Fondations",
            'ACTIVITY_CON_SWIMMINGPOOL_14080': "Piscine",
            'ERROR_USER_ALREADY_EXISTS': "Un compte existe déjà avec cet email",
            'ERROR_REQUIRED_DATA_MISSING': "Vous n'avez pas envoyé toutes les informations nécessaires pour effectuer cette action",
            'ERROR_BAD_CREDENTIALS': "Veuillez vérifier votre email et votre mot de passe",
            'ERROR_UNAUTHORIZED': "Vous n'êtes pas connecté",
            'ERROR_FORBIDDEN': "Vous n'avez pas les autorisations nécessaires pour accéder à cette resource",
            'ERROR_NOT_FOUND': "Element non trouvé",
            'ERROR_BAD_DATA': "Veuillez vérifier les informations envoyées",
            'ERROR_BAD_SLOT': "Le créneau choisi n'est pas valide"
        });
        $translateProvider.preferredLanguage('fr');
    }])
;
