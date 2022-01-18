import {
  Avatar,
  Typography,
  ListItemText,
  ListItem,
  Container,
} from "@mui/material";

import {
  useMemberListItemStyles,
  StyledBadge,
} from "../styles/useMemberListItemStyles";
import classNames from "classnames";
import MemberMenu from "./MemberMenu";

export default function MemberListItem({ member, open, handleDrawerOpen }) {
  const classes = useMemberListItemStyles(open);
  const badgeClass = classNames(classes.userBadge, {
    [classes.userBadgeOpen]: open,
  });
  const memberListClass = classNames(classes.memberList, {
    [classes.memberListOpen]: !open,
  });

  return (
    <Container className={classes.member}>
      <Typography className={classes.role} variant="button">
        {member.role}
      </Typography>

      <ListItem
        disableGutters
        className={memberListClass}
        open={open}
        onClick={handleDrawerOpen}
      >
        <StyledBadge
          className={badgeClass}
          overlap="circular"
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={member.is_active ? "dot" : "standard"}
        >
          <Avatar alt={member.nickname} src={member.avatar} />
        </StyledBadge>
        <ListItemText primary={member.nickname} open={open} />
        {open && <MemberMenu member={member} />}
      </ListItem>
    </Container>
  );
}
