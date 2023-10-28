import { Title, Text, Image, Box, Accordion } from "@mantine/core";

export default function ContactPage() {
  const groceries = [
    {
      emoji: "🍎",
      value: "Apples",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      emoji: "🍌",
      value: "Bananas",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
    {
      emoji: "🥦",
      value: "Broccoli",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
  ];

  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box>
      <Title p="md">ContactPage</Title>
      <Text p="md">
        Id labore cillum sunt. Magna pariatur pariatur anim aliqua fugiat elit
        veniam velit aliqua. Reprehenderit officia ex pariatur Lorem aliquip
        aliquip culpa consequat magna ex minim ea aliquip ullamco officia.
        Dolore voluptate officia commodo elit sint ut in. Non dolore Lorem ea
        non. Excepteur cupidatat veniam anim irure adipisicing aliquip aliqua
        cillum fugiat.
      </Text>
      <Accordion p="md" variant="separated" defaultValue="huh">
        {items}
      </Accordion>

      <Text p="md">
        Pariatur anim nulla ea incididunt sunt proident proident. Deserunt
        proident ad eiusmod minim officia pariatur magna labore mollit do
        pariatur quis id reprehenderit in. Dolore adipisicing proident pariatur
        exercitation commodo ullamco eiusmod duis. Aliqua incididunt consequat
        eu aliquip. Dolor adipisicing laboris et eiusmod tempor do sit aliquip
        cupidatat laboris tempor proident nulla sit. Ea fugiat fugiat ipsum est
        in veniam exercitation Lorem duis est non nostrud occaecat qui. Eu quis
        nulla irure pariatur.
      </Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Image
        radius="xl"
        p="md"
        h={200}
        src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
      />
      <Text p="md">
        Id labore cillum sunt. Magna pariatur pariatur anim aliqua fugiat elit
        veniam velit aliqua. Reprehenderit officia ex pariatur Lorem aliquip
        aliquip culpa consequat magna ex minim ea aliquip ullamco officia.
        Dolore voluptate officia commodo elit sint ut in. Non dolore Lorem ea
        non. Excepteur cupidatat veniam anim irure adipisicing aliquip aliqua
        cillum fugiat.
      </Text>
      <Text p="md">
        Pariatur anim nulla ea incididunt sunt proident proident. Deserunt
        proident ad eiusmod minim officia pariatur magna labore mollit do
        pariatur quis id reprehenderit in. Dolore adipisicing proident pariatur
        exercitation commodo ullamco eiusmod duis. Aliqua incididunt consequat
        eu aliquip. Dolor adipisicing laboris et eiusmod tempor do sit aliquip
        cupidatat laboris tempor proident nulla sit. Ea fugiat fugiat ipsum est
        in veniam exercitation Lorem duis est non nostrud occaecat qui. Eu quis
        nulla irure pariatur.
      </Text>
    </Box>
  );
}
