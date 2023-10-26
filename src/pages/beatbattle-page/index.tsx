import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Title, Text, Stack, Group } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { format } from "date-fns";
import SubmissionCard from "../../components/beatMakerCard/SubmissionCard";
import { useEffect, useState } from "react";
import { getUIStateSelector } from "../../store/ui/selectors";
import UseFadeTester from "../../hooks/useFadeTester";

export default function BeatBattlePage() {
  const getBeatStatee = useSelector(getBeatStateSelector);
  const getUIstate = useSelector(getUIStateSelector);
  const getAContest = getBeatStatee.contests[0];
  const contest1deelnemers = getAContest.subMissionList;
  const date = new Date();
  const dateAdded = format(date, "dd-mm-yyyy hh:mm");
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    if (embla === null) return;
    embla.reInit();
  }, [getUIstate.menuOpen]);

  const onURLClick = () => {
    console.log(getAContest.sample.url);
  };

  return (
    <>
      <Stack bg="grape" m="md">
        <UseFadeTester />
        <Group bg="yellow" justify="space-between">
          <Title c="white">BattleROUND</Title> <Title>[1]</Title>
        </Group>
        <Group justify="space-between">
          <Text c="white">Met deze sample:</Text>
          <Text fw={700} onClick={onURLClick}>
            {getAContest.sample.name}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text>toegevoegd:</Text>
          <Text>{dateAdded}</Text>
        </Group>
      </Stack>

      <Title px="md">inzendingen:</Title>
      <Carousel withIndicators getEmblaApi={setEmbla} loop>
        {contest1deelnemers.map((deelnemer) => (
          <Carousel.Slide key={deelnemer.numberOfUpvotes}>
            <SubmissionCard
              name={deelnemer.contestant.name}
              beatName={deelnemer.name}
              url={deelnemer.url}
              dateAdded={date}
              upvotes={deelnemer.numberOfUpvotes}
              reactions={deelnemer.reactions}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
