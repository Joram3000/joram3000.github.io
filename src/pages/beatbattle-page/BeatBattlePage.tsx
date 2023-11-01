import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Container, Title, Text } from "@mantine/core";
import RoundCard from "./components/RoundCard";

const BeatBattlePage: React.FC = () => {
  const beatBattleState = useSelector(getBeatStateSelector);
  return (
    <Container>
      <Title c="grape">Entry Page voor Beat battle</Title>

      <Text>
        Hoi welkom op deze webzijde hier kan je volgen wat er gebeurd in de beat
        battle.
      </Text>

      {beatBattleState.contests.map((contest, i) => (
        <RoundCard contest={contest} i={i} />
      ))}
    </Container>
  );
};

export default BeatBattlePage;
