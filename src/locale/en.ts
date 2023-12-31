import { Translation } from "./index";

const en: Translation = {
  header: "Joram 3000",
  home: {
    title: "Joram Kroon Portfolio Playground",
    welcome:
      "Welcome to my portfolio website! My name is Joram, and I work as a Front-end software engineer (with React). Here you'll find an overview of my work and current skillset. This website is constantly evolving. I use it as a 'digital sandbox' to play with components and to master new tech tools. I aim to add as many bells and whistles to this website as possible to showcase my digital skills.",
    interests:
      "As a developer, I love designing dynamic components and intuitive interfaces that invite users to click around and explore. As a former DJ teacher, I've observed some people suffering from 'button fear.' This website serves as a safe space to overcome that. A prime example is the Pattern Maker, an educational music app targeting children aged 8 to 10. The app aims to teach them how rhythm patterns work. Additionally, there is a section showcasing my work for Valk Digital, the digital department of Van der Valk.",
    coding:
      "In terms of code, I find the most joy in highly responsive interfaces that feel intuitive. I also have a keen interest in animation and how it can enrich the app experience. Given my previous career as a music composer, I'm also fascinated by sound design for interfaces. In short, anything related to the experience and interaction between a piece of technology and the person using it. My current ambition is to develop myself from being a code monkey to a code gorilla. At the moment, I have the same obsession with code as I used to have for music composition and production. Ultimately, I want to be able to build entire platforms from scratch as a Full Stack developer. I also have extensive experience in content creation and enjoy contributing to the conceptual side. If you have any questions (which I hope you do), feel free to contact me.",
    usedSoftware: "Software I use:",
  },
  valkDigital: {
    title: "Working at Valk Digital",
    intro:
      "I've been working at Valk Digital for 18 months now. Valk Digital is the digital department of Van der Valk. We are responsible for 5 apps, including the Valk Exclusief App, which allows you to book hotels. Here is a brief overview of my responsibilities:",
  },
  about: {
    title: "About Me",
    intro:
      "Originally, I am a musician/composer/DJ/cultural entrepreneur, until the final weeks of the Dutch corona lockdown. That's when I transitioned to become a software developer by enrolling in the Codaisseur bootcamp, and I have been working at Valk Digital with much pleasure for 18 months now. Valk Digital is the app department of Van der Valk Hotels. Apart from coding, there are two prestigious projects I work on annually: 1) a music education project in Nieuwegein, where I am part of a Baroque ensemble as a DJ-Producer. 2) Before the corona pandemic, I started collaborating on a music EP together with artists from Morocco. At this moment, we're finishing the EP and planning the release campaign.",
    besidesCoding: "Besides Coding",
    besidesCodingText:
      "Besides coding, I enjoy skateboarding. Once a year, I join the Bankra Bike Sound System at a festival to DJ. Together with a group of friends, I manage an old bar which we used as a music studio. But since we're all developers now, we use it as a place to work and rent out the music studios.",
  },
  patternMaker: {
    title: "The Pattern Maker",
    description: "This app is optimized for a desktop browser.",
    usage:
      "With this app, you can create your own rhythm pattern. Press Play to hear how the rhythm sounds. While you're clicking around, the 'musical time' keeps going. In other words, the music won't be interrupted when you create a new rhythm, choose different sounds, or adjust the sliders.",
    stateManagement:
      "State management is handled with Redux for the current rhythm, preset beats, sound choices, and sliders.",
    howItWorksTitle: "How It Works",
    howItWorksContent: [
      "The background is a waveform visualizer written in the creative coding library P5. The music itself is generated using Tone.JS, a library written over the Web Audio API. It ensures that the musical time continues. The sounds are stored within a set of samplers, which you can select with the button in the top left.",
      "In the top right, you can select the preset beats.",
      "State management is done with Redux. Here, the current pattern is saved, along with the 4 preset beats and the play state for the selected sound style.",
    ],
    githubLink: "Here is a link to GitHub",
  },
  menu: {
    home: "Home",
    patternMaker: "Patternmaker",
    valkDigital: "Valk Digital",
    about: "About",
    contact: "Contact",
    beatbattle: "BeatBattle",
  },
};

export default en;
