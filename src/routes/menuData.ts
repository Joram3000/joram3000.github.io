export const menuData = [
  { link: "home", label: "menu.home" },
  { link: "patternmaker", label: "menu.patternMaker" },
  { link: "audioplayer", label: "Audioplayer (in progress)" },
  {
    link: "valkdigital",
    label: "menu.valkDigital",
    links: [
      { label: "nested1", link: "/hoe" },
      { label: "nested2", link: "/die" },
      { label: "nested3", link: "/ja" },
    ],
  },
  { link: "about", label: "menu.about" },
  { link: "contact", label: "menu.contact" },
  // { link: "beatbattle", label: "menu.beatbattle" },
];
