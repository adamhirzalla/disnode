import React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";

export default function ChatIconButton() {
  return (
    <IconButton>
      <ForumIcon
        sx={{
          width: "1.5em",
          height: "1.5em",
          color: "#FFF",
          "&:hover": { color: "#d40824" },
        }}
      />
    </IconButton>
  );
}
