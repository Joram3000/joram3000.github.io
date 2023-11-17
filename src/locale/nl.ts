const nl = {
  header: "Joram Ipsum",

  home: {
    title: "Joram Kroon Portfolio Playground",
    welcome:
      "Welkom op mijn portfolio website! Mijn naam is Joram en ik ben werkzaam als Front-end software engineer (met React). Hier vind je een overzicht van mijn werk en huidige skillset. Deze website is continu in ontwikkeling. Ik gebruik hem als 'digitale zandbak' om aan componenten te sleutelen en om nieuwe tech-tools onder de knie te krijgen. Ik probeer zoveel mogelijk toeters en bellen aan deze website te hangen, om een indruk te geven van mijn digitale vaardigheden.",
    interests:
      "Als developer houd ik van het ontwerpen van dynamische componenten. En van intuïtieve interfaces die uitnodigen om overal op te klikken en zelf op verkenning te gaan. Als voormalig DJ-leraar heb ik gezien dat sommige mensen aan 'knoppenvrees' lijden. Dan is deze website een veilige plek om daar vanaf te komen. Het beste voorbeeld hiervan is de Patroonmaker. Dat is een educatieve muziek-app met als doelgroep kinderen tussen de 8 en 10 jaar. Deze app is bedoeld om ze te leren hoe een ritmepatroon in elkaar steekt. Daarnaast is er ook een kopje met mijn werkzaamheden voor Valk Digital, de digitale afdeling van Van der Valk.",
    coding:
      "Qua code word ik het meest blij van hoog responsieve interfaces die intuïtief aanvoelen. Ook heb ik veel interesse in animatie en hoe je dat in kunt zetten om de app-ervaring te verrijken. Daarnaast heb ik - gezien mijn vorige carrière als componist - ook veel interesse in sound design voor interfaces. Kortom: alles wat te maken heeft met de ervaring en wisselwerking tussen een stuk technologie en de persoon die het gebruikt. Mijn huidige ambitie is om van code-aapje naar code-gorilla te gaan. Op dit moment heb ik dezelfde obsessie met code als die ik vroeger voor muziek-compositie & -productie had. Ik wil uiteindelijk zelf Full Stack hele platforms uit de grond kunnen stampen. Daarnaast heb ik ook veel ervaring op het gebied van contentcreatie en denk ik graag mee over de conceptuele kant. Mocht je vragen hebben (dat hoop ik), neem dan gerust contact met me op.",
    usedSoftware: "tools waar ik mee werk:",
  },
  valkDigital: {
    title: "Werken bij Valk Digital",
    intro:
      " Ik heb de afgelopen 18 maanden gewerkt bij Valk Digital. De digitale afdeling van Van der Valk. We zijn verantwoordelijk voor 5 apps, waaronder: de Valk Exclusief App waarmee je hotels kan boeken. Hier is een beknopt overzicht van mijn werkzaamheden:",
  },
  about: {
    title: "Over mij",
    intro:
      "Van oorsprong ben ik muzikant/componist/DJ/cultureel ondernemer, tot aan de laatste weken van de Nederlandse corona lockdown. Toen heb ik me door middel van de Codaisseur bootcamp om laten scholen tot software developer. Inmiddels heb ik 18 maanden met veel plezier gewerkt bij Valk Digital, de app-department van Van der Valk Hotels. Buiten de code om zijn er nog 2 prestigeprojecten waar ik jaarlijks voor werk: een muziek-educatieproject in Nieuwegein (waar ik als DJ-Producer onderdeel ben van een Barok-ensemble), en het produceren van een muziek-EP met Marokkaanse artiesten. Vóór de coronacrisis heb ik veel met hen samengewerkt, en we werken nu toe naar het releasen van een EP.",
    besidesCoding: "Naast code typen",
    besidesCodingText:
      "Buiten code om doe ik aan skateboarden. Eens per jaar ga ik met Bankra Bike Soundsystem mee naar een festival om te DJ-en. Daarnaast beheer ik samen met een groep vrienden een oude anti-kraak-bar. Deze bar gebruikten we vroeger als muziek-studio. Nu zijn we softwaredevelopers en gebruiken we het als werkplek en verhuren we het als studio voor degenen die nog wel veel bezig zijn met muziek.",
  },
  patternMaker: {
    title: "De Patroonmaker",
    description: "Deze app is geoptimaliseerd voor een desktopbrowser.",
    usage:
      "Met deze app kun je jouw eigen ritmepatroon creëren. Als je op Play drukt, kun je horen hoe het ritme klinkt. Terwijl je aan het rondklikken bent, blijft de 'muzikale tijd' doorgaan. Oftewel: de muziek wordt niet onderbroken als je een nieuw ritme maakt, andere geluiden kiest of aan de sliders zit.",
    stateManagement:
      "State-management wordt gedaan met Redux voor het actuele ritme, de preset beats, de geluidskeuze en de sliders.",
    howItWorksTitle: "Hoe het werkt",
    howItWorksContent: [
      "De achtergrond is een waveform-visualizer die geschreven is in de creative coding library P5. De muziek zelf komt tot stand met Tone.JS, een library die over de Web Audio API heen geschreven is. Die zorgt dat de muzikale tijd doorgaat. De geluiden zijn opgeslagen binnen een aantal samplers, die je kunt selecteren met de knop linksboven.",
      "Rechtsboven kun je de preset beats selecteren.",
      "State-management wordt gedaan met Redux. Hier wordt o.a. het huidige patroon opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state als de geselecteerde geluidsstijl.",
    ],
    githubLink: "Hier is een link naar de Github",
  },
  menu: {
    home: "Home",
    patternMaker: "Patroonmaker",
    valkDigital: "Valk Digital",
    about: "Over",
    contact: "Contact",
    beatbattle: "BeatBattle",
  },
};

export default nl;
