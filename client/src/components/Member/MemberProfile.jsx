import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, CardContent, Divider, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 250,
    maxWidth: 300,
    minHeight: 250,
    // maxHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bio: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  top: { alignItems: "center" },
  name: { justifyContent: "self-end" },
  avatar: {
    width: "60px",
    height: "60px",
  },
}));

export default function MemberProfile(props) {
  const { member } = props;
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Box variant="column" className={classes.top}>
          <Avatar
            alt={member.nickname}
            src={member.avatar}
            className={classes.avatar}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.name}
          >
            {member.nickname}
          </Typography>
        </Box>
        <CardContent className={classes.bio}>
          <Typography variant="body1" color="text.secondary">
            {member.bio}
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </>
  );
}
