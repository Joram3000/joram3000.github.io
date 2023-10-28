import { Stack, Title, Group, Text, Container } from "@mantine/core";
import { format } from "date-fns";
import treingv from "../../../assets/music/treingv.mp3";
import test16bitpxs1000 from "../../../assets/music/test16bitpxs1000.json";
import { reaction } from "../../../store/beatbattle/types";
import { WaveSurferPlayert } from "../../../components/WaveSurferPlayer/WaveSurferPlayerFrom";

const ctx = document.createElement("canvas").getContext("2d");
const gradient = ctx!.createLinearGradient(0, 0, 0, 150);
gradient.addColorStop(0, "rgb(0, 0, 200)");
gradient.addColorStop(0.7, "rgb(100, 0, 100)");
gradient.addColorStop(1, "rgb(200, 230, 10)");

interface SubmissionCardProps {
  name: string;
  beatName: string;
  url: string;
  dateAdded: Date;
  upvotes: number;
  reactions: reaction[];
}

//audiowaveform -i treingv.mp3 -o test8bit.json --pixels-per-second 20 --bits 8

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  name,
  beatName,
  url,
  dateAdded,
  upvotes,
  reactions,
}) => {
  return (
    <Stack m="md" bg="gray" miw="100%">
      <Group align="flex-start" justify="space-between" m="md">
        <Title order={5} p="md">
          {name} - {beatName}
        </Title>

        <Text fw={700} p="md">
          {format(dateAdded, "dd-mm-yy hh:mm")}
        </Text>

        <Title order={5} p="md">
          {upvotes}🔥
        </Title>
      </Group>

      <Container p="md">
        <Stack justify="stretch" p="md">
          <Text>{url}</Text>
          <WaveSurferPlayert
            // containerReffie={containerReffetie}
            width="100%"
            interact={true}
            normalize
            waveColor={gradient}
            progressColor="rgb(100, 0, 100)"
            minPxPerSec={60}
            dragToSeek
            peaks={[test16bitpxs1000.data]}
            hideScrollbar
            url={treingv}
            autoCenter
            autoScroll
            plugins={[]}
            container={"#Waveform"} //HTMLElement | string;
          />
        </Stack>
      </Container>

      <Group m="md" justify="flex-start">
        {reactions.map((reaction, i) => (
          <Text key={i}>
            {reaction.contestant.name} : {reaction.contents}
            {format(dateAdded, "hh:mm dd-mm-yy")}
          </Text>
        ))}
      </Group>
    </Stack>
  );
};

export default SubmissionCard;
