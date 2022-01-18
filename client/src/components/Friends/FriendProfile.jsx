import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Avatar } from "@mui/material";
import FriendProfileItems from "./FriendProfileItems";
import SteamSvg from "../SvgIcons/SteamSvg";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import { makeStyles } from "@mui/styles";
import DisBox from "../Box/DisBox";
import DisTypography from "../Box/DisTypography";

const useStyles = makeStyles(() => ({
  cardAction: {
    width: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "1em",
    minWidth: 500,
    minHeight: 600,
    marginTop: "8em",
  },
  avatar: {
    width: "5em",
    height: "5em",
  },
}));

const connectionsIcons = [
  <SteamSvg />,
  <TwitterSvg />,
  <RiotGamesSvg />,
  <EpicGamesSvg />,
];

export default function FriendProfile(props) {
  const { user } = props;
  const classes = useStyles();

  const icons = connectionsIcons.map((icon) => {
    return <FriendProfileItems>{icon}</FriendProfileItems>;
  });

  return (
    <Card className={classes.card}>
      <Avatar alt={user.full_name} src={user.img} className={classes.avatar} />
      <DisBox type="displayColumn">
        <CardContent className={classes.cardContent}>
          <DisTypography
            type="userName"
            gutterBottom
            variant="h5"
            component="div"
          >
            {user.username}
          </DisTypography>
          <DisTypography gutterBottom variant="h7" component="div">
            {user.full_name}
          </DisTypography>
          <DisTypography type="bio" variant="body2" color="text.secondary">
            {user.bio}
          </DisTypography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <DisBox type="connections">{icons}</DisBox>
        </CardActions>
      </DisBox>
    </Card>
  );
}
