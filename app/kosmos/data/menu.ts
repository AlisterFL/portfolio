import { MenuCategory } from "../types";

export const menuCategories: MenuCategory[] = [
  {
    id: "tapas",
    name: { fr: "Tapas", nl: "Tapas", en: "Tapas", de: "Tapas" },
    items: [
      {
        id: "patatas-bravas",
        name: { fr: "Patatas Bravas", nl: "Patatas Bravas", en: "Patatas Bravas", de: "Patatas Bravas" },
        description: {
          fr: "Pommes de terre croustillantes, sauce brava maison, aïoli",
          nl: "Krokante aardappelen, huisgemaakte brava saus, aioli",
          en: "Crispy potatoes, homemade brava sauce, aioli",
          de: "Knusprige Kartoffeln, hausgemachte Brava-Sauce, Aioli",
        },
        price: 8.5,
        image: "https://images.unsplash.com/photo-1600335895229-6bf01954139a?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "gambas-al-ajillo",
        name: { fr: "Gambas al Ajillo", nl: "Gambas al Ajillo", en: "Garlic Shrimp", de: "Knoblauchgarnelen" },
        description: {
          fr: "Crevettes sautées à l'ail, piment, huile d'olive, pain grillé",
          nl: "Gebakken garnalen met knoflook, chili, olijfolie, geroosterd brood",
          en: "Sautéed shrimp with garlic, chili, olive oil, toasted bread",
          de: "Gebratene Garnelen mit Knoblauch, Chili, Olivenöl, geröstetem Brot",
        },
        price: 12.5,
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "croquetas-jamon",
        name: { fr: "Croquetas de Jamón", nl: "Hamkroketten", en: "Ham Croquettes", de: "Schinkenkroketten" },
        description: {
          fr: "Croquettes croustillantes au jambon ibérique, béchamel onctueuse",
          nl: "Krokante kroketten met Iberische ham, romige bechamel",
          en: "Crispy croquettes with Iberian ham, creamy béchamel",
          de: "Knusprige Kroketten mit iberischem Schinken, cremige Béchamel",
        },
        price: 9.0,
        image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "bruschetta-avocado",
        name: { fr: "Bruschetta Avocado", nl: "Bruschetta Avocado", en: "Avocado Bruschetta", de: "Avocado Bruschetta" },
        description: {
          fr: "Toast croustillant, avocat frais, tomates cerises, basilic, balsamique",
          nl: "Krokante toast, verse avocado, kerstomaten, basilicum, balsamico",
          en: "Crispy toast, fresh avocado, cherry tomatoes, basil, balsamic",
          de: "Knuspriger Toast, frische Avocado, Kirschtomaten, Basilikum, Balsamico",
        },
        price: 10.0,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "calamares-fritos",
        name: { fr: "Calamares Fritos", nl: "Gefrituurde Calamares", en: "Fried Calamari", de: "Frittierte Calamari" },
        description: {
          fr: "Anneaux de calamars croustillants, sauce tartare citronnée",
          nl: "Krokante calamaris ringen, citroentartaarsaus",
          en: "Crispy calamari rings, lemon tartare sauce",
          de: "Knusprige Calamari-Ringe, Zitronen-Tartarsauce",
        },
        price: 11.0,
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "plats",
    name: { fr: "Plats", nl: "Gerechten", en: "Mains", de: "Hauptgerichte" },
    items: [
      {
        id: "burger-kosmos",
        name: { fr: "Burger Kosmos", nl: "Kosmos Burger", en: "Kosmos Burger", de: "Kosmos Burger" },
        description: {
          fr: "Bœuf Angus, cheddar affiné, oignons caramélisés, sauce maison",
          nl: "Angus rund, gerijpte cheddar, gekaramelliseerde uien, huissaus",
          en: "Angus beef, aged cheddar, caramelized onions, house sauce",
          de: "Angus-Rind, gereifter Cheddar, karamellisierte Zwiebeln, Haussauce",
        },
        price: 18.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "risotto-truffe",
        name: { fr: "Risotto à la Truffe", nl: "Truffelrisotto", en: "Truffle Risotto", de: "Trüffelrisotto" },
        description: {
          fr: "Riz arborio crémeux, huile de truffe, parmesan, roquette",
          nl: "Romige arborio rijst, truffelolie, parmezaan, rucola",
          en: "Creamy arborio rice, truffle oil, parmesan, arugula",
          de: "Cremiger Arborio-Reis, Trüffelöl, Parmesan, Rucola",
        },
        price: 19.0,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "pasta-gambas",
        name: { fr: "Pasta aux Gambas", nl: "Pasta met Garnalen", en: "Shrimp Pasta", de: "Garnelen-Pasta" },
        description: {
          fr: "Linguine, gambas grillées, tomates cerises, ail, basilic frais",
          nl: "Linguine, gegrilde garnalen, kerstomaten, knoflook, verse basilicum",
          en: "Linguine, grilled shrimp, cherry tomatoes, garlic, fresh basil",
          de: "Linguine, gegrillte Garnelen, Kirschtomaten, Knoblauch, frisches Basilikum",
        },
        price: 21.0,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "cocktails",
    name: { fr: "Cocktails", nl: "Cocktails", en: "Cocktails", de: "Cocktails" },
    items: [
      {
        id: "picon-kosmos",
        name: { fr: "Picon Kosmos", nl: "Picon Kosmos", en: "Picon Kosmos", de: "Picon Kosmos" },
        description: {
          fr: "Notre picon signature, orange amère, mousse onctueuse",
          nl: "Onze signature picon, bittere sinaasappel, romig schuim",
          en: "Our signature picon, bitter orange, creamy foam",
          de: "Unser Signature Picon, Bitterorange, cremiger Schaum",
        },
        price: 7.5,
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "mojito-classique",
        name: { fr: "Mojito Classique", nl: "Klassieke Mojito", en: "Classic Mojito", de: "Klassischer Mojito" },
        description: {
          fr: "Rhum blanc, menthe fraîche, citron vert, sucre de canne, eau pétillante",
          nl: "Witte rum, verse munt, limoen, rietsuiker, bruiswater",
          en: "White rum, fresh mint, lime, cane sugar, sparkling water",
          de: "Weißer Rum, frische Minze, Limette, Rohrzucker, Sprudelwasser",
        },
        price: 10.0,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "espresso-martini",
        name: { fr: "Espresso Martini", nl: "Espresso Martini", en: "Espresso Martini", de: "Espresso Martini" },
        description: {
          fr: "Vodka, liqueur de café, espresso frais, mousse crémeuse",
          nl: "Wodka, koffielikeur, verse espresso, romig schuim",
          en: "Vodka, coffee liqueur, fresh espresso, creamy foam",
          de: "Wodka, Kaffeelikör, frischer Espresso, cremiger Schaum",
        },
        price: 12.0,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "vins",
    name: { fr: "Vins", nl: "Wijnen", en: "Wines", de: "Weine" },
    items: [
      {
        id: "rioja-reserva",
        name: { fr: "Rioja Reserva", nl: "Rioja Reserva", en: "Rioja Reserva", de: "Rioja Reserva" },
        description: {
          fr: "Vin rouge espagnol, notes de fruits mûrs et vanille, 75cl",
          nl: "Spaanse rode wijn, tonen van rijp fruit en vanille, 75cl",
          en: "Spanish red wine, notes of ripe fruit and vanilla, 75cl",
          de: "Spanischer Rotwein, Noten von reifem Obst und Vanille, 75cl",
        },
        price: 28.0,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "prosecco",
        name: { fr: "Prosecco", nl: "Prosecco", en: "Prosecco", de: "Prosecco" },
        description: {
          fr: "Vin pétillant italien, frais et léger, coupe",
          nl: "Italiaanse mousserende wijn, fris en licht, glas",
          en: "Italian sparkling wine, fresh and light, glass",
          de: "Italienischer Schaumwein, frisch und leicht, Glas",
        },
        price: 7.0,
        image: "https://images.unsplash.com/photo-1566995541428-f2246e17f722?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "softs",
    name: { fr: "Softs", nl: "Frisdranken", en: "Soft Drinks", de: "Alkoholfreie Getränke" },
    items: [
      {
        id: "limonade-maison",
        name: { fr: "Limonade Maison", nl: "Huisgemaakte Limonade", en: "Homemade Lemonade", de: "Hausgemachte Limonade" },
        description: {
          fr: "Citron frais pressé, menthe, sucre de canne, eau pétillante",
          nl: "Vers geperste citroen, munt, rietsuiker, bruiswater",
          en: "Fresh squeezed lemon, mint, cane sugar, sparkling water",
          de: "Frisch gepresste Zitrone, Minze, Rohrzucker, Sprudelwasser",
        },
        price: 5.5,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "virgin-mojito",
        name: { fr: "Virgin Mojito", nl: "Virgin Mojito", en: "Virgin Mojito", de: "Virgin Mojito" },
        description: {
          fr: "Menthe fraîche, citron vert, sucre de canne, eau pétillante, sans alcool",
          nl: "Verse munt, limoen, rietsuiker, bruiswater, alcoholvrij",
          en: "Fresh mint, lime, cane sugar, sparkling water, non-alcoholic",
          de: "Frische Minze, Limette, Rohrzucker, Sprudelwasser, alkoholfrei",
        },
        price: 7.0,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "bieres",
    name: { fr: "Bières", nl: "Bieren", en: "Beers", de: "Biere" },
    items: [
      {
        id: "duvel",
        name: { fr: "Duvel", nl: "Duvel", en: "Duvel", de: "Duvel" },
        description: {
          fr: "Blonde belge forte, 8.5%, 33cl",
          nl: "Sterk Belgisch blond, 8.5%, 33cl",
          en: "Strong Belgian blonde, 8.5%, 33cl",
          de: "Starkes belgisches Blondes, 8.5%, 33cl",
        },
        price: 5.0,
        image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "chimay-bleue",
        name: { fr: "Chimay Bleue", nl: "Chimay Blauw", en: "Chimay Blue", de: "Chimay Blau" },
        description: {
          fr: "Trappiste brune, notes de caramel et fruits secs, 9%, 33cl",
          nl: "Bruin trappistenbier, tonen van karamel en gedroogd fruit, 9%, 33cl",
          en: "Dark trappist, notes of caramel and dried fruit, 9%, 33cl",
          de: "Dunkles Trappistenbier, Noten von Karamell und Trockenfrüchten, 9%, 33cl",
        },
        price: 5.5,
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "jupiler",
        name: { fr: "Jupiler", nl: "Jupiler", en: "Jupiler", de: "Jupiler" },
        description: {
          fr: "Pils belge classique, 5.2%, 25cl",
          nl: "Klassieke Belgische pils, 5.2%, 25cl",
          en: "Classic Belgian pilsner, 5.2%, 25cl",
          de: "Klassisches belgisches Pils, 5.2%, 25cl",
        },
        price: 3.0,
        image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
];
