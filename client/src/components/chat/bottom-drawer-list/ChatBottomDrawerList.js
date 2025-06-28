import {
  Box,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ChatBottomDrawerList({
  drawerListData,
  toggleDrawer,
  title,
  setPriority,
  handleDocument,
}) {
  const iconColor = { color: "rgba(0, 122, 255, 1)" };

  const handleOptionClick = (text) => {
    if (text === "High" || text === "Medium") {
      setPriority(text);
    }
  };

  const handleDocumentChange = (e, textType) => {
    handleDocument(e, textType);
    document.querySelector('#cancel-button').click();
    // toggleDrawer(null)
  };

  return (
    <Box p={1} role="presentation">
      <List bgcolor={"red"}>
        {title && (
          <ListItemText
            primary={title}
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            sx={{ textAlign: "center" }}
          />
        )}

        {drawerListData.map((text, index) => (
          <ListItem key={index} disablePadding>
            {text.type === "link" ? (
              <Link
                to={text?.url}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <ListItemButton
                  sx={{ width: "100%" }}
                  onClick={handleOptionClick(text.text)}
                >
                  {text?.icon && (
                    <ListItemIcon sx={iconColor}>{text?.icon}</ListItemIcon>
                  )}
                  <ListItemText
                    primary={text.text}
                    primaryTypographyProps={
                      text.text === "High"
                        ? { color: "rgba(182, 18, 18, 1)", fontSize: "1.2rem" }
                        : { fontSize: "1.2rem" }
                    }
                    sx={!text.icon ? { textAlign: "center" } : null}
                  />
                </ListItemButton>
              </Link>
            ) : (
              <FormLabel
                sx={{ width: "100%", color: "black" }}
                htmlFor={
                  text.type === "photos-videos"
                    ? "photos-videos_upload"
                    : text.type === "audio"
                    ? "audio_upload"
                    : "document_upload"
                }
              >
                <ListItemButton
                  sx={{ width: "100%" }}
                  onClick={handleOptionClick(text.text)}
                >
                  {text?.icon && (
                    <ListItemIcon sx={iconColor}>{text?.icon}</ListItemIcon>
                  )}
                  <ListItemText
                    primary={text.text}
                    primaryTypographyProps={
                      text.text === "High"
                        ? { color: "rgba(182, 18, 18, 1)", fontSize: "1.2rem" }
                        : { fontSize: "1.2rem" }
                    }
                    sx={!text.icon ? { textAlign: "center" } : null}
                  />

                  <input
                    id={
                      text.type === "photos-videos"
                        ? "photos-videos_upload"
                        : text.type === "audio"
                        ? "audio_upload"
                        : "document_upload"
                    }
                    type="file"
                    accept={
                      text.type === "photos-videos"
                        ? "image/jpeg, image/png, image/webp, video/mp4, video/avi, video/mov, video/3gp"
                        : text.type === "audio"
                        ? "audio/mp3, audio/wav, audio/amr"
                        : "*"
                    }
                    style={{ display: "none" }}
                    name={
                      text.type === "photos-videos"
                        ? "photos-videos_upload"
                        : text.type === "audio"
                        ? "audio_upload"
                        : "document_upload"
                    }
                    onChange={(e) => handleDocumentChange(e, text.type)}
                  />
                </ListItemButton>
              </FormLabel>
            )}
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(false)} id="cancel-button">
            <ListItemText
              primary="Cancel"
              primaryTypographyProps={{ fontSize: "1.2rem" }}
              sx={{ textAlign: "center", color: "rgba(0, 122, 255, 1)" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
