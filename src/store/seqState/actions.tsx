export const PatternUpdater = (Payload) => ({
  type: "PATTERNUPDATER",
  payload: Payload,
});

export const PatternUpdatewithSelect = (Payload) => ({
  type: "PATTERNUPDATESELECTOR",
  payload: Payload,
});

// SAVE COMPONENT
export const Patterncolorsetter = (Payload) => ({
  type: "Patterncolorsetter",
  payload: Payload,
});
export const Patternnamesetter = (Payload) => ({
  type: "Patternnamesetter",
  payload: Payload,
});
export const PatternSaver = (name, color, pattern) => {
  console.log("values in action", name, color, pattern);
  return {
    type: "PatternSaver",
    payload: { name, color, pattern },
  };
};

// TRANSPORT UPDATER
export const Transportupdater = (Payload: string) => ({
  type: "Transportupdater",
  payload: Payload,
});

// SOUND SETTINGS / SOUNDCHOICE - VOL -DELAY
export const SeqSoundSetter = (Payload) => ({
  type: "seqSettingsSound",
  payload: Payload,
});
