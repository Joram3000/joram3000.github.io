import { useSelector } from "react-redux";
import { getAllContests } from "../../store/beatBattleState/selectors";
import { Title, Text, Stack, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { format } from "date-fns";
import SubmissionCard from "../../components/beatMakerCard/SubmissionCard";

export default function BeatBattlePage() {
  const getAContest = useSelector(getAllContests)[0];
  const deelNemers = getAContest.subMissionList;

  const dateAdded = format(getAContest.sample.dateAdded, "dd-mm-yyyy hh:mm");

  const onClick = () => {
    console.log(getAContest.sample.url);
  };

  return (
    <>
      <Stack bg="grape" m="md">
        <Group bg="yellow" justify="space-between">
          <Title c="white">BattleROUND</Title> <Title>[1]</Title>
        </Group>
        <Group justify="space-between">
          <Text c="white">Met deze sample:</Text>
          <Text fw={700} onClick={onClick}>
            {getAContest.sample.name}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text>toegevoegd:</Text>
          <Text>{dateAdded}</Text>
        </Group>
      </Stack>

      <Title px="md">inzendingen:</Title>
      <Carousel withIndicators loop>
        {deelNemers.map((deelnemer) => (
          <Carousel.Slide key={deelnemer.url}>
            <SubmissionCard
              name={deelnemer.contestant.name}
              beatName={deelnemer.name}
              url={deelnemer.url}
              dateAdded={deelnemer.dateAdded}
              upvotes={deelnemer.numberOfUpvotes}
              reactions={deelnemer.reactions}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
