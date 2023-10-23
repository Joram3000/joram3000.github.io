import { Text, Title, Image, Box } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";
import { useTranslation } from "react-i18next";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { useElementSize } from "@mantine/hooks";
import { rem } from "@mantine/core";
import { useEffect, useState } from "react";
import "./styles.module.css";

export default function HomePage() {
  const { t } = useTranslation();
  const { ref, width } = useElementSize();
  const [dewidth, setDewidth] = useState(width);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, 500);
  useEffect(() => {
    setDewidth(dewidth);
  }, [width, embla]);

  return (
    <div>
      <Title p="md">HomePage</Title>
      <Text p="md">{t("hello")}</Text>

      <Text p="md">
        Joram Ipsum Joram Ipsum Joram Ipsum Voluptate magna laborum labore esse.
        Joram Ipsum Consectetur veniam culpa voluptate amet et pariatur nisi et
        mollit dolor. Ut velit veniam dolor laboris dolore voluptate voluptate
        nostrud. Eiusmod in sit elit voluptate nostrud id aliquip reprehenderit
        minim ea id nulla id sit ullamco. Duis anim elit amet eu aute ex veniam
        minim reprehenderit cillum deserunt nulla enim aliqua. Incididunt
        pariatur deserunt nostrud ipsum. Excepteur irure non qui excepteur ipsum
        cupidatat pariatur ullamco sunt sint.
      </Text>

      <Box py="md" ref={ref}>
        <div style={{ border: "1px dotted pink" }}>
          <Text p="md">{width}</Text>

          <Carousel
            getEmblaApi={setEmbla}
            // slideSize="70%"
            height={300}
            loop
            withIndicators
          >
            <Carousel.Slide>
              <Image
                height={300}
                radius="xl"
                p="md"
                src="https://rarehistoricalphotos.com/wp-content/uploads/2022/05/vintage-computer-ads-small.jpg"
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                height={300}
                radius="xl"
                p="md"
                src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                height={300}
                radius="xl"
                p="md"
                src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                height={300}
                radius="xl"
                p="md"
                src="https://hips.hearstapps.com/hmg-prod/images/qhs00001513-1631628777.jpg"
              />
            </Carousel.Slide>
          </Carousel>
        </div>
      </Box>

      <Title p="md" order={2}>
        {t("helloWorld")}
      </Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </div>
  );
}
