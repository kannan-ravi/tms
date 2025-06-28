import styled from "@emotion/styled";

export const Img = styled("img")(({ borderRadius, ml }) => ({
  borderRadius: borderRadius,
  marginLeft: ml,
}));

export const vAlign = {
  display: "flex",
  alignItems: "center",
};

export const spaceBtn = {
  display: "flex",
  justifyContent: "space-between",
};

export const BottomFixed = {
  position: "fixed",
  bottom: 0,
};

// KANNAN

export const textAreaAutoSizeStyle = {
  width: "100%",
  outline: "none",
  padding: "10px 10px",
  borderRadius: "4px",
  fontFamily: "Inherit",
  fontSize: "inherit",
};
