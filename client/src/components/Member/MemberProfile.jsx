import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Avatar, CardContent, Divider, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 250,
    maxWidth: 300,
    minHeight: 250,
    // maxHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

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
      <Card className={classes.root}>
        <Avatar
          alt={member.nickname}
          src={member.avatar}
          className={classes.avatar}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="div">
            {member.nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            YO HMU if you into apex and shooting stuff YO HMU if you into apex
            and shooting stuff YO HMU if you into apex and shooting stuff YO HMU
            if you into ape
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </>
  );
}
