import { Stack, Title, Group, Text } from "@mantine/core";
import { format } from "date-fns";
import treingv from "../../../assets/music/treingv.mp3";
import { reaction } from "../../../store/beatbattle/types";
import WaveSurferPlayer from "../../../components/WaveSurferPlayer/WaveSurferPlayer";

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

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  name,
  beatName,
  url,
  dateAdded,
  upvotes,
  reactions,
}) => {
  return (
    <Stack m="md" bg="gray">
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

      <Stack justify="stretch" p="md">
        <Text>{url}</Text>

        <WaveSurferPlayer
          width="100%"
          normalize={true}
          waveColor={gradient}
          progressColor="rgb(100, 0, 100)"
          fillParent={true}
          hideScrollbar={true}
          url={treingv}
          autoCenter={true}
          container={"#waveform"}
          plugins={[]}
        />
      </Stack>

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
