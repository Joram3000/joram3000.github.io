import { Button, Drawer, ScrollArea } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import { DrawerToggle } from "../../store/ui/actions"
import { getUIStateSelector } from "../../store/ui/selectors"
import { IconQuestionMark } from "@tabler/icons-react"

interface DrawerComponentProps {
  children: React.ReactNode
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ children }) => {
  const dispatch = useDispatch()
  const getUIState = useSelector(getUIStateSelector)

  return (
    <>
      <Drawer
        position="right"
        opened={getUIState.drawerOpen}
        onClose={() => dispatch(DrawerToggle(false))}
      >
        <ScrollArea offsetScrollbars type="never">
          {children}
        </ScrollArea>
      </Drawer>

      <Button
        pos="fixed"
        bottom={0}
        right={0}
        variant="gradient"
        onClick={() => dispatch(DrawerToggle(true))}
        style={{ zIndex: 200 }}
        m="sm"
      >
        <IconQuestionMark />
      </Button>
    </>
  )
}

export default DrawerComponent
