import { Stack, Title, Group, Text } from "@mantine/core";
import { reaction } from "../../store/beatBattleState/types";
import { format } from "date-fns";
import WaveSurferPlayer from "../../pages/test-pages/WaveSurferPlayer";
import treingv from "../../assets/music/treingv.mp3";

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
    <Stack bg="red" m="md">
      <div style={{ border: "1px solid green" }}>
        <Group align="flex-start" justify="space-between">
          <Title order={5} p="md">
            {name} - {beatName}
          </Title>

          <Text fw={700} p="md">
            {format(dateAdded, "dd-mm-yy hh:mm")}
          </Text>
          <Title p="md">{upvotes}</Title>
        </Group>

        <Group bg="cyan" justify="center">
          <Stack justify="stretch" bg="grape">
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
        </Group>

        <Group bg="green" justify="flex-end">
          {reactions.map((reactie, i) => (
            <Text key={i}>
              {reactie.contestant.name} : {reactie.contents}
              {format(dateAdded, "hh:mm dd-mm-yy")}
            </Text>
          ))}
        </Group>
      </div>
    </Stack>
  );
};

export default SubmissionCard;
