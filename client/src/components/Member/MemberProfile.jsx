import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { Avatar, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 300,
    maxWidth: 345,
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
          BIO BIO BIOOOOOOOOOOO
        </Typography>
      </CardContent>
    </Card>
  );
}
