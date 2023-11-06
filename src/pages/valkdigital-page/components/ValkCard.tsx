import { Card, Image, Text } from "@mantine/core";

interface content {
  projectNaam: string;
  projectOmschrijving: string;
  soortenDingen: string;
  img?: string;
}

interface ValkCardProps {
  content: content;
}

const ValkCard: React.FC<ValkCardProps> = ({ content }) => {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`#/valkdigital/${content.projectNaam}`.toLowerCase()}
    >
      <Card.Section>
        <Image
          src={
            content.img ??
            "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          }
          h={160}
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {content.projectNaam}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {content.projectOmschrijving}
      </Text>
    </Card>
  );
};

export default ValkCard;
