import { Drawer, ScrollArea, Text, Title } from "@mantine/core";
import { lorem } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getUIStateSelector } from "../../store/ui/selectors";
import { DrawerToggle } from "../../store/ui/actions";

interface DrawerComponentProps {}

const DrawerComponent: React.FC<DrawerComponentProps> = () => {
  const drawerState = useSelector(getUIStateSelector);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(DrawerToggle(false));
  };

  return (
    <Drawer position="right" opened={drawerState.drawerOpen} onClose={onClose}>
      <Title order={3} pb="md">
        Extra informatie
      </Title>

      <ScrollArea offsetScrollbars type="never">
        <Text pb="md">{lorem.generateParagraphs(1)}</Text>
        <Text pb="md">{lorem.generateParagraphs(6)}</Text>
      </ScrollArea>
    </Drawer>
  );
};

export default DrawerComponent;
