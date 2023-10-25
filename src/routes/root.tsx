import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Button, Flex, Text } from "@mantine/core";
import NavbarSimple from "../components/navbar/NavbarSimple";
import { useEffect, useState } from "react";
import HeaderSimple from "../components/header/HeaderSimple";
import { useTranslation } from "react-i18next";
import AsideComponent from "../components/aside/AsideComponent";
import { menuToggle } from "../store/uiState/actions";
import { useDispatch } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";

export default function Root() {
  const dispatch = useDispatch();
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();

  useEffect(() => {
    sessionStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const [active, setActive] = useState("Home");
  const [opened, { toggle: toggelientje }] = useDisclosure(false);
  const [navbarOpened, { toggle: navbarToggleDesktop }] = useDisclosure(true);
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      dispatch(menuToggle(navbarOpened));
    }, 210);
  }, [navbarOpened]);

  const menuClick = (waarde: string) => {
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
          desktop: !navbarOpened,
        },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: {
          mobile: !asideOpened,
          desktop: !asideOpened,
        },
      }}
    >
      <AppShell.Header>
        <HeaderSimple opened={opened} onClick={toggelientje} />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple active={active} setActive={menuClick} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside p="md">
        <AsideComponent />
      </AppShell.Aside>

      <AppShell.Footer>
        <Flex h={60} p="md" justify="space-between" align="center">
          <Button onClick={navbarToggleDesktop} visibleFrom="sm">
            {navbarOpened ? "hide navbar" : "show navbar"}
          </Button>
          <BrowserView>
            <Text>ComputerView</Text>
          </BrowserView>
          <MobileView>
            <Text>MobileView</Text>
          </MobileView>

          <Button onClick={asideToggle}>
            {asideOpened ? "hide aside" : "show aside"}
          </Button>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
