import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Title, Text, Stack, Group, Box, Popover, Button } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getUIStateSelector } from "../../store/ui/selectors";
import { beat } from "../../store/beatbattle/types";
import SubmissionCard from "./components/SubmissionCard";
import DialogueCard from "./components/DialogueCard";

const ContestPage: React.FC = () => {
  const params = useParams();
  const id: any = params.id;
  console.log(id);

  const beatBattleState = useSelector(getBeatStateSelector);
  const getUIState = useSelector(getUIStateSelector);
  const getContest = beatBattleState.contests[id ? id : 0];

  const contestSubmissions = getContest.beats;
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
          <Title c="white">Battle Round</Title> <Title c="lime">{id}</Title>
        </Group>
        <Group>
          <Text c="white">Met deze sample:</Text>

          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Text fw={700}>{getContest.sample.name}</Text>
            </Popover.Target>
            <Popover.Dropdown p="md">
              <Button onClick={onURLClick}>Download Sample</Button>

              <DialogueCard reactions={getContest.sample.reactions} />
            </Popover.Dropdown>
          </Popover>
        </Group>

        <Group>
          <Text>toegevoegd:</Text>
          <Text>{dateAdded}</Text>
        </Group>

        <Title px="md">inzendingen:</Title>
        <Carousel withIndicators getEmblaApi={setEmbla} loop>
          {contestSubmissions.map((beat: beat) => (
            <Carousel.Slide key={beat.numberOfUpvotes}>
              <SubmissionCard
                name={beat.beatMaker.name}
                beatName={beat.name}
                url={beat.url}
                dateAdded={new Date()}
                upvotes={beat.numberOfUpvotes}
                reactions={beat.reactions}
              />

              <DialogueCard reactions={beat.reactions} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
};

export default ContestPage;
