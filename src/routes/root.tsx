import { Link, Outlet } from "react-router-dom";
// import Navbar from "../components/navbar";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core"; //Burger Skeleton
import NavbarSimple from "../components/navbar/NavbarSimple";
import { menuData } from "./menuData";
// import { HeaderSimple } from "../components/navbar/HeaderSimple";
import classes from "../components/navbar/NavbarSimple.module.css";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { lorem } from "../helpers/TextFiller";

export default function Root() {
  const [active, setActive] = useState("Home");
  const [opened, { toggle: toggelientje }] = useDisclosure();
  const [navbardesktopOpened, { toggle: navbarToggleDesktop }] =
    useDisclosure(true);

  const [asidemobileOpened, { toggle: asidetoggleMobile }] = useDisclosure();
  const [asidedesktopOpened, { toggle: asideToggleDesktop }] =
    useDisclosure(true);

  console.log(opened);

  useEffect(() => {
    toggelientje;
  }, [active]);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
          desktop: !navbardesktopOpened,
        },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: {
          mobile: !asidemobileOpened,
          desktop: !asidedesktopOpened,
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" align="center" justify="space-between" px="md">
          <Group
            visibleFrom="sm"
            justify="space-between"
            w="90%"
            align="center"
            h={60}
          >
            <Text>Welkom op mijn website</Text>
            {menuData.map((item) => (
              <Link
                className={classes.link}
                data-active={item.label === active || undefined}
                key={item.label}
                to={item.link}
                onClick={() => {
                  setActive(item.label);
                }}
              >
                {item.label}
              </Link>
            ))}
          </Group>

          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggelientje}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
          <ThemeSwitch />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple active={active} setActive={setActive} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside p="md">
        <Title order={3} pb="md">
          Extra informatie
        </Title>
        <ScrollArea
          offsetScrollbars
          scrollbarSize={4}
          scrollHideDelay={1000}
          type="never"
        >
          <Text pb="md">{lorem.generateParagraphs(1)}</Text>
          <Text pb="md">{lorem.generateParagraphs(6)}</Text>
        </ScrollArea>
      </AppShell.Aside>

      <AppShell.Footer>
        <Flex h={60} p="md" justify="space-between" align="center">
          <Button onClick={navbarToggleDesktop} visibleFrom="sm">
            navbar [visible from SM]
          </Button>

          <Text>ik ben een hele mooie footer</Text>
          <Button onClick={asideToggleDesktop} visibleFrom="sm">
            aside [visible from SM]
          </Button>
          <Button onClick={asidetoggleMobile} hiddenFrom="sm">
            aside [hidden from SM]
          </Button>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
