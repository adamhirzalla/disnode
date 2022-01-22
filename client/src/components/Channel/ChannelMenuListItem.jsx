import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { useContext, useState } from "react";
import ChannelEditDialog from "./ChannelEditDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ServerContext from "../../contexts/ServerContext";
import ChannelDeleteDialog from "./ChannelDeleteDialog";

export default function ChannelMenuListItem({ setAnchor }) {
  const {
    app: { channel },
  } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [input, setInput] = useState(channel.title);
  const handleEdit = () => {
    setAnchor(false);
    setInput(channel.title);
    setOpen(true);
  };

  const handleDelete = () => {
    setAnchor(false);
    setConfirm(true);
  };

  return (
    <Paper sx={{ width: "100%", maxWidth: "100%" }}>
      <MenuList>
        <Divider />
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon color="primary" />
          </ListItemIcon>
          Edit Title
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteForeverIcon color="error" fontSize="small" />
          </ListItemIcon>
          Delete Channel
        </MenuItem>
      </MenuList>
      <ChannelEditDialog
        open={open}
        setOpen={setOpen}
        input={input}
        setInput={setInput}
        channel={channel}
      />
      <ChannelDeleteDialog
        channel={channel}
        open={confirm}
        setOpen={setConfirm}
      />
    </Paper>
  );
}
