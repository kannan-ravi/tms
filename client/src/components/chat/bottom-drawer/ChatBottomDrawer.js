import ChatBottomDrawerList from "../bottom-drawer-list/ChatBottomDrawerList";
import { Drawer } from "@mui/material";

export default function ChatBottomDrawer({
  toggleDrawer,
  open,
  drawerListData,
  title,
  setPriority,
  handleDocument,
}) {
  return (
    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)} sx={{
      '& .MuiDrawer-paper': {
        maxWidth: '500px',
        borderRadius: '10px 10px 0 0',
        margin: 'auto',
        left: 0,
        right: 0,
      },
    }}>
      <ChatBottomDrawerList
        drawerListData={drawerListData}
        toggleDrawer={toggleDrawer}
        title={title}
        setPriority={setPriority}
        handleDocument={handleDocument}
      />
    </Drawer>
  );
}
