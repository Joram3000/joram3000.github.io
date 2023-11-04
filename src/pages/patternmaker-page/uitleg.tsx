import React from "react";
import { Text, Title } from "@mantine/core";
const Uitleg: React.FC = () => {
  return (
    <>
      <Title>PatternCreator</Title>
      <Text>
        Dit is een patternMaker, met educatieve richting In het midden zie je de
        blokjes, daarmee kan je een patroon maken Met de toetsen linksboven kan
        je het geluid bepalen. Met de toetsen rechtsboven kan je het ritme
        bepalen. Op de achterkant zie je een P5 sketch die de waveform laat
        zien.
      </Text>

      <Text>Met de sliders kan je het Volume en een filter toepassen.</Text>

      <Text>
        State-management wordt gedaan met Redux. Hier wordt oa huidige patroon
        opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state
        als het geselecteerde geluid
      </Text>
    </>
  );
};

export default Uitleg;
