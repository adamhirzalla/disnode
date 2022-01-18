import { IconButton } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

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
