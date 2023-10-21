import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Button, Flex, ScrollArea, Text, Title } from "@mantine/core";
import NavbarSimple from "../components/navbar/NavbarSimple";
import { useEffect, useState } from "react";
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

  const [active, setActive] = useState("Home");
  const [opened, { toggle: toggelientje }] = useDisclosure(false);
  const [navbardesktopOpened, { toggle: navbarToggleDesktop }] =
    useDisclosure(true);

  const [asidemobileOpened, { toggle: asidetoggleMobile }] = useDisclosure();
  // const [asidedesktopOpened, { toggle: asideToggleDesktop }] =
  //   useDisclosure(true);

  const menuClick = (waarde: string) => {
    console.log("er wordt op het menu geljuktt");
    setActive(waarde);
    toggelientje();
  };
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
        <HeaderSimple opened={opened} onClickelientje={toggelientje} />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple active={active} setActive={menuClick} />
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
