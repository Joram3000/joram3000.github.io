import { useSelector } from "react-redux";
import { getBeatState } from "../../store/beatBattleState/selectors";
import { Title, Text, Stack, Group, Button } from "@mantine/core";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { format } from "date-fns";
import SubmissionCard from "../../components/beatMakerCard/SubmissionCard";
import { useState } from "react";

export default function BeatBattlePage() {
  const getBeatStatee = useSelector(getBeatState);
  const getAContest = getBeatStatee.contests[0];
  const contest1deelnemers = getAContest.subMissionList;
  const date = new Date();
  const dateAdded = format(date, "dd-mm-yyyy hh:mm");

  const onClick = () => {
    console.log(getAContest.sample.url);
  };

  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, 200);

  const onClickEmbla = () => {
    if (embla === null) return;
    embla.reInit();
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
      <Button mx="md" onClick={onClickEmbla}>
        emblaInit
      </Button>
    </>
  );
}
