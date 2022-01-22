import { Menu } from "@mui/material";
import ChannelMenuListItem from "./ChannelMenuListItem";

export default function ChannelMenuList(props) {
  const { anchor, setAnchor } = props;

  return (
    <Menu
      sx={{ mt: "30px" }}
      id="menu-appbar"
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchor)}
      onClose={() => setAnchor(false)}
    >
      <ChannelMenuListItem setAnchor={setAnchor} />
    </Menu>
  );
}
