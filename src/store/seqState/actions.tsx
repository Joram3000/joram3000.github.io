export const PatternUpdater = (Payload) => ({
  type: "PATTERNUPDATER",
  payload: Payload,
});

// TRANSPORT UPDATER
export const Transportupdater = (Payload: string) => ({
  type: "Transportupdater",
  payload: Payload,
});
