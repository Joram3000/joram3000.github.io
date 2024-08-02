import {
  Title,
  Text,
  Image,
  Container,
  Group,
  Stack,
  Anchor,
  Box,
} from "@mantine/core"

import joram from "../../assets/images/joram/joramcutout.webp"
import { DataTable } from "mantine-datatable"
import { contactInfo, curriculumVitae } from "./data"

export default function ContactPage() {
  return (
    <Container>
      <Title pt="md">Contact</Title>

      <Stack py="md">
        {contactInfo.map((contactItem) => (
          <Group key={contactItem.text}>
            {contactItem.icon}
            {contactItem.url ? (
              <Anchor href={contactItem.url} target="_blank">
                {contactItem.text}
              </Anchor>
            ) : (
              <Text>{contactItem.text}</Text>
            )}
          </Group>
        ))}
      </Stack>

      <Title py="md">Curriculum Vitae</Title>

      <DataTable
        withTableBorder
        striped
        highlightOnHover
        records={curriculumVitae}
        columns={[
          {
            accessor: "start",
            render: (item) => (
              <Text>
                {item.start}-{item.finish}
              </Text>
            ),
          },
          {
            accessor: "title",
            render: (item, i) => <Text key={i}>{item.title}</Text>,
          },
          {
            accessor: "company",
            render: (item) =>
              item.url ? (
                <Anchor href={item.url} target="_blank">
                  {item.company}
                </Anchor>
              ) : (
                <Text>{item.company}</Text>
              ),
          },
        ]}
        idAccessor={({ title, company }) => `${title}:${company}`}
        rowExpansion={{
          content: ({ record }) =>
            record.description ? (
              <Box m="md">
                <Text>{record.description}</Text>
              </Box>
            ) : (
              false
            ),
        }}
      />

      <Image
        pos="relative"
        src={joram}
        h={300}
        w="auto"
        left="50%"
        style={{ transform: "translate(-50%,50%)" }}
      />
    </Container>
  )
}
