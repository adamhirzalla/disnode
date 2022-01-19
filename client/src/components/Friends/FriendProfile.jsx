import DisBox from "../Box/DisBox";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import SteamSvg from "../SvgIcons/SteamSvg";
import DisTypography from "../Box/DisTypography";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import { Avatar, CardActions, CardContent, IconButton } from "@mui/material";
import { useDisIconButtonStyles } from "../styles/useDisIconButtonStyles";

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
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2em",
    minWidth: 550,
    minHeight: 650,
    // marginTop: "8em",
    backgroundColor: "#68696b",
    color: "#FFF",
    borderRadius: "1em",
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
  const { user, children } = props;
  const classes = useStyles();

  const iconClasses = useDisIconButtonStyles();

  const icons = connectionsIcons.map((icon, i) => {
    return (
      <IconButton key={i} className={iconClasses.connections}>
        {icon}
      </IconButton>
    );
  });

  return (
    <Card className={classes.card}>
      <Avatar alt={user.full_name} src={user.img} className={classes.avatar} />
      <DisBox disStyle="displayColumn">
        <CardContent className={classes.cardContent}>
          <DisTypography
            disStyle="userName"
            gutterBottom
            variant="h5"
            component="div"
          >
            {user.username}
          </DisTypography>
          <DisTypography gutterBottom variant="h7" component="div">
            {user.full_name}
          </DisTypography>
          <DisTypography disStyle="bio" variant="body1" color="text.secondary">
            {user.bio}
          </DisTypography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <DisBox disStyle="connections">{icons}</DisBox>
        </CardActions>
        {children}
      </DisBox>
    </Card>
  );
}
