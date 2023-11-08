import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Button, Flex } from "@mantine/core";
import NavbarSimple from "../components/navbar/NavbarSimple";
import { useEffect, useState } from "react";
import HeaderSimple from "../components/header/HeaderSimple";
import { MenuToggle } from "../store/ui/actions";
import { useDispatch } from "react-redux";

export default function Root() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");

  const [navbarMobileOpened, { toggle: navbarMobileToggle }] =
    useDisclosure(false);
  const [navbarDesktopOpened, { toggle: navbarDesktopToggle }] =
    useDisclosure(true);

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

      <AppShell.Footer>
        <Flex h={60} p="md" justify="space-between" align="center">
          <Button onClick={navbarDesktopToggle} visibleFrom="sm">
            {navbarDesktopOpened ? "hide menu" : "show menu"}
          </Button>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
