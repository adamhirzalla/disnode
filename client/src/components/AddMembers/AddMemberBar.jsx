import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

// styles
import { addMembersUseStyles } from "../styles/addMembersUseStyles";

export default function AddMemberBar(props) {
  const classes = addMembersUseStyles();
  const [added, setAdded] = useState(false);
  const [activeId, setActiveId] = useState([]);

  const addToChat = (id) => {
    setActiveId((prev) => [...prev, id]);

    setAdded(true);
  };

  const friendsList = [];
  for (const friend of props.friends) {
    friendsList.push(
      <li className={classes.listItem}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccountCircleOutlinedIcon
            fontSize="small"
            style={{ paddingRight: "15px" }}
          />
          {friend.name}
        </div>
        <Button
          key={friend.id}
          disableRipple={true}
          disablefocusripple
          color="inherit"
          onClick={() => addToChat(friend.id)}
        >
          {added && activeId.includes(friend.id) ? (
            <CheckCircleOutlinedIcon fontSize="small" color="success" />
          ) : (
            props.icon
          )}
        </Button>
      </li>
    );
  }

  return (
    <div>
      <ul className={classes.list}>{friendsList}</ul>
    </div>
  );
}
