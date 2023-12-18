import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Container, Title, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import RoundCard from "./components/RoundCard";

const BeatBattlePage: React.FC = () => {
  const beatBattleState = useSelector(getBeatStateSelector);

  return (
    <Container>
      <Title c="grape">Entry Page voor Beat battle</Title>

      <Text>Selecteer een ronde:</Text>

      {beatBattleState.contests.map((contest, i) => (
        <div>
          <NavLink to={`/beatbattle/${i}`} key={i}>
            <h1>{contest.sample.name}</h1>
          </NavLink>
        </div>
      ))}
      {beatBattleState.contests.map((contest, i) => (
        <RoundCard key={`${contest.sample}${i}`} contest={contest} i={i} />
      ))}
    </Container>
  );
};

export default BeatBattlePage;
