import { Card, Image, Text } from "@mantine/core";
import pisa from "../../../assets/images//meme/pisa.webp";

interface content {
  projectNaam: string;
  projectUrl: string;
  projectOmschrijving: string;
  soortenDingen?: string;
  img?: string;
}

interface ValkCardProps {
  content: content;
}

const ValkCard: React.FC<ValkCardProps> = ({ content }) => {
  return (
    <Card
      shadow="sm"
      component="a"
      href={`#/valkdigital/${content.projectUrl}`.toLowerCase()}
    >
      <Card.Section>
        <Image src={content.img ?? pisa} h={200} />
      </Card.Section>

      <Text fw={600} size="lg" mt="md">
        {content.projectNaam}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {content.projectOmschrijving}
      </Text>
    </Card>
  );
};

export default ValkCard;
