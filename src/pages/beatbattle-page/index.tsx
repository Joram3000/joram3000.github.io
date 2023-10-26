import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Title, Text, Stack, Group, Box } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getUIStateSelector } from "../../store/ui/selectors";
import { submission } from "../../store/beatbattle/types";
import SubmissionCard from "./components/SubmissionCard";

export default function BeatBattlePage() {
  const beatBattleState = useSelector(getBeatStateSelector);
  const getUIState = useSelector(getUIStateSelector);
  const getContest = beatBattleState.contests[0];
  const contestSubmissions = getContest.subMissionList;
  const dateAdded = format(new Date(), "dd-mm-yyyy hh:mm");
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    if (embla === null) return;
    embla.reInit();
  }, [getUIState.menuOpen]);

  const onURLClick = () => {
    console.log(getContest.sample.url);
  };

  return (
    <Box>
      <Stack bg="dark" m="md">
        <Group justify="space-between">
          <Title c="white">Battle Round</Title> <Title>[1]</Title>
        </Group>
        <Group justify="space-between">
          <Text c="white">Met deze sample:</Text>
          <Text fw={700} onClick={onURLClick}>
            {getContest.sample.name}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text>toegevoegd:</Text>
          <Text>{dateAdded}</Text>
        </Group>

        <Title px="md">inzendingen:</Title>
        <Carousel withIndicators getEmblaApi={setEmbla} loop>
          {contestSubmissions.map((submission: submission) => (
            <Carousel.Slide key={submission.numberOfUpvotes}>
              <SubmissionCard
                name={submission.contestant.name}
                beatName={submission.name}
                url={submission.url}
                dateAdded={new Date()}
                upvotes={submission.numberOfUpvotes}
                reactions={submission.reactions}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
}
