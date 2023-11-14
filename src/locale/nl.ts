const nl = {
  header: "Joram Ipsum",

  home: {
    title: "Joram Kroon Portfolio Playground",
    welcome:
      "Welkom op mijn portfolio website! Mijn naam is Joram en ik ben werkzaam als Front-end software engineer (met React). Hier vind je een overzicht van mijn werk en huidige skillset. Deze website is continu in ontwikkeling. Ik gebruik hem als 'digitale zandbak' om aan componenten te sleutelen en om nieuwe tech-tools onder de knie te krijgen. Ik probeer zoveel mogelijk toeters en bellen aan deze website te hangen, om een indruk te geven van mijn digitale vaardigheden.",
    interests:
      "Als developer houd ik van het ontwerpen van dynamische componenten. En van intuitieve interfaces die uitnodigen om overal op te klikken en zelf op verkenning te gaan. Als voormalig DJ-leraar heb ik gezien dat sommige mensen aan 'knoppenvrees' lijden. Dan is deze website een veilige plek om daar vanaf te komen. Het beste voorbeeld hiervan is de Patroonmaker. Dat is een educatieve muziek-app met als doelgroep kinderen tussen de 8 en 10 jaar. Deze app is bedoeld om ze te leren hoe een ritmepatroon in elkaar steekt. Daarnaast is er ook een kopje met mijn werkzaamheden voor Valk Digital, de digitale afdeling van Van der Valk.",
    coding:
      "Qua code word ik het meest blij van hoog responsieve interfaces die intuitief aanvoelen. Ook heb ik veel interesse in animatie en hoe je dat in kunt zetten om de app-ervaring te verrijken. Daarnaast heb ik - gezien mijn vorige carriere als componist - ook veel interesse in sound design voor interfaces. Kortom: alles wat te maken heeft met de ervaring en wisselwerking tussen een stuk technologie en de persoon die het gebruikt. Mijn huidige ambitie is om van code-aapje naar code-gorilla te gaan. Op dit moment heb ik dezelfde obsessie met code als die ik vroeger voor muziek-compositie & -productie had. Ik wil uiteindelijk zelf Full Stack hele platforms uit de grond kunnen stampen. Daarnaast heb ik ook veel ervaring op het gebied van content creation en denk ik graag mee over de conceptuele kant. Mocht je vragen hebben, neem dan gerust contact met me op.",
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
      "Van oorsprong ben ik muzikant/componist/DJ/cultureel ondernemer, tot aan de laatste weken van de Nederlandse corona lockdown. Toen heb ik me met de Codaiseur bootcamp om laten scholen tot software developer en nu 18 maanden met veel plezier gewerkt bij Valk Digital, de app-department van Van der Valk Hotels. Buiten de code om zijn er nog 2 prestige projecten waar ik jaarlijks voor werk: Een muziek educatie project in Nieuwegein waar ik als DJ-Producer onderdeel ben van een Barok-ensemble. En ik heb vóór de corona veel samengewerkt met artiesten uit Marokko, daar heb ik af en toe ook nog mee te maken. Verder geniet ik zeer van de stabiliteit die ik heb als software-developer.",
    besidesCoding: "Naast code typen",
    besidesCodingText:
      "Buiten code om doe ik aan skateboarden. Eens per jaar ga ik mee met de Bankra Bike Sound System naar een festival om mee te DJ-en. Samen met een groep vrienden heb ik een bar in antikraak beheer. Deze bar gebruikten we vroeger als muziek-studio. Nu zijn we allen software developers en gebruiken we het als werkplek.",
  },
  patternMaker: {
    title: "De Patroonmaker",
    description: "Deze app is geoptimaliseerd voor een desktopbrowser.",
    usage:
      "Met deze app kan je je eigen ritmepatroon creëren. Als je op Play drukt, kan je horen hoe het ritme klinkt. Terwijl je aan het rondklikken bent, blijft de 'muzikale tijd' doorgaan. Oftewel: de muziek wordt niet onderbroken als je een nieuw ritme maakt, andere geluiden kiest of aan de sliders zit.",
    stateManagement:
      "State-management wordt gedaan met Redux voor het actuele ritme, de preset beats, de geluidskeuze en de sliders.",
    howItWorksTitle: "Hoe het werkt?",
    howItWorksContent: [
      "De achtergrond is een waveform-visualizer die geschreven is in de creative coding library P5. De muziek zelf komt tot stand met Tone.JS, een library die geschreven is over de Web Audio API heen. Die zorgt dat de muzikale tijd doorgaat. De geluiden zijn opgeslagen binnen een aantal samplers, die je kan selecteren met de knop linksboven.",
      "Rechtsboven kan je de preset beats selecteren.",
      "State-management wordt gedaan met Redux. Hier wordt o.a. het huidige patroon opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state als het geselecteerde geluidsstijl.",
    ],
    githubLink: "Hier is een link naar de Github",
  },
  menu: {
    home: "Huis",
    patternMaker: "Patroonmaker",
    valkDigital: "Valk Digital",
    about: "Over",
    contact: "Contact",
    css: "cssFunTown",
    beatbattle: "BeatBattle",
  },
};

export default nl;
