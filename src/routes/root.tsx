import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Group } from "@mantine/core"; //Burger Skeleton
// import { HeaderSimple } from "../components/navbar/HeaderSimple";
// import FooterLinks from "../components/FooterLinks/FooterLinks";
// import { FooterSocial } from "../components/FooterLinks/FooterSocial";

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  console.log(toggle);
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/* <HeaderSimple /> */}
        <Navbar />
        <Group h="100%" px="md">
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
        </Group>
      </AppShell.Header>
      {/* <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar> */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}

      {/* <AppShell.Footer p="md">
        <p>Hallo</p>
        <FooterSocial />
      </AppShell.Footer> */}
    </AppShell>
  );
}
