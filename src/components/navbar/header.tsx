import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSimple.module.css";

const links = [
  { link: "/home", label: "Home" },
  { link: "/patternmaker", label: "Patternmaker" },
  { link: "/videoplayer", label: "Videoplayer" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Container size="md" className={classes.inner}>
      <Group gap={5} visibleFrom="xs">
        {items}
      </Group>

      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
    </Container>
  );
}
