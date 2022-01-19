import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  AvatarGroup,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import ConfirmDialog from "./ConfirmDialog";

export default function SearchServerListDialog({ server, result }) {
  const [join, setJoin] = useState(false);
  const classes = useServerDialogStyles();

  return (
    <>
      {result && (
        <>
          <ListItem
            className={classes.listItem}
            sx={{
              "& .MuiListItemButton-root": {
                borderRadius: "2em",
              },
            }}
            disablePadding
          >
            <ListItemButton className={classes.list}>
              <ListItemAvatar>
                <Avatar
                  alt={server.title}
                  src={server.logo}
                  className={classes.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.text}
                sx={{ pl: "20px" }}
                primary={server.title}
              />

              {/* mock avatar group */}
              <AvatarGroup total={24} sx={{ pr: "25px" }}>
                <Avatar
                  alt="Jonathan"
                  src="https://proofmart.com/wp-content/uploads/2021/06/1-1.png"
                />
                <Avatar
                  alt="Adam"
                  src="https://proofmart.com/wp-content/uploads/2021/06/7web.png"
                />
                <Avatar
                  alt="Hyunsu"
                  src="https://proofmart.com/wp-content/uploads/2021/06/3-web-1.png"
                />
              </AvatarGroup>

              <IconButton
                onClick={() => setJoin(true)}
                sx={{ color: "green", opacity: 0.6 }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          {join && (
            <ConfirmDialog setJoin={setJoin} join={join} server={server} />
          )}
        </>
      )}
    </>
  );
}
