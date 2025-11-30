import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

import { vAlign, spaceBtn } from "../../assets/styledComponent/Style";


import { useState } from "react";

import AccountDropDown from "./AccountDropDown";
import NotificationDropDown from "./NotificationDropDown";


export default function ResponsiveDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ mt: 8 }}>
        {["Home", "Chat", "Tasks", "Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          maxWidth: "500px",
          left: 0,
          mx: "auto",
          width: "100%",
        }}
      >
        <Box sx={{ color: "black", px: 2, ...spaceBtn }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2, color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ ...vAlign, gap: 1 }}>
            <NotificationDropDown />
            <AccountDropDown />
          </Box>
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
