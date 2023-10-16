import * as Tone from "tone";

const TonePlayer: React.FC = () => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("E4", "8n", now + 0.5);
  synth.triggerAttackRelease("G4", "8n", now + 1);

  const audioPlay = async () => {
    await Tone.start();
    console.log("audio is ready");
  };

  return (
    <>
      <button onClick={() => audioPlay()} />
    </>
  );
};

export default TonePlayer;
