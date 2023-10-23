import {
  Title,
  Text,
  Collapse,
  Box,
  Image,
  UnstyledButton,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import image2 from "../../assets/images/prace1bewerkt.jpg.png";
import image3 from "../../assets/images/unnamed (2).jpg";
import WaveSurferPlayer from "../test-pages/WaveSurfer";
import treingv from "../../assets/music/treingv.mp3";

export default function Aboutpage() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box py="md">
      <Title px="md">About</Title>
      <Text p="md">
        Labore est minim adipisicing pariatur ut ex esse. Aliquip ea do
        excepteur cupidatat commodo qui.
      </Text>
      <Title order={2} px="md">
        About
      </Title>
      <Text p="md">
        Occaecat veniam consectetur quis cupidatat reprehenderit id elit anim
        reprehenderit commodo adipisicing anim pariatur dolore mollit. Et id
        consectetur nisi cupidatat quis consequat eiusmod anim non velit.
        Cupidatat enim est magna reprehenderit amet quis sit excepteur sint aute
        occaecat culpa. Laboris et dolor veniam. Do tempor commodo ipsum nulla
        exercitation qui non adipisicing.
      </Text>
      <WaveSurferPlayer
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        minPxPerSec={600}
        url={treingv}
        container=""
        plugins={[]}
      />
      <Collapse p="md" in={opened} transitionDuration={200}>
        <Text>
          Cupidatat nostrud commodo reprehenderit aliquip ipsum commodo quis
          consectetur commodo fugiat consectetur incididunt veniam. Ad eiusmod
          amet labore occaecat. Irure officia id do sint quis aliqua proident
          quis nisi et esse ipsum. Do aliqua ipsum duis cillum amet aute anim
          deserunt duis. Ea cupidatat aliqua nisi consectetur quis commodo
          veniam nisi esse. Ipsum in aute aliqua consectetur ea. Veniam dolor ut
          non nisi fugiat nostrud id velit ea qui non irure velit excepteur.
          Elit officia excepteur mollit et et ex aliqua laborum officia commodo
          voluptate deserunt. Fugiat fugiat ad incididunt deserunt Lorem fugiat
          ut veniam. Minim sint cillum adipisicing in. Ex dolor culpa enim
          incididunt. Ipsum exercitation consectetur fugiat veniam sit fugiat
          consectetur sint. Ullamco irure do reprehenderit voluptate adipisicing
          amet id qui sint amet sit consequat quis sunt. Anim deserunt
          consectetur consequat fugiat ea cillum tempor dolore.
        </Text>

        <Image src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" />
      </Collapse>
      <UnstyledButton fw="700" onClick={toggle} mx="md">
        {!opened ? "Vertel me nog meer!!" : "Haal maar weer weg"}
      </UnstyledButton>

      <SimpleGrid p="md" cols={{ base: 1, sm: 2, lg: 4 }}>
        <Image src={image3} />
        <Image src={image2} />
        <Image src={image3} />
        <Image src={image2} />
      </SimpleGrid>
    </Box>
  );
}
