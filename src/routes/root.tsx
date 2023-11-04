import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Button, Flex, Text } from "@mantine/core";
import NavbarSimple from "../components/navbar/NavbarSimple";
import { useEffect, useState } from "react";
import HeaderSimple from "../components/header/HeaderSimple";
// import { useTranslation } from "react-i18next";
import AsideComponent from "../components/aside/AsideComponent";
import { MenuToggle } from "../store/ui/actions";
import { useDispatch } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";

// import { IsDrawer } from "../../store/ui/actions";
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(IsDrawer(true));
// }, []);

export default function Root() {
  const dispatch = useDispatch();

  // const getUIState = useSelector(getUIStateSelector);

  // // const {
  // //   i18n: { language: currentLanguage },
  // // } = useTranslation();

  // sessionStorage.setItem("language", currentLanguage);

  const [active, setActive] = useState("Home");

  const [navbarMobileOpened, { toggle: navbarMobileToggle }] =
    useDisclosure(false);
  const [navbarDesktopOpened, { toggle: navbarDesktopToggle }] =
    useDisclosure(true);
  // const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      dispatch(MenuToggle(navbarDesktopOpened));
    }, 210);
  }, [navbarDesktopOpened]);

  const menuClick = (value: string) => {
    setActive(value);
    navbarMobileToggle();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !navbarMobileOpened,
          desktop: !navbarDesktopOpened,
        },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        // collapsed: {
        //   mobile: !asideOpened,
        //   desktop: !asideOpened,
        // },
      }}
    >
      <AppShell.Header>
        <HeaderSimple
          isOpen={navbarMobileOpened}
          onClick={navbarMobileToggle}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple isActive={active} setActive={menuClick} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside p="md">
        <AsideComponent />
      </AppShell.Aside>

      <AppShell.Footer>
        <Flex h={60} p="md" justify="space-between" align="center">
          <Button onClick={navbarDesktopToggle} visibleFrom="sm">
            {navbarDesktopOpened ? "hide menu" : "show menu"}
          </Button>

          <BrowserView>
            <Text>ComputerView</Text>
          </BrowserView>
          <MobileView>
            <Text>MobileView</Text>
          </MobileView>

          {/* <Button onClick={() => dispatch(DrawerToggle(true))}>
            Open drawer
          </Button> */}
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
