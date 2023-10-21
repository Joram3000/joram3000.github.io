import { Link, Outlet } from "react-router-dom";
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
} from "@mantine/core";
import NavbarSimple from "../components/navbar/NavbarSimple";
import { menuData } from "./menuData";
import classes from "../components/navbar/NavbarSimple.module.css";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { lorem } from "../helpers/TextFiller";
import HeaderSimple from "../components/header/HeaderSimple";
import { useTranslation } from "react-i18next";

export default function Root() {
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();

  useEffect(() => {
    sessionStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const { t } = useTranslation();

  const [active, setActive] = useState("Home");
  const [opened, { toggle: toggelientje }] = useDisclosure();
  const [navbardesktopOpened, { toggle: navbarToggleDesktop }] =
    useDisclosure(true);

  const [asidemobileOpened, { toggle: asidetoggleMobile }] = useDisclosure();
  const [asidedesktopOpened, { toggle: asideToggleDesktop }] =
    useDisclosure(true);

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
          desktop: !asidemobileOpened,
        },
      }}
    >
      <AppShell.Header>
        <HeaderSimple active={active} setActive={setActive} />

        {/* <Group hiddenFrom="sm" justify="space-between" w="100%" h={60}>
          <Burger opened={opened} onClick={toggelientje} size="sm" />

          <ThemeSwitch />
        </Group>

        <Group
          visibleFrom="sm"
          justify="space-between"
          align="center" //stretch
          w="100%"
          h={60}
        >
          <Text fw={700}>Welkom op mijn website</Text>
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

          <ThemeSwitch />
        </Group> */}
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
            {navbardesktopOpened ? "hide navbar" : "show navbar"}
          </Button>

          <Text>ik ben een hele mooie footer</Text>

          <Button onClick={asidetoggleMobile}>
            {!asidemobileOpened ? "hide aside" : "show aside"}
          </Button>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
