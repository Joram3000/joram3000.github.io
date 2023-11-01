import { Stack, Title, Group, Text, Container } from "@mantine/core";
import { format } from "date-fns";
import treingv from "../../../assets/music/treingv.mp3";
import test16bitpxs1000 from "../../../assets/music/test16bitpxs1000.json";
import { reaction } from "../../../store/beatbattle/types";
import WaveSurferPlayer from "../../../components/WaveSurferPlayer/WaveSurferPlayerFrom";

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
}) => {
  url;

  return (
    <Stack bg="gray" miw="100%">
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
        <Stack justify="stretch" p="md"></Stack>
      </Container>
    </Stack>
  );
};

export default SubmissionCard;
