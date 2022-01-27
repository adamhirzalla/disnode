import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, CardContent, Divider, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 250,
    // maxWidth: 350,
    minHeight: 200,
    width: "90%",
    paddingTop: "20px",
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
    textAlign: "center",
  },
  top: { display: "flex", flexDirection: "column", alignItems: "center" },
  name: { justifyContent: "self-end" },
  avatar: {
    width: "60px",
    height: "60px",
    justifyContent: "center",
  },
}));

export default function MemberProfile(props) {
  const { member, user } = props;
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <Box variant="column" className={classes.top}>
          <Avatar
            alt={member ? member?.nickname : user?.nickname}
            src={member ? member?.avatar : user?.avatar}
            className={classes.avatar}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.name}
          >
            {member ? member.nickname : user.nickname}
          </Typography>
        </Box>
        <CardContent className={classes.bio}>
          <Typography variant="body1" color="text.secondary">
            {member ? member.bio : user.bio}
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </>
  );
}
